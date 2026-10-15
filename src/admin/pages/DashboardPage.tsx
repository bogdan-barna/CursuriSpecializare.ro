import { useMemo } from 'react';
import {
  CalendarCheck2Icon,
  ClipboardListIcon,
  HourglassIcon,
  UsersIcon,
} from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@admincn/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@admincn/components/ui/chart';
import StatisticsCard from '@admincn/views/dashboards/statistics/statistics-card-01';

import type { EnrollmentRecord } from '../../types';
import { FEATURED_COURSES } from '../../data/designSystemData';
import { EnrollmentRecentTable } from '../inscrieri/EnrollmentRecentTable';

function countByStatus(rows: EnrollmentRecord[], status: EnrollmentRecord['status']) {
  return rows.filter((r) => r.status === status).length;
}

function countLastDays(rows: EnrollmentRecord[], days: number) {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return rows.filter((r) => new Date(r.createdAt).getTime() >= cutoff).length;
}

function buildWeeklyTrend(rows: EnrollmentRecord[]) {
  const buckets = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    date.setHours(0, 0, 0, 0);
    const label = date.toLocaleDateString('ro-RO', { weekday: 'short', day: '2-digit' });
    return { date: label, inscrieri: 0, key: date.toISOString().slice(0, 10) };
  });

  rows.forEach((row) => {
    const dayKey = row.createdAt.slice(0, 10);
    const bucket = buckets.find((b) => b.key === dayKey);
    if (bucket) bucket.inscrieri += 1;
  });

  return buckets.map(({ date, inscrieri }) => ({ date, inscrieri }));
}

const chartConfig = {
  inscrieri: {
    label: 'Înscrieri',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export function DashboardPage({ enrollments }: { enrollments: EnrollmentRecord[] }) {
  const stats = useMemo(
    () => ({
      total: enrollments.length,
      pending: countByStatus(enrollments, 'pending'),
      confirmed: countByStatus(enrollments, 'confirmed'),
      last7: countLastDays(enrollments, 7),
      activeCourses: FEATURED_COURSES.length,
    }),
    [enrollments]
  );

  const trend = useMemo(() => buildWeeklyTrend(enrollments), [enrollments]);
  const recent = useMemo(
    () =>
      [...enrollments]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10),
    [enrollments]
  );

  const statisticsCards = [
    {
      icon: <ClipboardListIcon className="size-4" />,
      value: String(stats.total),
      title: 'Total înscrieri',
      changePercentage: `${stats.last7} în ultimele 7 zile`,
    },
    {
      icon: <HourglassIcon className="size-4" />,
      value: String(stats.pending),
      title: 'În așteptare',
      changePercentage: 'Actualizare manuală din listă',
    },
    {
      icon: <CalendarCheck2Icon className="size-4" />,
      value: String(stats.confirmed),
      title: 'Confirmate',
      changePercentage: `${stats.activeCourses} cursuri active în catalog`,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
      <div className="col-span-full grid gap-6 sm:grid-cols-3 md:max-lg:grid-cols-1">
        {statisticsCards.map((card) => (
          <StatisticsCard
            key={card.title}
            icon={card.icon}
            title={card.title}
            value={card.value}
            changePercentage={card.changePercentage}
          />
        ))}
      </div>

      <Card className="col-span-full lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <UsersIcon className="size-4" />
            Evoluție înscrieri (7 zile)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {trend.every((d) => d.inscrieri === 0) ? (
            <p className="text-muted-foreground text-sm">Nu există înscrieri în intervalul selectat.</p>
          ) : (
            <ChartContainer config={chartConfig} className="aspect-auto h-[260px] w-full">
              <BarChart data={trend}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="inscrieri" fill="var(--color-inscrieri)" radius={4} />
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      <Card className="col-span-full w-full py-0">
        <EnrollmentRecentTable rows={recent} />
      </Card>
    </div>
  );
}
