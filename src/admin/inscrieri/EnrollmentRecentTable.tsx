import { CardContent, CardHeader, CardTitle } from '@admincn/components/ui/card';

import type { EnrollmentRecord } from '../../types';
import { buildEnrollmentColumns } from './enrollment-table-columns';
import { EnrollmentTable } from './EnrollmentTable';

export function EnrollmentRecentTable({ rows }: { rows: EnrollmentRecord[] }) {
  const columns = buildEnrollmentColumns(() => {}).filter((col) => col.id !== 'actions');

  return (
    <>
      <CardHeader className="border-b">
        <CardTitle className="text-base">Înscrieri recente</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <EnrollmentTable rows={rows} columns={columns} />
      </CardContent>
    </>
  );
}
