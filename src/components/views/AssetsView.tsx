import React, { useState } from 'react';
import {
  Camera,
  GraduationCap,
  Briefcase,
  Award,
  Users,
  CheckCircle2,
  Download,
  FolderDown,
  FileCode2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { downloadDesignResource } from '../../utils/downloadSdk';

interface AssetsViewProps {
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'blue') => void;
  isDarkMode: boolean;
}

export const AssetsView: React.FC<AssetsViewProps> = ({
  onShowToast,
  isDarkMode,
}) => {
  const [activePhotoIcon, setActivePhotoIcon] = useState<number>(0);
  const [downloadedItems, setDownloadedItems] = useState<Record<string, boolean>>({});

  const iconSpecs = [
    { label: 'Weight', value: '400 (Standard)', desc: 'Ensures optimal readability across the academic interface' },
    { label: 'Style', value: 'Material Symbols Outlined', desc: 'Clean lines without superfluous ornamentation' },
    { label: 'Usage', value: 'Accent primary colors or neutral grey', desc: '#0062FF for active/action states, #64748B for neutral text' },
  ];

  const downloadAssets = [
    {
      name: 'Design System SVG Iconography Pack',
      format: 'HTML Previewer + SVG Sprite • 48 Icons',
      size: '1.2 MB',
      type: 'Icons',
      description: 'Production-ready SVG iconography library optimized at 400 stroke weight with 24x24 viewBox. Includes interactive HTML visualizer with copy-to-clipboard functionality.',
      highlights: [
        '16+ Academic & Corporate Symbols (Shield Check, Graduation Cap, Diploma, etc.)',
        'Material Symbols Outlined standard with #0062FF / #004CCA color bindings',
        'Interactive HTML previewer (cursuri-iconography-pack-v1.4.0.html) included',
      ],
    },
    {
      name: 'Professional Photography Guidelines & Presets',
      format: 'HTML Studio Handbook + XMP Specs',
      size: '14.5 MB',
      type: 'Imagery',
      description: 'Comprehensive studio handbook and color grading guide for academic and corporate photography. Defines high-key lighting, depth-of-field, and Lightroom color parameters.',
      highlights: [
        'High-Key Lighting setup: 5200K – 5400K natural daylight exposure',
        'Lightroom XMP color grading specs (Highlights -20, Shadows +30, Hue 210° cool tint)',
        'Authenticity checklist & visual Do\'s and Don\'ts for institutional credibility',
      ],
    },
    {
      name: 'Tailwind & CSS Tokens Standard File',
      format: 'CSS Custom Properties • :root v1.4.0',
      size: '42 KB',
      type: 'Tokens',
      description: 'Official CSS :root variables and Tailwind utility classes defining color swatches, Inter typography scale, elevation shadows, and academic focus rings.',
      highlights: [
        'Inter variable font embedding (@import Google Fonts / @fontsource)',
        'Responsive typography scale classes (.font-academic-display, .font-academic-h1)',
        'Copy-ready CSS variables (--color-primary, --color-accent, --color-navy)',
      ],
    },
    {
      name: 'Figma Community W3C Tokens JSON Kit',
      format: 'W3C 2024 Token Schema • JSON',
      size: '64 KB',
      type: 'Figma',
      description: 'Standard W3C design tokens file compatible with Figma Tokens / Tokens Studio, providing complete synchronization across design and engineering teams.',
      highlights: [
        'Semantic color tokens with author descriptions and contrast notes',
        '4px Base spacing grid tokens (--spacing-xs to --spacing-xxl)',
        'Elevation shadow parameters (sm, md, lg) with exact RGBA values',
      ],
    },
    {
      name: 'React Components Academic Kit (TypeScript)',
      format: 'TSX Component Library • Tailwind',
      size: '240 KB',
      type: 'React',
      description: 'Production TypeScript UI components built for React 18+ and Tailwind CSS, featuring accessible focus rings and institutional blue styling.',
      highlights: [
        'AcademicButton with primary, outline, and link variants',
        'CourseCard and AccreditationBadge components with TypeScript interfaces',
        'Accessible keyboard focus indicators and interactive hover states',
      ],
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      <div>
        <span className="text-xs font-bold tracking-widest text-[#004CCA] uppercase">
          ASSETS & IMAGERY LIBRARY
        </span>
        <h1
          className={`text-2xl sm:text-3xl font-bold mt-1 tracking-tight ${
            isDarkMode ? 'text-white' : 'text-[#0B1C30]'
          }`}
        >
          Visual Assets & Iconography Specs
        </h1>
        <p
          className={`mt-2 text-sm sm:text-base max-w-3xl ${
            isDarkMode ? 'text-[#CBD5E1]' : 'text-[#475569]'
          }`}
        >
          Download official iconography, photography direction guidelines, and design system tokens
          to ensure consistency across institutional and corporate applications.
        </p>
      </div>

      {/* 1. PHOTOGRAPHY STYLE & ICONOGRAPHY SPECS (exact from screenshot) */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold">1. Photography Style & Iconography Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left card: Photography Style */}
          <div
            className={`p-8 rounded-[8px] border flex flex-col justify-between space-y-8 ${
              isDarkMode
                ? 'bg-[#132338] border-[#1E2E44]'
                : 'bg-[#EFF4FF] border-[#DCE9FF]'
            }`}
          >
            <div className="text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-[8px] bg-[#0062FF] text-white flex items-center justify-center shadow-sm">
                <Camera className="w-7 h-7" />
              </div>
              <h3
                className={`font-bold text-lg ${
                  isDarkMode ? 'text-white' : 'text-[#0B1C30]'
                }`}
              >
                Photography Style
              </h3>
              <p
                className={`text-sm max-w-md mx-auto leading-relaxed ${
                  isDarkMode ? 'text-[#CBD5E1]' : 'text-[#475569]'
                }`}
              >
                Natural, professional, and candid. High-key lighting, corporate settings, and
                human-centric focus.
              </p>
            </div>

            {/* Bottom 4 icon square buttons */}
            <div className="grid grid-cols-4 gap-3 pt-4 border-t border-[#DCE9FF] dark:border-[#2A3E5C]">
              {[
                { icon: <GraduationCap className="w-5 h-5" />, label: 'Academic' },
                { icon: <Briefcase className="w-5 h-5" />, label: 'Corporate' },
                { icon: <Award className="w-5 h-5" />, label: 'Certified' },
                { icon: <Users className="w-5 h-5" />, label: 'Human-centric' },
              ].map((item, idx) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setActivePhotoIcon(idx);
                    onShowToast(
                      'Iconography Pack',
                      `Active visual standard: ${item.label} (400 weight, Material Symbols)`
                    );
                  }}
                  className={`h-14 rounded-[8px] border flex flex-col items-center justify-center space-y-1 transition-all ${
                    activePhotoIcon === idx
                      ? 'bg-[#004CCA] text-white border-[#004CCA] shadow-sm font-semibold'
                      : isDarkMode
                      ? 'bg-[#0F1D32] border-[#2A3E5C] text-[#A0AEC0] hover:text-white'
                      : 'bg-white border-[#DCE9FF] text-[#485E8D] hover:border-[#0062FF]'
                  }`}
                  title={item.label}
                >
                  {item.icon}
                  <span className="text-[10px]">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right card: Dark Navy Iconography Specs exactly from screenshot */}
          <div className="p-8 rounded-[8px] bg-[#0B1C30] text-white flex flex-col justify-center border border-[#1E2E44] shadow-md">
            <h3 className="font-bold text-lg mb-5 text-white">
              Iconography Specs
            </h3>

            <ul className="space-y-4">
              {iconSpecs.map((spec, index) => (
                <li key={index} className="flex items-start space-x-3 text-sm text-[#E2E8F0]">
                  <CheckCircle2 className="w-5 h-5 text-[#60A5FA] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white">{spec.label}: </span>
                    <span>{spec.value}</span>
                    <p className="text-xs text-[#94A3B8] mt-0.5">{spec.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 2. DOWNLOADABLE ASSETS PACKS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold">2. Downloadable Resource Packs (Design SDK)</h2>
            <p className="text-sm text-[#64748B] mt-1">
              Official institutional assets, design token files, photography guides, and iconography libraries.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#DCE9FF] text-[#004CCA] self-start sm:self-center">
            Standard v1.4.0-stable
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {downloadAssets.map((item) => (
            <div
              key={item.name}
              className={`p-6 rounded-[12px] border flex flex-col justify-between space-y-6 transition-all ${
                isDarkMode
                  ? 'bg-[#132338] border-[#1E2E44] hover:border-[#0062FF]'
                  : 'bg-white border-[#E2E8F0] shadow-sm hover:border-[#0062FF] hover:shadow-md'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-11 h-11 rounded-[8px] bg-[#EFF4FF] dark:bg-[#1E3A68] text-[#0062FF] flex items-center justify-center flex-shrink-0">
                      {item.type === 'Icons' ? (
                        <FolderDown className="w-5 h-5" />
                      ) : item.type === 'Imagery' ? (
                        <Camera className="w-5 h-5" />
                      ) : item.type === 'Tokens' ? (
                        <FileCode2 className="w-5 h-5" />
                      ) : (
                        <Sparkles className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-base">{item.name}</h4>
                      <div className="flex items-center space-x-2 text-xs text-[#0062FF] font-mono mt-0.5">
                        <span>{item.format}</span>
                        <span>•</span>
                        <span className="text-[#64748B]">{item.size}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-[#CBD5E1]' : 'text-[#475569]'}`}>
                  {item.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                    Included Specifications & Files:
                  </span>
                  <ul className="space-y-1.5">
                    {item.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs text-[#64748B] dark:text-[#94A3B8]">
                        <CheckCircle2 className="w-4 h-4 text-[#0062FF] mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span className="text-xs font-mono text-[#64748B]">
                  License: Institutional / MIT
                </span>
                <button
                  onClick={() => {
                    const { filename } = downloadDesignResource(item.name);
                    setDownloadedItems((prev) => ({ ...prev, [item.name]: true }));
                    onShowToast(
                      'File Downloaded Successfully!',
                      `Package "${item.name}" (${filename}) has been downloaded to your computer.`,
                      'success'
                    );
                  }}
                  className={`px-4 py-2.5 text-white text-xs font-semibold rounded-[8px] transition-all flex items-center space-x-2 shadow-sm ${
                    downloadedItems[item.name]
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'bg-[#004CCA] hover:bg-[#0062FF]'
                  }`}
                >
                  {downloadedItems[item.name] ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Downloaded</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download Package</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
