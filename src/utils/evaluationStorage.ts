import type { EvaluationRecord } from '../types';
import { createSeedEvaluations } from '../data/evaluationSeed';

const STORAGE_KEY = 'cs-admin-evaluari-v1';

export function loadEvaluations(): EvaluationRecord[] {
  if (typeof window === 'undefined') return createSeedEvaluations();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seed = createSeedEvaluations();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      return seed;
    }
    const parsed = JSON.parse(raw) as EvaluationRecord[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const seed = createSeedEvaluations();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      return seed;
    }
    return parsed;
  } catch {
    return createSeedEvaluations();
  }
}

export function saveEvaluations(records: EvaluationRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    /* ignore quota errors in demo */
  }
}
