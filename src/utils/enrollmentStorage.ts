import { EnrollmentRecord } from '../types';
import { createSeedEnrollments } from '../data/enrollmentSeed';

const STORAGE_KEY = 'cs-admin-inscrieri-v1';

export function loadEnrollments(): EnrollmentRecord[] {
  if (typeof window === 'undefined') return createSeedEnrollments();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seed = createSeedEnrollments();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      return seed;
    }
    const parsed = JSON.parse(raw) as EnrollmentRecord[];
    return Array.isArray(parsed) ? parsed : createSeedEnrollments();
  } catch {
    return createSeedEnrollments();
  }
}

export function saveEnrollments(records: EnrollmentRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    /* ignore quota errors in demo */
  }
}

export function appendEnrollment(record: EnrollmentRecord): EnrollmentRecord[] {
  const existing = loadEnrollments();
  const next = [record, ...existing];
  saveEnrollments(next);
  return next;
}
