import type { EnrollmentStatus } from '../../types';
import { Label } from '@admincn/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@admincn/components/ui/select';

const STATUS_ITEMS: { label: string; value: EnrollmentStatus | 'all' }[] = [
  { label: 'Toate', value: 'all' },
  { label: 'În așteptare', value: 'pending' },
  { label: 'Confirmate', value: 'confirmed' },
  { label: 'Anulate', value: 'cancelled' },
];

export function EnrollmentFilters({
  status,
  onStatusChange,
}: {
  status: EnrollmentStatus | 'all';
  onStatusChange: (status: EnrollmentStatus | 'all') => void;
}) {
  return (
    <div className="flex flex-col gap-4 border-b p-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="filter-status">Status înscriere</Label>
          <Select
            items={STATUS_ITEMS.map((item) => ({ label: item.label, value: item.value }))}
            value={status}
            onValueChange={(value: string | null) => {
              if (value) onStatusChange(value as EnrollmentStatus | 'all');
            }}
          >
            <SelectTrigger id="filter-status" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {STATUS_ITEMS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
