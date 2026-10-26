# Cursant hozzáférés befejezett / lezárt képzéshez

## Mi volt a hiba?

A `/lms` főoldal a `fetchStudentDashboard` szerverfüggvény válaszából épül. Ha a cursant **minden leckét befejezett** (`state: done`, pl. 55/55), a backend gyakran **nem ad vissza** sem `studentHome`-ot, sem `courses` listát → a UI a „Nu ai momentan nicio formare activă” üres állapotot mutatja, holott a kurzus tartalma továbbra is elérhető kell legyen (**Revezi** / olvasás).

Ugyanez érinti a **csoport végét** (`getCohortPhase` → `ended`), ha a szerver csak `running` / `upcoming` csoportokat listáz.

Az adatbázis (Supabase RLS, `cohort_members`) **nem** veszi el a hozzáférést lezárás után — a szűrés a **Node szerverfüggvényben** van.

## Érintett éles fájl (Lovable projekt)

Keress rá a projektben:

- `fetchStudentDashboard` vagy
- `fetch-student-dashboard`

Tipikus útvonal: `src/server/.../fetch-student-dashboard.ts` (TanStack Start `createServerFn`).

## Mit változtass?

1. **Import** (vagy illeszd be inline):

   `src/lib/lms/student-dashboard-membership.ts` ← másold a repo `lovable-src/lms/student-dashboard-membership.ts` fájlját.

2. **Tagsági lista** — ahol a `cohort_members` / enrollments sorokból dashboard sorok készülnek, **ne** szűrd ki:

   - `courseState === 'done'`
   - `getCohortPhase(cohort) === 'ended'`

   Helyette:

   ```ts
   import {
     getCohortPhase,
     isDashboardMembershipVisible,
     shouldBuildStudentHome,
     canSaveLessonProgressForMembership,
   } from '@/lib/lms/student-dashboard-membership';

   const visibleRows = allRows.filter((row) =>
     isDashboardMembershipVisible({
       enrollmentStatus: row.enrollment.status,
       cohortPhase: getCohortPhase(row.cohort),
       courseState: row.courseState,
     }),
   );
   ```

3. **`studentHome` építése** — ha eddig csak akkor volt `studentHome`, ha volt `progress` / `new` kurzus:

   ```ts
   if (shouldBuildStudentHome(visibleRows)) {
     // építs studentHome-ot a visibleRows-ból, beleértve state === 'done' sorokat is
     // a UI már kezeli: FINALIZATE + „Revezi” (lms.index)
   }
   ```

   A `featuredCourseId` legyen pl. első `progress`, különben legutóbbi `done` (hogy legyen hero / gyors link).

4. **Fallback `courses` lista** (amikor nincs teljes `studentHome`, de van repartizáció):

   - Ugyanaz a `visibleRows` forrás, **pending** csoportokkal együtt (`statusLabel` maradhat).

5. **`canSaveLessonProgress`** a dashboard válaszban:

   ```ts
   canSaveLessonProgress: canSaveLessonProgressForMembership(selectedRow),
   ```

   Így lezárt / kész kurzusnál a tartalom olvasható, de a progress mentés read-only marad.

## Ellenőrzés

1. Olyan cursant, aki **100%**-on van (pl. minden lecke kész): `/lms` → **Cursurile mele** / **FINALIZATE** + **Revezi**, nem üres főoldal.
2. Lejárt `end_date`-ű csoport: kurzus továbbra is megnyitható, progress opcionálisan tiltva.
3. Soha nem volt enrollments: továbbra is üres állapot + „Descoperă cursurile”.

## Deploy

Lovable: Publish / sync a fenti TS módosításokkal. Supabase migráció **nem** szükséges ehhez a viselkedéshez.
