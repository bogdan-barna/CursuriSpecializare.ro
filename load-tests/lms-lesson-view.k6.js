import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { Trend, Rate } from 'k6/metrics';

/**
 * Simulates logged-in students opening a lesson (Supabase auth + lesson read).
 * Matches the data the LMS loads after login for lesson content (course_lessons).
 *
 * For full TanStack Start /_serverFn E2E, set BASE_URL and use run-full-stack mode
 * once Vercel bot protection allows your runner IP (see load-tests/run-lesson-load.sh).
 */

const loginMs = new Trend('login_duration_ms', true);
const lessonMs = new Trend('lesson_fetch_duration_ms', true);
const failRate = new Rate('flow_failed');

const users = new SharedArray('users', () => {
  const raw = open('./users.json');
  const parsed = JSON.parse(raw);
  return parsed.users.map((u) => ({
    ...u,
    password: parsed.password,
    cohortId: parsed.cohortId,
    courseId: parsed.courseId,
    lessonId: parsed.lessonId,
  }));
});

const SUPABASE_URL = __ENV.SUPABASE_URL || 'https://twugbiagycvjmjjtuhai.supabase.co';
const ANON_KEY = __ENV.SUPABASE_ANON_KEY;
const BASE_URL = __ENV.BASE_URL || 'https://www.cursurispecializare.ro';
const MODE = __ENV.LOADTEST_MODE || 'supabase'; // supabase | full

export const options = {
  scenarios: {
    lesson_viewers: {
      executor: 'per-vu-iterations',
      vus: Number(__ENV.VUS || 150),
      iterations: 1,
      maxDuration: '10m',
    },
  },
  thresholds: {
    flow_failed: ['rate<0.05'],
    login_duration_ms: ['p(95)<3000'],
    lesson_fetch_duration_ms: ['p(95)<5000'],
    http_req_failed: ['rate<0.05'],
  },
};

function supabaseLogin(email, password) {
  const res = http.post(
    `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
    JSON.stringify({ email, password }),
    {
      headers: {
        apikey: ANON_KEY,
        'Content-Type': 'application/json',
      },
      tags: { name: 'supabase_login' },
    }
  );
  loginMs.add(res.timings.duration);
  if (res.status !== 200) return null;
  const body = res.json();
  return body.access_token;
}

function fetchLessonRest(token, lessonId) {
  const fields = 'id,title,content_html,video_url,embed_code,module_id';
  const res = http.get(
    `${SUPABASE_URL}/rest/v1/course_lessons?id=eq.${lessonId}&select=${fields}`,
    {
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${token}`,
      },
      tags: { name: 'lesson_rest' },
    }
  );
  lessonMs.add(res.timings.duration);
  return res;
}

function fetchLessonServerFn(token, cohortId, lessonId) {
  const payload = encodeURIComponent(
    JSON.stringify({
      t: 0,
      i: 0,
      s: JSON.stringify({ data: { cohortId, lessonId } }),
      f: 127,
      m: [],
    })
  );
  const fnId = '6126f0cddd5dddf7bce977ec9e965da06a7d65bd331045042f5c7f874ab3cb1c';
  const res = http.get(`${BASE_URL}/_serverFn/${fnId}?payload=${payload}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apikey: ANON_KEY,
      'x-tsr-serverFn': 'true',
      Accept: 'application/json, application/x-tss-framed',
    },
    tags: { name: 'lesson_server_fn' },
  });
  lessonMs.add(res.timings.duration);
  return res;
}

export default function () {
  const user = users[__VU - 1];
  if (!user) {
    failRate.add(1);
    return;
  }

  const token = supabaseLogin(user.email, user.password);
  const loginOk = check(token, { 'login returned jwt': (t) => !!t });
  if (!loginOk) {
    failRate.add(1);
    return;
  }

  let lessonRes;
  if (MODE === 'full') {
    lessonRes = fetchLessonServerFn(token, user.cohortId, user.lessonId);
  } else {
    lessonRes = fetchLessonRest(token, user.lessonId);
  }

  const lessonOk = check(lessonRes, {
    'lesson status 200': (r) => r.status === 200,
    'lesson has body': (r) => (r.body || '').length > 100,
  });

  failRate.add(!(loginOk && lessonOk));
  sleep(0.3 + Math.random() * 0.7);
}
