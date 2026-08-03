import { DESIGN_TOKENS_CSS_CODE, COLOR_SWATCHES, TYPOGRAPHY_SPECS } from '../data/designSystemData';

/**
 * Triggers a real browser download of a file with given name, content, and MIME type.
 */
export function triggerFileDownload(filename: string, content: string, mimeType: string) {
  try {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Download failed:', err);
  }
}

/**
 * Generates and downloads standard files for the Design System packages & resources.
 */
export function downloadDesignResource(itemName: string): { filename: string; sizeLabel: string } {
  // 1. CSS Tokens File
  if (
    itemName.includes('Tailwind & CSS Tokens') ||
    itemName.includes('tokens') ||
    itemName.includes('@cursuri/design-tokens')
  ) {
    const cssContent = `/**
 * CursuriSpecializare — Professional Academic Blue Design System v1.4.0-stable
 * Official CSS Custom Properties & Design Tokens
 * License: MIT / Academic Institutional Use
 * Font: Inter (Google Fonts / @fontsource-variable/inter)
 */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

${DESIGN_TOKENS_CSS_CODE}

/* ==========================================================================
   Typography Classes & Scale
   ========================================================================== */

.font-academic-display {
  font-family: var(--font-family);
  font-size: var(--font-size-display);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.025em;
}

.font-academic-h1 {
  font-family: var(--font-family);
  font-size: var(--font-size-h1);
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.015em;
}

.font-academic-h2 {
  font-family: var(--font-family);
  font-size: 24px;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: -0.01em;
}

.font-academic-body-lg {
  font-family: var(--font-family);
  font-size: 18px;
  font-weight: 400;
  line-height: 1.6;
}

.font-academic-body-md {
  font-family: var(--font-family);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
}

.font-academic-label {
  font-family: var(--font-family);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* ==========================================================================
   Utility Background & Color Classes
   ========================================================================== */

.bg-academic-primary { background-color: var(--color-primary); }
.bg-academic-accent { background-color: var(--color-accent); }
.bg-academic-navy { background-color: var(--color-navy); }
.bg-academic-surface { background-color: var(--color-surface); }
.text-academic-main { color: var(--color-text-main); }
.border-academic-outline { border-color: var(--color-outline); }

/* ==========================================================================
   Interactive Button States & Academic Rings
   ========================================================================== */

.btn-academic-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  font-family: var(--font-family);
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
  background-color: var(--color-primary);
  border-radius: var(--border-radius);
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  border: none;
}

.btn-academic-primary:hover {
  background-color: var(--color-accent);
  box-shadow: var(--shadow-md);
}

.btn-academic-primary:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
`;
    const filename = 'cursuri-specializare-tokens-v1.4.0.css';
    triggerFileDownload(filename, cssContent, 'text/css;charset=utf-8');
    return { filename, sizeLabel: '42 KB' };
  }

  // 2. Figma Community / JSON Kit
  if (
    itemName.includes('Figma') ||
    itemName.includes('JSON Kit') ||
    itemName.includes('sync-figma')
  ) {
    const figmaTokens = {
      $schema: 'https://token.schema.dev/2024/tokens.json',
      name: 'Professional Academic Blue Design System',
      version: '1.4.0-stable',
      author: 'Academic Education Directorate',
      color: {
        primary: { $type: 'color', $value: '#004CCA', $description: 'Primary corporate action color' },
        accent: { $type: 'color', $value: '#0062FF', $description: 'Accent link and active state blue' },
        navy: { $type: 'color', $value: '#485E8D', $description: 'Secondary academic navy' },
        surface: { $type: 'color', $value: '#F8F9FF', $description: 'Light canvas background' },
        surfaceLight: { $type: 'color', $value: '#FFFFFF', $description: 'Card surface background' },
        textMain: { $type: 'color', $value: '#0B1C30', $description: 'Main text heading color' },
        outline: { $type: 'color', $value: '#737687', $description: 'Border and outline color' },
        containerHigh: { $type: 'color', $value: '#DCE9FF', $description: 'High emphasis container background' },
      },
      typography: {
        fontFamily: { $type: 'fontFamily', $value: 'Inter, -apple-system, sans-serif', $description: 'Primary variable typeface' },
        displayLg: { $type: 'typography', $value: { fontFamily: 'Inter', fontSize: '48px', fontWeight: '700', lineHeight: '1.1', letterSpacing: '-0.025em' } },
        headlineLg: { $type: 'typography', $value: { fontFamily: 'Inter', fontSize: '32px', fontWeight: '600', lineHeight: '1.3', letterSpacing: '-0.015em' } },
        headlineMd: { $type: 'typography', $value: { fontFamily: 'Inter', fontSize: '24px', fontWeight: '600', lineHeight: '1.3', letterSpacing: '-0.01em' } },
        bodyLg: { $type: 'typography', $value: { fontFamily: 'Inter', fontSize: '18px', fontWeight: '400', lineHeight: '1.6', letterSpacing: '0em' } },
        bodyMd: { $type: 'typography', $value: { fontFamily: 'Inter', fontSize: '16px', fontWeight: '400', lineHeight: '1.6', letterSpacing: '0em' } },
        labelSm: { $type: 'typography', $value: { fontFamily: 'Inter', fontSize: '13px', fontWeight: '600', lineHeight: '1.4', letterSpacing: '0.05em' } },
      },
      spacing: {
        unit: { $type: 'dimension', $value: '4px' },
        xs: { $type: 'dimension', $value: '8px' },
        md: { $type: 'dimension', $value: '16px' },
        lg: { $type: 'dimension', $value: '24px' },
        xl: { $type: 'dimension', $value: '32px' },
        xxl: { $type: 'dimension', $value: '48px' },
      },
      elevation: {
        sm: { $type: 'shadow', $value: { offsetX: '0px', offsetY: '2px', blur: '4px', color: 'rgba(0,29,74,0.05)' } },
        md: { $type: 'shadow', $value: { offsetX: '0px', offsetY: '4px', blur: '12px', color: 'rgba(0,29,74,0.08)' } },
        lg: { $type: 'shadow', $value: { offsetX: '0px', offsetY: '12px', blur: '24px', color: 'rgba(0,29,74,0.12)' } },
      },
      borderRadius: {
        standard: { $type: 'dimension', $value: '8px', $description: 'Universal radius for cards, buttons, inputs' },
        pill: { $type: 'dimension', $value: '9999px', $description: 'Pill badges and status chips' },
      }
    };
    const filename = 'cursuri-figma-tokens-v1.4.0.json';
    triggerFileDownload(filename, JSON.stringify(figmaTokens, null, 2), 'application/json;charset=utf-8');
    return { filename, sizeLabel: '64 KB' };
  }

  // 3. SVG Iconography Pack
  if (
    itemName.includes('Iconography') ||
    itemName.includes('SVG') ||
    itemName.includes('Icon')
  ) {
    const htmlPreview = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Academic Blue v1.4.0 — Iconography Library & Previewer</title>
  <style>
    :root { --primary: #004CCA; --accent: #0062FF; --bg: #F8F9FF; --card: #FFFFFF; --text: #0B1C30; }
    body { font-family: 'Inter', -apple-system, sans-serif; background: var(--bg); color: var(--text); padding: 40px; max-width: 1100px; margin: 0 auto; line-height: 1.5; }
    header { border-bottom: 2px solid #DCE9FF; padding-bottom: 24px; margin-bottom: 32px; }
    h1 { color: var(--primary); font-size: 28px; margin: 0 0 8px 0; }
    p { color: #475569; margin: 0; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; margin-top: 24px; }
    .icon-card { background: var(--card); border: 1px solid #E2E8F0; border-radius: 8px; padding: 20px; display: flex; flex-direction: column; items-center: center; align-items: center; text-align: center; transition: all 0.2s; cursor: pointer; }
    .icon-card:hover { border-color: var(--accent); box-shadow: 0 4px 12px rgba(0,29,74,0.08); }
    .icon-card svg { width: 32px; height: 32px; stroke: var(--primary); margin-bottom: 12px; }
    .icon-name { font-size: 13px; font-weight: 600; color: var(--text); }
    .icon-code { font-size: 11px; color: #64748B; font-family: monospace; margin-top: 4px; }
    .toast { position: fixed; bottom: 24px; right: 24px; background: var(--primary); color: white; padding: 12px 20px; border-radius: 8px; font-size: 14px; opacity: 0; transition: opacity 0.3s; pointer-events: none; }
    .toast.show { opacity: 1; }
  </style>
</head>
<body>
  <header>
    <h1>Academic Blue Iconography Library v1.4.0</h1>
    <p>Click any icon card below to copy its inline SVG code or use symbol reference. Optimized at 400 stroke weight with 24x24 viewBox.</p>
  </header>
  <div class="grid" id="iconGrid"></div>
  <div class="toast" id="toast">SVG Copied to Clipboard!</div>

  <script>
    const icons = [
      { name: "Shield Check", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>' },
      { name: "Graduation Cap", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>' },
      { name: "Award Diploma", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>' },
      { name: "Briefcase", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>' },
      { name: "Book Open", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>' },
      { name: "Camera Studio", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>' },
      { name: "Users Cohort", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
      { name: "Check Circle", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>' },
      { name: "Certificate Seal", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg>' },
      { name: "Calendar Schedule", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>' },
      { name: "Clock Hours", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
      { name: "Download Package", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>' },
      { name: "Sparkles Quality", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>' },
      { name: "Search Academic", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>' },
      { name: "Lock Compliance", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>' },
      { name: "Layers Hierarchy", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>' }
    ];

    const grid = document.getElementById('iconGrid');
    const toast = document.getElementById('toast');

    icons.forEach(icon => {
      const card = document.createElement('div');
      card.className = 'icon-card';
      card.innerHTML = icon.svg + '<div class="icon-name">' + icon.name + '</div><div class="icon-code">Click to copy</div>';
      card.onclick = () => {
        navigator.clipboard.writeText(icon.svg);
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      };
      grid.appendChild(card);
    });
  </script>
</body>
</html>`;
    const filename = 'cursuri-iconography-pack-v1.4.0.html';
    triggerFileDownload(filename, htmlPreview, 'text/html;charset=utf-8');
    return { filename, sizeLabel: '185 KB' };
  }

  // 4. Photography Guidelines & Presets
  if (
    itemName.includes('Photography') ||
    itemName.includes('Presets')
  ) {
    const htmlGuideline = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Academic Blue — Photography & Visual Guidelines v1.4.0</title>
  <style>
    :root { --primary: #004CCA; --accent: #0062FF; --bg: #F8F9FF; --card: #FFFFFF; --text: #0B1C30; --border: #E2E8F0; }
    body { font-family: 'Inter', -apple-system, sans-serif; background: var(--bg); color: var(--text); padding: 48px 32px; line-height: 1.6; max-width: 900px; margin: 0 auto; }
    h1 { color: var(--primary); font-size: 32px; margin-bottom: 8px; letter-spacing: -0.02em; }
    .subtitle { color: #64748B; font-size: 16px; margin-bottom: 40px; }
    .card { background: var(--card); padding: 28px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,29,74,0.06); margin-bottom: 24px; border: 1px solid var(--border); }
    h3 { color: var(--primary); font-size: 20px; margin: 0 0 12px 0; border-bottom: 2px solid #DCE9FF; padding-bottom: 8px; }
    ul { padding-left: 20px; margin: 0; }
    li { margin-bottom: 8px; }
    .preset-table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    .preset-table th, .preset-table td { border: 1px solid var(--border); padding: 10px 14px; text-align: left; font-size: 14px; }
    .preset-table th { background: #F1F5F9; font-weight: 600; color: var(--primary); }
    code { background: #EFF4FF; color: var(--accent); padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 13px; }
    .tag { display: inline-block; padding: 4px 10px; background: #DCE9FF; color: var(--primary); border-radius: 9999px; font-size: 12px; font-weight: 600; margin-bottom: 8px; }
  </style>
</head>
<body>
  <div class="tag">STUDIO HANDBOOK & LIGHTROOM SPEC</div>
  <h1>Academic Photography & Visual Guidelines</h1>
  <div class="subtitle">Official specification for imagery, lighting, and Lightroom presets across CursuriSpecializare digital platforms.</div>
  
  <div class="card">
    <h3>1. High-Key Lighting & Natural Exposure</h3>
    <p>All academic photography used across course cards and institutional headers must prioritize <strong>natural, diffused high-key lighting</strong>. Avoid dramatic Rembrandt shadows, low-key noir lighting, or harsh artificial flash.</p>
    <ul>
      <li><strong>Target Color Temperature:</strong> 5200K – 5400K (Neutral daylight with slight warmth)</li>
      <li><strong>Shadow Detail:</strong> Lift shadows (+25 to +35 in Lightroom) so that facial features and attire remain clear and inviting.</li>
      <li><strong>Contrast:</strong> Soft contrast (-10 to -15) to maintain an approachable, professional academic atmosphere.</li>
    </ul>
  </div>

  <div class="card">
    <h3>2. Lightroom XMP & LUT Grading Parameters</h3>
    <p>Apply these precise color grading values to maintain brand harmony with the Academic Blue palette (#004CCA / #0062FF):</p>
    <table class="preset-table">
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Standard Value</th>
          <th>Academic Rationale</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>White Balance (Temp / Tint)</td>
          <td><code>5200K / +4 Tint</code></td>
          <td>Clean white walls without yellow cast</td>
        </tr>
        <tr>
          <td>Highlights / Whites</td>
          <td><code>-20 / +10</code></td>
          <td>Prevents blown-out windows in lecture halls</td>
        </tr>
        <tr>
          <td>Shadows / Blacks</td>
          <td><code>+30 / -5</code></td>
          <td>Retains depth without crushing dark suits</td>
        </tr>
        <tr>
          <td>Color Grading (Shadows)</td>
          <td><code>Hue 210° / Sat 8%</code></td>
          <td>Subtle cool navy undertone matching brand navy (#485E8D)</td>
        </tr>
        <tr>
          <td>Clarity / Texture</td>
          <td><code>+5 / +10</code></td>
          <td>Crisp fabric and book details without harsh skin contrast</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="card">
    <h3>3. Subject Composition & Authenticity</h3>
    <p>Institutional credibility requires genuine representation of adult learners and faculty:</p>
    <ul>
      <li><strong>Authentic Interaction:</strong> Subjects should be engaged in real academic tasks (seminars, whiteboard discussions, collaborative analysis).</li>
      <li><strong>No Staged Stock Clichés:</strong> Strictly avoid generic stock imagery featuring exaggerated camera-facing smiles or isolated handshakes.</li>
      <li><strong>Depth of Field:</strong> Use moderate aperture (<code>f/2.8 – f/4.0</code>) to keep the primary subject sharp while softly blurring background classroom elements.</li>
    </ul>
  </div>
</body>
</html>`;
    const filename = 'cursuri-photography-guidelines-v1.4.0.html';
    triggerFileDownload(filename, htmlGuideline, 'text/html;charset=utf-8');
    return { filename, sizeLabel: '14.5 MB' };
  }

  // 5. React Components Academic Kit
  if (
    itemName.includes('react-components') ||
    itemName.includes('React') ||
    itemName.includes('academic')
  ) {
    const reactSnippet = `/**
 * CursuriSpecializare — React Components Academic Kit v1.4.0-stable
 * Professional Academic Blue Design System (Inter Font & Tailwind CSS)
 * License: MIT / Academic Institutional Use
 */

import React from 'react';

/* ==========================================================================
   1. AcademicButton Component
   ========================================================================== */

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'link';
  children: React.ReactNode;
}

export const AcademicButton: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'px-5 py-2.5 font-semibold text-sm rounded-[8px] transition-all focus:outline-none focus:ring-2 focus:ring-[#0062FF] focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-[#004CCA] hover:bg-[#0062FF] active:bg-[#003EA8] text-white shadow-sm',
    outline: 'bg-white border border-[#0062FF] text-[#0062FF] hover:bg-[#EFF4FF]',
    link: 'text-[#0062FF] hover:underline px-0 py-0',
  };

  return (
    <button
      className={\`\${baseClasses} \${variantClasses[variant]} \${className}\`}
      {...props}
    >
      {children}
    </button>
  );
};

/* ==========================================================================
   2. AccreditationBadge Component
   ========================================================================== */

export interface BadgeProps {
  label: string;
  category?: 'EU' | 'Ministry' | 'Standard';
}

export const AccreditationBadge: React.FC<BadgeProps> = ({ label, category = 'EU' }) => {
  return (
    <span className="inline-flex items-center px-3 py-1 bg-[#DCE9FF] text-[#004CCA] text-xs font-semibold rounded-full border border-[#0062FF]/20 shadow-sm">
      {label}
    </span>
  );
};

/* ==========================================================================
   3. CourseCard Component
   ========================================================================== */

export interface CourseCardProps {
  title: string;
  category: string;
  priceLei: number;
  durationHours: number;
  accreditedBy: string;
  imageUrl: string;
  onSelect?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  category,
  priceLei,
  durationHours,
  accreditedBy,
  imageUrl,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-[8px] border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-md hover:border-[#0062FF] transition-all cursor-pointer flex flex-col"
    >
      <div className="h-44 w-full relative overflow-hidden bg-[#EFF4FF]">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3">
          <AccreditationBadge label={category} />
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-bold text-base text-[#0B1C30]">{title}</h3>
          <p className="text-xs text-[#64748B] mt-1">{durationHours} hours • {accreditedBy}</p>
        </div>
        <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
          <span className="font-bold text-lg text-[#004CCA]">{priceLei.toLocaleString()} RON</span>
          <span className="text-xs font-semibold text-[#0062FF]">View details &rarr;</span>
        </div>
      </div>
    </div>
  );
};
`;
    const filename = 'cursuri-react-components-v1.4.0.tsx';
    triggerFileDownload(filename, reactSnippet, 'text/typescript;charset=utf-8');
    return { filename, sizeLabel: '240 KB' };
  }

  // Default fallback download
  const defaultContent = `/**
 * Professional Academic Blue Design System v1.4.0-stable
 * Package: ${itemName}
 */
export const DESIGN_SYSTEM_VERSION = "1.4.0-stable";
`;
  const filename = `cursuri-${itemName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.txt`;
  triggerFileDownload(filename, defaultContent, 'text/plain;charset=utf-8');
  return { filename, sizeLabel: '48 KB' };
}

