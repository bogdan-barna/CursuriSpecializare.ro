/**
 * Éles LMS (Lovable / TanStack Start) — cursant dashboard szűrés.
 *
 * Probléma: a fetchStudentDashboard csak „aktív” formákat ad vissza. Ha a cursant
 * befejezte a kurzust (100% lecke) vagy a csoport időszaka lejárt, üres a főoldal
 * („Nu ai momentan nicio formare activă”), pedig a tartalom olvasás/revizió továbbra is kell.
 *
 * Telepítés: másold be src/lib/lms/student-dashboard-membership.ts alá (vagy egyező útvonal),
 * majd kövesd a FETCH_STUDENT_DASHBOARD.md lépéseit.
 */

export type CohortPhase = 'running' | 'upcoming' | 'ended' | 'undated';

export type StudentCourseState = 'progress' | 'new' | 'pending' | 'done';

const MS_PER_DAY = 86_400_000;

/** Ugyanaz a logika, mint az éles group-utils getCohortPhase (cohort start/end date). */
export function getCohortPhase(
  cohort: { start_date?: string | null; end_date?: string | null },
  nowMs: number = Date.now(),
): CohortPhase {
  const startMs = cohort.start_date ? new Date(cohort.start_date).getTime() : NaN;
  const endMs = cohort.end_date ? new Date(cohort.end_date).getTime() + MS_PER_DAY - 1 : NaN;

  if (Number.isNaN(startMs)) return 'undated';
  if (startMs > nowMs) return 'upcoming';
  if (!Number.isNaN(endMs) && endMs < nowMs) return 'ended';
  return 'running';
}

export type DashboardEnrollmentRow = {
  enrollmentStatus: string;
  cohortPhase: CohortPhase;
  /** pl. upcoming + még nincs modul */
  courseState: StudentCourseState;
};

/**
 * Mely beiratkozások jelenjenek meg a cursant főoldalon és kurzus-választóban.
 * Korábban: gyakran csak running/upcoming + nem-done.
 * Új: enrolled státusz + running | upcoming | ended (archív hozzáférés).
 */
export function isDashboardMembershipVisible(row: DashboardEnrollmentRow): boolean {
  if (row.enrollmentStatus !== 'enrolled') return false;
  if (row.cohortPhase === 'undated') return true;
  return row.cohortPhase === 'running' || row.cohortPhase === 'upcoming' || row.cohortPhase === 'ended';
}

/** Van-e olyan sor, amiből studentHome épülhet (nem csak üres fallback). */
export function shouldBuildStudentHome(rows: DashboardEnrollmentRow[]): boolean {
  return rows.some(isDashboardMembershipVisible);
}

/**
 * Tartalom megtekintés vs. progress mentés: lezárt csoport / befejezett kurzus = read-only.
 * (Az éles UI: „Progresul se salvează doar ca membru al grupei active.”)
 */
export function canSaveLessonProgressForMembership(row: DashboardEnrollmentRow): boolean {
  if (row.enrollmentStatus !== 'enrolled') return false;
  if (row.courseState === 'done') return false;
  if (row.cohortPhase === 'ended') return false;
  return row.cohortPhase === 'running';
}
