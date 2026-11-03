import type { EvaluationCriterion, EvaluationRecord } from '../types';
import { FEATURED_COURSES } from './designSystemData';
import { createSeedEnrollments } from './enrollmentSeed';

const CRITERIA_TEMPLATES: Omit<EvaluationCriterion, 'id' | 'score'>[] = [
  { label: 'Participare activă', maxScore: 10 },
  { label: 'Proiect practic / studiu de caz', maxScore: 30 },
  { label: 'Test final (cunoștințe teoretice)', maxScore: 40 },
  { label: 'Prezentare / colaborare în grup', maxScore: 20 },
];

const OUTCOMES: EvaluationRecord['outcome'][] = ['promovat', 'promovat', 'in_asteptare', 'respins'];

function buildCriteria(seed: number): EvaluationCriterion[] {
  return CRITERIA_TEMPLATES.map((template, index) => {
    const variance = ((seed + index * 3) % 5) - 2;
    const raw = Math.round(template.maxScore * (0.62 + (seed % 7) * 0.05) + variance);
    const score = Math.min(template.maxScore, Math.max(0, raw));
    return {
      id: `c-${index + 1}`,
      label: template.label,
      maxScore: template.maxScore,
      score,
    };
  });
}

function overallFromCriteria(criteria: EvaluationCriterion[]): number {
  const earned = criteria.reduce((sum, c) => sum + c.score, 0);
  const max = criteria.reduce((sum, c) => sum + c.maxScore, 0);
  return max === 0 ? 0 : Math.round((earned / max) * 100);
}

function daysAgoIso(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(14, 30, 0, 0);
  return d.toISOString();
}

/** Demo evaluări pentru admin (PDF export). */
export function createSeedEvaluations(): EvaluationRecord[] {
  const enrollments = createSeedEnrollments().filter((row) => row.status === 'confirmed');

  return enrollments.slice(0, 18).map((row, index) => {
    const criteria = buildCriteria(index);
    const overallPercent = overallFromCriteria(criteria);
    const course = FEATURED_COURSES.find((c) => c.id === row.courseId) ?? FEATURED_COURSES[0];
    const outcome: EvaluationRecord['outcome'] =
      overallPercent >= 70
        ? 'promovat'
        : overallPercent >= 50
          ? 'in_asteptare'
          : OUTCOMES[index % OUTCOMES.length];

    return {
      id: `eval-${String(index + 1).padStart(3, '0')}`,
      courseId: row.courseId,
      courseTitle: row.courseTitle,
      studentName: row.studentName,
      studentEmail: row.studentEmail,
      cohortLabel: `${course.level} · Grupa ${String.fromCharCode(65 + (index % 4))}-${2025 + (index % 2)}`,
      evaluatorName: index % 2 === 0 ? 'Prof. dr. Elena Marinescu' : 'Conf. dr. Andrei Popa',
      evaluatedAt: daysAgoIso(index + 2),
      overallPercent,
      outcome,
      criteria,
      comments:
        overallPercent >= 70
          ? 'Cursantul a demonstrat competențe solide și respectă standardele programului acreditat.'
          : 'Se recomandă consolidarea modulelor teoretice înainte de reevaluare.',
    };
  });
}
