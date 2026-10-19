/**
 * Creates N Supabase auth users and prints SQL to enroll them in a load-test cohort.
 *
 * Usage:
 *   node load-tests/seed-loadtest-users.mjs --count 150 --cohort <uuid> --course <uuid>
 *
 * Env:
 *   SUPABASE_URL (default: project URL)
 *   SUPABASE_ANON_KEY (required)
 */

const SUPABASE_URL =
  process.env.SUPABASE_URL ?? 'https://twugbiagycvjmjjtuhai.supabase.co';
const ANON_KEY = process.env.SUPABASE_ANON_KEY;
const PASSWORD = process.env.LOADTEST_PASSWORD ?? 'LoadTest150!Agent';

function parseArgs() {
  const args = process.argv.slice(2);
  const out = { count: 150, cohort: '', course: '' };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--count') out.count = Number(args[++i]);
    else if (args[i] === '--cohort') out.cohort = args[++i];
    else if (args[i] === '--course') out.course = args[++i];
  }
  return out;
}

async function sleep(ms) {
  await new Promise((r) => setTimeout(r, ms));
}

async function signup(email, attempt = 0) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: 'POST',
    headers: {
      apikey: ANON_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password: PASSWORD }),
  });
  const body = await res.json();
  if (res.status === 429 && attempt < 8) {
    await sleep(500 * 2 ** attempt);
    return signup(email, attempt + 1);
  }
  if (!res.ok && body?.msg !== 'User already registered') {
    throw new Error(`${email}: ${JSON.stringify(body)}`);
  }
  if (body?.user?.id) {
    return { id: body.user.id, email, access_token: body.access_token };
  }
  const login = await fetch(
    `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
    {
      method: 'POST',
      headers: {
        apikey: ANON_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password: PASSWORD }),
    }
  );
  const loginBody = await login.json();
  if (!login.ok) throw new Error(`${email} login: ${JSON.stringify(loginBody)}`);
  return {
    id: loginBody.user.id,
    email,
    access_token: loginBody.access_token,
  };
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function main() {
  if (!ANON_KEY) {
    console.error('Set SUPABASE_ANON_KEY');
    process.exit(1);
  }
  const { count, cohort, course } = parseArgs();
  if (!cohort || !course) {
    console.error('Provide --cohort and --course UUIDs');
    process.exit(1);
  }

  const runTag = Date.now().toString(36);
  const users = [];
  const concurrency = 3;

  for (let start = 0; start < count; start += concurrency) {
    const batch = [];
    for (let i = start; i < Math.min(start + concurrency, count); i++) {
      const email = `loadtest150-${runTag}-${String(i + 1).padStart(3, '0')}@example.com`;
      batch.push(signup(email).then((u) => users.push(u)));
    }
    await Promise.all(batch);
    await sleep(250);
    process.stderr.write(`\rSeeded ${users.length}/${count} users`);
  }
  process.stderr.write('\n');

  const fs = await import('node:fs/promises');
  const path = await import('node:path');
  const outPath = path.join(process.cwd(), 'load-tests/users.json');
  await fs.writeFile(
    outPath,
    JSON.stringify(
      {
        password: PASSWORD,
        cohortId: cohort,
        courseId: course,
        lessonId: process.env.LOADTEST_LESSON_ID ?? '171c0a6a-1d2c-4c33-9eb3-ffe35618ab0c',
        users: users.map(({ id, email }) => ({ id, email })),
      },
      null,
      2
    )
  );

  const values = users
    .map(
      (u, idx) =>
        `('${u.id}', '${u.email.replace(/'/g, "''")}', 'Load', 'Test${idx + 1}')`
    )
    .join(',\n  ');

  const sql = `-- Enroll ${users.length} load-test users (run once in Supabase SQL editor)
INSERT INTO profiles (id, email, first_name, last_name)
VALUES
  ${values}
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

INSERT INTO user_roles (user_id, role)
SELECT id, 'cursant'::app_role FROM profiles
WHERE email LIKE 'loadtest150-${runTag}-%@example.com'
ON CONFLICT DO NOTHING;

WITH new_enrollments AS (
  INSERT INTO enrollments (user_id, course_id, cohort_id, status)
  SELECT p.id, '${course}'::uuid, '${cohort}'::uuid, 'enrolled'
  FROM profiles p
  WHERE p.email LIKE 'loadtest150-${runTag}-%@example.com'
  RETURNING id, user_id
)
INSERT INTO cohort_members (cohort_id, user_id, enrollment_id)
SELECT '${cohort}'::uuid, user_id, id FROM new_enrollments;
`;

  console.log(sql);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
