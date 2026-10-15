import { EnrollmentRecord } from '../types';
import { FEATURED_COURSES } from './designSystemData';

const STATUSES: EnrollmentRecord['status'][] = ['pending', 'confirmed', 'cancelled'];

const PEOPLE: { name: string; email: string }[] = [
  { name: 'Ana Popescu', email: 'ana.popescu@email.ro' },
  { name: 'Mihai Ionescu', email: 'mihai.ionescu@firma.ro' },
  { name: 'Elena Dumitru', email: 'elena.d@company.com' },
  { name: 'Andrei Stan', email: 'andrei.stan@gmail.com' },
  { name: 'Ioana Radu', email: 'ioana.radu@hr.ro' },
  { name: 'Cristian Munteanu', email: 'c.munteanu@outlook.com' },
  { name: 'Maria Vasile', email: 'maria.vasile@edu.ro' },
  { name: 'George Enache', email: 'g.enache@business.ro' },
  { name: 'Diana Florea', email: 'diana.florea@mail.ro' },
  { name: 'Radu Constantinescu', email: 'radu.c@corp.ro' },
  { name: 'Simona Gheorghe', email: 'simona.g@agency.ro' },
  { name: 'Vlad Țăranu', email: 'vlad.taranu@pro.ro' },
  { name: 'Alina Moldovan', email: 'alina.moldovan@eu.ro' },
  { name: 'Paul Neagu', email: 'paul.neagu@finance.ro' },
  { name: 'Raluca Barbu', email: 'raluca.barbu@legal.ro' },
  { name: 'Florin Matei', email: 'florin.matei@it.ro' },
  { name: 'Oana Cristea', email: 'oana.cristea@pm.ro' },
  { name: 'Bogdan Barna', email: 'bogdan.barna@example.ro' },
  { name: 'Teodora Luca', email: 'teodora.luca@stud.ro' },
  { name: 'Nicolas Pavel', email: 'nicolas.pavel@cloud.ro' },
  { name: 'Laura Diaconu', email: 'laura.diaconu@acc.ro' },
  { name: 'Sorin Olteanu', email: 'sorin.olteanu@mgmt.ro' },
  { name: 'Carmen Voicu', email: 'carmen.voicu@hr.eu' },
  { name: 'Alexandru Petre', email: 'alex.petre@cyber.ro' },
  { name: 'Monica Stoica', email: 'monica.stoica@audit.ro' },
  { name: 'Dan Ilie', email: 'dan.ilie@proj.ro' },
  { name: 'Gabriela Nistor', email: 'gabriela.nistor@edu.eu' },
  { name: 'Horia Marinescu', email: 'horia.marinescu@firm.ro' },
];

function daysAgoIso(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(9 + (days % 8), (days * 7) % 60, 0, 0);
  return d.toISOString();
}

/** Demo înscrieri for admin pagination (28 rows → 3 pages at 10/page). */
export function createSeedEnrollments(): EnrollmentRecord[] {
  return PEOPLE.map((person, index) => {
    const course = FEATURED_COURSES[index % FEATURED_COURSES.length];
    return {
      id: `seed-${String(index + 1).padStart(3, '0')}`,
      courseId: course.id,
      courseTitle: course.title,
      studentName: person.name,
      studentEmail: person.email,
      status: STATUSES[index % STATUSES.length],
      createdAt: daysAgoIso(index),
    };
  });
}
