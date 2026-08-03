import { ColorSwatch, Course, TypographySpec } from '../types';

export const COLOR_SWATCHES: ColorSwatch[] = [
  {
    name: 'Primary Blue',
    hex: '#004CCA',
    variableName: '--color-primary',
    textColor: '#FFFFFF',
  },
  {
    name: 'Accent Blue',
    hex: '#0062FF',
    variableName: '--color-accent',
    textColor: '#FFFFFF',
  },
  {
    name: 'Secondary Navy',
    hex: '#485E8D',
    variableName: '--color-navy',
    textColor: '#FFFFFF',
  },
  {
    name: 'Background',
    hex: '#F8F9FF',
    variableName: '--color-surface',
    textColor: '#0B1C30',
    border: true,
  },
  {
    name: 'Surface Light',
    hex: '#FFFFFF',
    variableName: '--color-surface-light',
    textColor: '#0B1C30',
    border: true,
  },
  {
    name: 'Text Heading',
    hex: '#0B1C30',
    variableName: '--color-text-main',
    textColor: '#FFFFFF',
  },
  {
    name: 'Outline/Border',
    hex: '#737687',
    variableName: '--color-outline',
    textColor: '#FFFFFF',
  },
  {
    name: 'Container High',
    hex: '#DCE9FF',
    variableName: '--color-container-high',
    textColor: '#0B1C30',
  },
];

export const TYPOGRAPHY_SPECS: TypographySpec[] = [
  {
    name: 'Display LG (700, 48px)',
    specs: 'Inter • 700 Bold • 48px (3rem) • 1.1 Line Height',
    sample: 'Experience Excellence in Education',
    size: '48px',
    weight: '700',
    variableName: '--font-size-display',
    lineHeight: '1.1 (52.8px)',
    letterSpacing: '-0.025em (-1.2px)',
    usage: 'Primary landing headlines, hero banners, and key marketing value propositions.',
  },
  {
    name: 'Headline LG (600, 32px)',
    specs: 'Inter • 600 SemiBold • 32px (2rem) • 1.3 Line Height',
    sample: 'Master the Future Workforce',
    size: '32px',
    weight: '600',
    variableName: '--font-size-h1',
    lineHeight: '1.3 (41.6px)',
    letterSpacing: '-0.015em (-0.48px)',
    usage: 'Section titles, major dashboard headers, and institutional program categories.',
  },
  {
    name: 'Headline MD (600, 24px)',
    specs: 'Inter • 600 SemiBold • 24px (1.5rem) • 1.35 Line Height',
    sample: 'Accredited Specialization Programs',
    size: '24px',
    weight: '600',
    variableName: '--font-size-h2',
    lineHeight: '1.35 (32.4px)',
    letterSpacing: '-0.01em (-0.24px)',
    usage: 'Course card titles, syllabus section headers, and modal window titles.',
  },
  {
    name: 'Body LG (400, 18px)',
    specs: 'Inter • 400 Regular • 18px (1.125rem) • 1.6 Line Height',
    sample: 'Selecting up-to-date professional courses designed by experienced trainers and focused on essential skills for the modern labor market.',
    size: '18px',
    weight: '400',
    variableName: '--font-size-body-lg',
    lineHeight: '1.6 (28.8px)',
    letterSpacing: '0em',
    usage: 'Introductory paragraphs, lead descriptions, and course overview summaries.',
  },
  {
    name: 'Body MD (400, 16px)',
    specs: 'Inter • 400 Regular • 16px (1rem) • 1.6 Line Height',
    sample: 'Our courses are structured to provide you with the practical competencies needed to succeed in your professional career.',
    size: '16px',
    weight: '400',
    variableName: '--font-size-body-md',
    lineHeight: '1.6 (25.6px)',
    letterSpacing: '0em',
    usage: 'Standard body copy, form labels, course syllabus items, and data table text.',
  },
  {
    name: 'Label SM / Caption (600, 13px)',
    specs: 'Inter • 600 SemiBold • 13px (0.8125rem) • 1.4 Line Height',
    sample: 'ACCREDITED BY THE MINISTRY OF EDUCATION • 48 HOURS',
    size: '13px',
    weight: '600',
    variableName: '--font-size-label',
    lineHeight: '1.4 (18.2px)',
    letterSpacing: '0.05em (+0.65px)',
    usage: 'Status chips, accreditation pills, uppercase tags, and secondary metadata.',
  },
];

export const DESIGN_TOKENS_CSS_CODE = `:root {
  /* Colors */
  --color-primary: #004cca;
  --color-accent: #0062ff;
  --color-navy: #485e8d;
  --color-surface: #f8f9ff;
  --color-text-main: #0b1c30;

  /* Typography */
  --font-family: 'Inter', sans-serif;
  --font-size-display: 48px;
  --font-size-h1: 32px;
  --font-size-body: 16px;

  /* Layout */
  --max-width: 1200px;
  --border-radius: 8px;
  --spacing-unit: 4px;

  /* Elevation */
  --shadow-sm: 0 2px 4px rgba(0, 29, 74, 0.05);
  --shadow-md: 0 4px 12px rgba(0, 29, 74, 0.08);
  --shadow-lg: 0 12px 24px rgba(0, 29, 74, 0.12);
}`;

export const FEATURED_COURSES: Course[] = [
  {
    id: 'hr-180',
    title: 'Human Resources Manager',
    category: 'HR',
    durationHours: 180,
    accreditedBy: 'Ministry of Education & EU Accredited',
    priceLei: 1090,
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
    description: '180-hour specialization program accredited by the Ministry. Gain practical skills in labor legislation, talent acquisition, performance evaluation, and strategic HR management.',
    syllabus: [
      'Module 1: Legislative Framework and Labor Law in EU Standards',
      'Module 2: Modern Recruitment and Talent Selection Strategies',
      'Module 3: Payroll, Benefits, and Social Compliance',
      'Module 4: Performance Evaluation and Career Development',
      'Module 5: Institutional Conflict Resolution and Organizational Communication'
    ],
    nextDate: 'September 15, 2026',
    level: 'Advanced • Standard Accreditation Code 121207'
  },
  {
    id: 'pm-120',
    title: 'European Project Management',
    category: 'Management',
    durationHours: 120,
    accreditedBy: 'Ministry of Education & EU Accredited',
    priceLei: 1450,
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    description: 'Practical course for writing, submitting, and managing projects financed through European Union Structural & Regional Funds.',
    syllabus: [
      'Module 1: Identifying Funding Lines and Eligibility Analysis',
      'Module 2: Writing the Application and Logical Framework Matrix',
      'Module 3: Budgeting, Public Procurement, and Financial Reporting',
      'Module 4: Risk Management and European Project Auditing'
    ],
    nextDate: 'October 1, 2026',
    level: 'Intermediate • Standard Accreditation Code 242101'
  },
  {
    id: 'it-cyber',
    title: 'Cybersecurity & GDPR Compliance Specialist',
    category: 'IT',
    durationHours: 160,
    accreditedBy: 'CERT-EU & Ministry of Education',
    priceLei: 1890,
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    description: 'Comprehensive training in organizational cybersecurity, NIS2 Directive compliance, and personal data protection.',
    syllabus: [
      'Module 1: Security Architectures and Vulnerability Assessment',
      'Module 2: NIS2 Directive Implementation in Enterprises',
      'Module 3: GDPR Audit and Security Incident Management',
      'Module 4: Zero-Trust Policies and Cloud Infrastructure Protection'
    ],
    nextDate: 'October 20, 2026',
    level: 'Advanced • Standard Accreditation Code 252901'
  },
  {
    id: 'fin-acc',
    title: 'Financial Accounting & Internal Audit',
    category: 'Accounting',
    durationHours: 140,
    accreditedBy: 'European Accounting Body',
    priceLei: 1250,
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    description: 'Master International Financial Reporting Standards (IFRS), annual financial closing procedures, and modern auditing methodologies.',
    syllabus: [
      'Module 1: Balance Sheets and Annual Financial Statements',
      'Module 2: IFRS vs. European Accounting Directives',
      'Module 3: Applied Fiscality: Value Added Tax and Corporate Tax',
      'Module 4: Internal Audit Lifecycle and Executive Reporting'
    ],
    nextDate: 'November 5, 2026',
    level: 'Advanced • Standard Accreditation Code 241104'
  }
];
