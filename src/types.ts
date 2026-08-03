export type TopTab = 'guidelines' | 'components' | 'tokens' | 'assets' | 'catalog';

export type SidebarSection =
  | 'brand-identity'
  | 'colors'
  | 'typography'
  | 'buttons-ui'
  | 'components'
  | 'motion-imagery';

export interface ColorSwatch {
  name: string;
  hex: string;
  variableName: string;
  textColor: string;
  border?: boolean;
}

export interface TypographySpec {
  name: string;
  specs: string;
  sample: string;
  size: string;
  weight: string;
  variableName?: string;
  lineHeight?: string;
  letterSpacing?: string;
  usage?: string;
}

export interface Course {
  id: string;
  title: string;
  category: 'HR' | 'Management' | 'IT' | 'Accounting' | 'Legal';
  durationHours: number;
  accreditedBy: string;
  priceLei: number;
  imageUrl: string;
  description: string;
  syllabus: string[];
  nextDate: string;
  level: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'blue';
}
