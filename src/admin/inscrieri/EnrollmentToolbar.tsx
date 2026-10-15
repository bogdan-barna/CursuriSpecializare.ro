import { SearchIcon } from 'lucide-react';

import { InputGroup, InputGroupAddon, InputGroupInput } from '@admincn/components/ui/input-group';
import { Label } from '@admincn/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@admincn/components/ui/select';

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50];

export function EnrollmentToolbar({
  search,
  rowsPerPage,
  onSearch,
  onRowsPerPageChange,
}: {
  search: string;
  rowsPerPage: number;
  onSearch: (value: string) => void;
  onRowsPerPageChange: (value: number) => void;
}) {
  const items = ROWS_PER_PAGE_OPTIONS.map((option) => ({
    label: String(option),
    value: String(option),
  }));

  return (
    <div className="flex gap-4 p-6 max-sm:flex-col sm:items-center sm:justify-between">
      <div className="w-full max-w-2xs">
        <Label htmlFor="search-enrollment" className="sr-only">
          Căutare
        </Label>
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            id="search-enrollment"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Caută cursant, email sau curs"
            type="text"
          />
        </InputGroup>
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="rows-per-page" className="text-muted-foreground text-sm whitespace-nowrap">
          Rânduri
        </Label>
        <Select
          items={items}
          value={String(rowsPerPage)}
          onValueChange={(value: string | null) => {
            if (value) onRowsPerPageChange(Number(value));
          }}
        >
          <SelectTrigger id="rows-per-page" className="w-fit whitespace-nowrap">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {ROWS_PER_PAGE_OPTIONS.map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
