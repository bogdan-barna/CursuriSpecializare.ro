// Third-party Imports
import type * as Icon from 'lucide-react';

type IconName = keyof typeof Icon;

export type MenuLeafSubItem = {
  label: string;
  href: string;
  activePath?: string;
  badge?: string;
  badgeClassName?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
};

export type MenuGroupSubItem = {
  label: string;
  childItems: MenuLeafSubItem[];
};

export type MenuSubItem = MenuLeafSubItem | MenuGroupSubItem;

export type MenuItem = {
  icon: IconName;
  label: string;
} & (
  | {
      href: string;
      activePath?: string;
      badge?: string;
      badgeClassName?: string;
      childItems?: never;
      target?: '_blank' | '_self' | '_parent' | '_top';
    }
  | {
      href?: never;
      badge?: string;
      badgeClassName?: string;
      childItems: MenuSubItem[];
    }
);

export type NavItem = {
  groupLabel?: string;
  items: MenuItem[];
};

/** CursuriSpecializare admin navigation (routes exist in this demo app). */
export const navItems: NavItem[] = [
  {
    groupLabel: 'Panou administrare',
    items: [
      {
        icon: 'LayoutDashboard',
        label: 'Panou principal',
        href: '/admin/dashboard',
        activePath: '/admin/dashboard',
      },
      {
        icon: 'ClipboardList',
        label: 'Înscrieri',
        href: '/admin/inscrieri',
        activePath: '/admin/inscrieri',
      },
    ],
  },
  {
    groupLabel: 'Platformă',
    items: [
      {
        icon: 'BookOpen',
        label: 'Catalog cursuri',
        href: '/admin/catalog',
        activePath: '/admin/catalog',
      },
      {
        icon: 'Palette',
        label: 'Design system',
        href: '#design-system',
        target: '_self',
      },
      {
        icon: 'ExternalLink',
        label: 'Admin producție',
        href: 'https://www.cursurispecializare.ro/admin/inscrieri',
        target: '_blank',
        badge: 'Live',
        badgeClassName: 'right-8',
      },
    ],
  },
  {
    groupLabel: 'Resurse',
    items: [
      {
        icon: 'BookOpenText',
        label: 'Documentație AdminCN',
        href: 'https://shadcnstudio.com/docs/documentation-admin/getting-started',
        target: '_blank',
      },
      {
        icon: 'Info',
        label: 'Suport șablon',
        href: 'https://shadcnstudio.com/support',
        target: '_blank',
      },
    ],
  },
];
