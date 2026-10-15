import { MoonStarIcon, SunIcon } from 'lucide-react';

import { Button } from '@admincn/components/ui/button';

import { useAdminTheme } from './AdminThemeProvider';

const AdminModeToggle = () => {
  const { resolvedTheme, setTheme } = useAdminTheme();

  const handleModeChange = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button variant="ghost" size="icon" className="relative" onClick={handleModeChange}>
      <MoonStarIcon className="scale-100 dark:scale-0" />
      <SunIcon className="absolute scale-0 dark:scale-100" />
      <span className="sr-only">Comută tema</span>
    </Button>
  );
};

export default AdminModeToggle;
