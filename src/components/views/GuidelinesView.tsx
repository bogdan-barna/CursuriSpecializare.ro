import React, { useState } from 'react';
import {
  COLOR_SWATCHES,
  TYPOGRAPHY_SPECS,
  DESIGN_TOKENS_CSS_CODE,
  FEATURED_COURSES,
} from '../../data/designSystemData';
import { Course } from '../../types';
import {
  ShieldCheck,
  GraduationCap,
  ArrowRight,
  Camera,
  Briefcase,
  Award,
  Users,
  CheckCircle2,
  Copy,
  Check,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

interface GuidelinesViewProps {
  onSelectCourse: (course: Course) => void;
  onShowToast: (title: string, message: string) => void;
  isDarkMode: boolean;
}

export const GuidelinesView: React.FC<GuidelinesViewProps> = ({
  onSelectCourse,
  onShowToast,
  isDarkMode,
}) => {
  const [fullName, setFullName] = useState('John Doe');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Human Resources');
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [copiedCss, setCopiedCss] = useState(false);
  const [copiedFontEmbed, setCopiedFontEmbed] = useState(false);
  const [activePhotoIcon, setActivePhotoIcon] = useState<number>(0);

  const handleCopyFontEmbed = () => {
    const embedCode = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');`;
    navigator.clipboard.writeText(embedCode);
    setCopiedFontEmbed(true);
    onShowToast('Font Embed Copied', 'Inter @import statement copied to clipboard.');
    setTimeout(() => setCopiedFontEmbed(false), 2000);
  };

  const handleCopyColor = (hex: string, name: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    onShowToast('Color copied', `${name} (${hex}) copied to clipboard.`);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const handleCopyCss = () => {
    navigator.clipboard.writeText(DESIGN_TOKENS_CSS_CODE);
    setCopiedCss(true);
    onShowToast('CSS copied', 'Design tokens CSS copied to clipboard.');
    setTimeout(() => setCopiedCss(false), 2000);
  };

  const sampleCourse = FEATURED_COURSES[0]; // Manager Resurse Umane

  return (
    <div className="space-y-16 pb-16">
      {/* 1. SYSTEM INTRODUCTION */}
      <section id="brand-identity" className="scroll-mt-24">
        <div className="mb-4">
          <span className="text-xs font-bold tracking-widest text-[#004CCA] uppercase">
            SYSTEM INTRODUCTION
          </span>
          <h1
            className={`text-2xl sm:text-3xl font-bold mt-1 tracking-tight ${
              isDarkMode ? 'text-white' : 'text-[#0B1C30]'
            }`}
          >
            Professional specialization for a secure future.
          </h1>
          <p
            className={`mt-3 text-sm sm:text-base max-w-4xl leading-relaxed ${
              isDarkMode ? 'text-[#CBD5E1]' : 'text-[#475569]'
            }`}
          >
            Our design system is built for a professional, educational environment that
            prioritizes trust, clarity, and authority. It targets lifelong learners and
            professionals seeking specialization, demanding an interface that feels both
            institutional and modern.
          </p>
        </div>

        {/* Two Trust Feature Cards exactly as in screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Card 1: Authority & Trust */}
          <div
            className={`p-6 rounded-[8px] border transition-all ${
              isDarkMode
                ? 'bg-[#132338] border-[#1E2E44]'
                : 'bg-white border-[#E2E8F0] shadow-sm'
            }`}
          >
            <div className="w-10 h-10 rounded-[8px] bg-[#EFF4FF] dark:bg-[#1E3A68] flex items-center justify-center text-[#0062FF] mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3
              className={`font-semibold text-lg ${
                isDarkMode ? 'text-white' : 'text-[#0B1C30]'
              }`}
            >
              Authority & Trust
            </h3>
            <p
              className={`mt-2 text-sm leading-relaxed ${
                isDarkMode ? 'text-[#94A3B8]' : 'text-[#475569]'
              }`}
            >
              We utilize a structured hierarchy and deep corporate navy to convey institutional
              reliability and accredited expertise.
            </p>
          </div>

          {/* Card 2: Modern Pedagogy */}
          <div
            className={`p-6 rounded-[8px] border transition-all ${
              isDarkMode
                ? 'bg-[#132338] border-[#1E2E44]'
                : 'bg-white border-[#E2E8F0] shadow-sm'
            }`}
          >
            <div className="w-10 h-10 rounded-[8px] bg-[#EFF4FF] dark:bg-[#1E3A68] flex items-center justify-center text-[#0062FF] mb-4">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3
              className={`font-semibold text-lg ${
                isDarkMode ? 'text-white' : 'text-[#0B1C30]'
              }`}
            >
              Modern Pedagogy
            </h3>
            <p
              className={`mt-2 text-sm leading-relaxed ${
                isDarkMode ? 'text-[#94A3B8]' : 'text-[#475569]'
              }`}
            >
              The clean interface and ample whitespace mirror our commitment to accessible,
              streamlined learning for the modern workplace.
            </p>
          </div>
        </div>
      </section>

      {/* 2. COLOR PALETTE */}
      <section id="colors" className="scroll-mt-24 pt-4 border-t border-gray-200 dark:border-gray-800">
        <div className="mb-6">
          <h2
            className={`text-xl font-bold tracking-tight ${
              isDarkMode ? 'text-white' : 'text-[#0B1C30]'
            }`}
          >
            Color Palette
          </h2>
          <p
            className={`mt-1 text-sm ${
              isDarkMode ? 'text-[#94A3B8]' : 'text-[#475569]'
            }`}
          >
            Strategic use of blue to guide the user's attention.
          </p>
        </div>

        {/* 4x2 Grid of Color Swatches */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {COLOR_SWATCHES.map((swatch) => {
            const isCopied = copiedColor === swatch.hex;
            return (
              <div
                key={swatch.name}
                onClick={() => handleCopyColor(swatch.hex, swatch.name)}
                className={`group cursor-pointer rounded-[8px] overflow-hidden border transition-all hover:shadow-md ${
                  isDarkMode
                    ? 'border-[#1E2E44] bg-[#132338]'
                    : 'border-[#E2E8F0] bg-white'
                }`}
              >
                {/* Color block */}
                <div
                  style={{ backgroundColor: swatch.hex }}
                  className={`h-28 w-full relative flex items-center justify-center ${
                    swatch.border ? 'border-b border-gray-200' : ''
                  }`}
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied' : 'Copy'}</span>
                  </span>
                </div>
                {/* Color text info */}
                <div className="p-3">
                  <div
                    className={`font-semibold text-sm truncate ${
                      isDarkMode ? 'text-white' : 'text-[#0B1C30]'
                    }`}
                  >
                    {swatch.name}
                  </div>
                  <div
                    className={`text-xs font-mono mt-0.5 ${
                      isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                    }`}
                  >
                    {swatch.hex}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. TYPOGRAPHY SYSTEM */}
      <section id="typography" className="scroll-mt-24 pt-4 border-t border-gray-200 dark:border-gray-800">
        <div className="mb-8">
          <span className="text-xs font-bold tracking-widest text-[#004CCA] uppercase">
            TYPOGRAPHY SPECIFICATION & FONT EMBEDDING
          </span>
          <h2
            className={`text-xl sm:text-2xl font-bold tracking-tight mt-1 ${
              isDarkMode ? 'text-white' : 'text-[#0B1C30]'
            }`}
          >
            Inter Variable Typeface System
          </h2>
          <p
            className={`mt-2 text-sm max-w-3xl leading-relaxed ${
              isDarkMode ? 'text-[#CBD5E1]' : 'text-[#475569]'
            }`}
          >
            <strong>Inter</strong> is the official typeface for CursuriSpecializare. Chosen for its
            neo-grotesque clarity, high x-height, open apertures, and exceptional numeric readability
            across dense educational tables and dashboards.
          </p>

          {/* How to Embed Inter Box */}
          <div
            className={`mt-6 p-5 rounded-[12px] border space-y-4 ${
              isDarkMode ? 'bg-[#132338] border-[#1E2E44]' : 'bg-[#EFF4FF] border-[#DCE9FF]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="font-bold text-sm text-[#004CCA] dark:text-[#60A5FA]">
                  How to Embed Inter in Your Web Application
                </h3>
                <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-0.5">
                  Use either Google Fonts CDN for public web or self-host via npm for internal institutional networks.
                </p>
              </div>
              <button
                onClick={handleCopyFontEmbed}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#004CCA] hover:bg-[#0062FF] text-white text-xs font-semibold rounded-[6px] transition-all self-start sm:self-center flex-shrink-0 shadow-sm"
              >
                {copiedFontEmbed ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedFontEmbed ? 'Copied @import' : 'Copy CSS @import'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-[8px] bg-[#0B1C30] p-3 text-xs font-mono text-[#CBD5E1] overflow-x-auto border border-[#1E2E44]">
                <div className="text-[10px] uppercase tracking-wider text-[#64748B] mb-1.5 font-sans font-semibold">
                  Option A: CSS / Google Fonts CDN
                </div>
                <code>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');</code>
              </div>
              <div className="rounded-[8px] bg-[#0B1C30] p-3 text-xs font-mono text-[#CBD5E1] overflow-x-auto border border-[#1E2E44]">
                <div className="text-[10px] uppercase tracking-wider text-[#64748B] mb-1.5 font-sans font-semibold">
                  Option B: NPM Self-Hosted Package
                </div>
                <code>npm install @fontsource-variable/inter</code>
                <div className="text-[#94A3B8] mt-1">// In main entry point (src/index.tsx):</div>
                <code>import '@fontsource-variable/inter';</code>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Typography Scale Cards */}
        <div className="space-y-6">
          {TYPOGRAPHY_SPECS.map((type) => (
            <div
              key={type.name}
              className={`p-6 rounded-[12px] border transition-all ${
                isDarkMode
                  ? 'bg-[#132338] border-[#1E2E44] hover:border-[#0062FF]'
                  : 'bg-white border-[#E2E8F0] shadow-sm hover:border-[#0062FF]'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-[#004CCA] dark:text-[#60A5FA]">
                      {type.name}
                    </span>
                    {type.variableName && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#EFF4FF] dark:bg-[#1E3A68] text-[#0062FF]">
                        {type.variableName}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1 font-mono">
                    {type.specs}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs font-mono text-[#475569] dark:text-[#CBD5E1]">
                  {type.lineHeight && (
                    <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">
                      Line-height: {type.lineHeight}
                    </span>
                  )}
                  {type.letterSpacing && (
                    <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">
                      Tracking: {type.letterSpacing}
                    </span>
                  )}
                </div>
              </div>

              {/* Sample Rendering */}
              <div className="py-5">
                <div
                  style={{
                    fontSize:
                      type.size === '48px'
                        ? 'clamp(28px, 4vw, 48px)'
                        : type.size === '32px'
                        ? 'clamp(22px, 3vw, 32px)'
                        : type.size === '24px'
                        ? '24px'
                        : type.size,
                    fontWeight: type.weight,
                  }}
                  className={`leading-tight sm:leading-snug tracking-tight ${
                    isDarkMode ? 'text-white' : 'text-[#0B1C30]'
                  }`}
                >
                  {type.sample}
                </div>
              </div>

              {type.usage && (
                <div className="pt-3 border-t border-gray-100 dark:border-gray-800 text-xs text-[#64748B] dark:text-[#94A3B8] flex items-center space-x-2">
                  <span className="font-semibold text-[#004CCA] dark:text-[#60A5FA]">
                    Recommended usage:
                  </span>
                  <span>{type.usage}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE ELEMENTS */}
      <section id="buttons-ui" className="scroll-mt-24 pt-4 border-t border-gray-200 dark:border-gray-800">
        <div className="mb-6">
          <h2
            className={`text-xl font-bold tracking-tight ${
              isDarkMode ? 'text-white' : 'text-[#0B1C30]'
            }`}
          >
            Interactive Elements
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* BUTTON STATES Card */}
          <div
            className={`p-6 rounded-[8px] border ${
              isDarkMode
                ? 'bg-[#132338] border-[#1E2E44]'
                : 'bg-[#EFF4FF] border-[#DCE9FF]'
            }`}
          >
            <div
              className={`text-xs font-bold uppercase tracking-wider mb-5 ${
                isDarkMode ? 'text-[#A0AEC0]' : 'text-[#0B1C30]'
              }`}
            >
              BUTTON STATES
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() =>
                  onShowToast('Primary Action', 'Primary Action button clicked.')
                }
                className="px-5 py-2.5 bg-[#004CCA] hover:bg-[#0062FF] active:bg-[#003EA8] text-white font-medium text-sm rounded-[8px] shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#0062FF] focus:ring-offset-2"
              >
                Primary Action
              </button>

              <button
                onClick={() =>
                  onShowToast('Outline Action', 'Outline Action button clicked.')
                }
                className={`px-5 py-2.5 font-medium text-sm rounded-[8px] border transition-all ${
                  isDarkMode
                    ? 'bg-transparent border-[#485E8D] text-white hover:bg-[#1E3A68]'
                    : 'bg-white border-[#0062FF] text-[#0062FF] hover:bg-[#F8F9FF]'
                }`}
              >
                Outline Action
              </button>

              <button
                onClick={() =>
                  onShowToast('Navigation Link', 'Text Link accessed.')
                }
                className="inline-flex items-center space-x-1 font-semibold text-sm text-[#0062FF] hover:underline focus:outline-none"
              >
                <span>Text Link</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* INPUTS & FIELDS Card */}
          <div
            className={`p-6 rounded-[8px] border ${
              isDarkMode
                ? 'bg-[#132338] border-[#1E2E44]'
                : 'bg-[#EFF4FF] border-[#DCE9FF]'
            }`}
          >
            <div
              className={`text-xs font-bold uppercase tracking-wider mb-4 ${
                isDarkMode ? 'text-[#A0AEC0]' : 'text-[#0B1C30]'
              }`}
            >
              INPUTS & FIELDS
            </div>

            <div className="space-y-4">
              {/* Full Name field */}
              <div>
                <label
                  className={`block text-xs font-medium mb-1 ${
                    isDarkMode ? 'text-[#CBD5E1]' : 'text-[#475569]'
                  }`}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded-[8px] border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#0062FF] ${
                    isDarkMode
                      ? 'bg-[#0F1D32] border-[#2A3E5C] text-white'
                      : 'bg-white border-[#C2C6D9] text-[#0B1C30]'
                  }`}
                />
              </div>

              {/* Select Specialty dropdown */}
              <div>
                <label
                  className={`block text-xs font-medium mb-1 ${
                    isDarkMode ? 'text-[#CBD5E1]' : 'text-[#475569]'
                  }`}
                >
                  Select Specialty
                </label>
                <div className="relative">
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => {
                      setSelectedSpecialty(e.target.value);
                      onShowToast(
                        'Specialty Selected',
                        `Selected domain: ${e.target.value}`
                      );
                    }}
                    className={`w-full px-3.5 py-2 pr-10 rounded-[8px] border text-sm appearance-none transition-all focus:outline-none focus:ring-2 focus:ring-[#0062FF] ${
                      isDarkMode
                        ? 'bg-[#0F1D32] border-[#2A3E5C] text-white'
                        : 'bg-white border-[#C2C6D9] text-[#0B1C30]'
                    }`}
                  >
                    <option value="Human Resources">Human Resources</option>
                    <option value="Project Management">Project Management</option>
                    <option value="Cybersecurity & IT">Cybersecurity & IT</option>
                    <option value="Accounting & Audit">Accounting & Audit</option>
                    <option value="Legal Management">Legal Management</option>
                  </select>
                  <ChevronDown
                    className={`w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${
                      isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CORE COMPONENTS */}
      <section id="components" className="scroll-mt-24 pt-4 border-t border-gray-200 dark:border-gray-800">
        <div className="mb-6">
          <h2
            className={`text-xl font-bold tracking-tight ${
              isDarkMode ? 'text-white' : 'text-[#0B1C30]'
            }`}
          >
            Core Components
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left card: Course Card preview */}
          <div
            onClick={() => onSelectCourse(sampleCourse)}
            className={`group rounded-[8px] overflow-hidden border cursor-pointer transition-all hover:shadow-lg ${
              isDarkMode
                ? 'bg-[#132338] border-[#1E2E44] hover:border-[#0062FF]'
                : 'bg-white border-[#E2E8F0] shadow-sm hover:border-[#0062FF]'
            }`}
          >
            {/* Image banner with badge */}
            <div className="relative h-48 w-full overflow-hidden bg-[#E5EEFF]">
              <img
                src={sampleCourse.imageUrl}
                alt={sampleCourse.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 bg-[#0062FF] text-white text-xs font-semibold rounded-full shadow-sm">
                  Specialization
                </span>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="px-2.5 py-1 bg-black/70 text-white text-[11px] font-medium rounded-md backdrop-blur-sm">
                  Click for details
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex flex-col justify-between space-y-4">
              <div>
                <h3
                  className={`font-bold text-lg group-hover:text-[#0062FF] transition-colors ${
                    isDarkMode ? 'text-white' : 'text-[#0B1C30]'
                  }`}
                >
                  {sampleCourse.title}
                </h3>
                <p
                  className={`text-sm mt-1.5 line-clamp-2 ${
                    isDarkMode ? 'text-[#94A3B8]' : 'text-[#475569]'
                  }`}
                >
                  {sampleCourse.description}
                </p>
              </div>

              {/* Price & Action row exact from screenshot */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                <span
                  className={`font-bold text-base ${
                    isDarkMode ? 'text-[#60A5FA]' : 'text-[#004CCA]'
                  }`}
                >
                  {sampleCourse.priceLei.toLocaleString('ro-RO')} lei
                </span>
                <span className="inline-flex items-center space-x-1 text-sm font-semibold text-[#0062FF] group-hover:translate-x-1 transition-transform">
                  <span>Details</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>

          {/* Right card: Accreditation Feature card */}
          <div
            className={`p-8 rounded-[8px] border flex flex-col justify-center ${
              isDarkMode
                ? 'bg-[#132338] border-[#1E2E44]'
                : 'bg-white border-[#E2E8F0] shadow-sm'
            }`}
          >
            <div className="w-10 h-10 rounded-[8px] bg-[#0062FF] text-white flex items-center justify-center mb-5 shadow-sm">
              <CheckCircle2 className="w-5 h-5" />
            </div>

            <h3
              className={`font-bold text-lg ${
                isDarkMode ? 'text-white' : 'text-[#0B1C30]'
              }`}
            >
              Accredited Diplomas
            </h3>
            <p
              className={`mt-2 text-sm leading-relaxed ${
                isDarkMode ? 'text-[#94A3B8]' : 'text-[#475569]'
              }`}
            >
              Our certificates are officially recognized by the Ministry of Education and are
              valid across the entire European Union.
            </p>

            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center space-x-2 text-xs text-[#64748B]">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>EU & RO Accreditation • Lifetime Validity</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ASSETS & IMAGERY */}
      <section id="motion-imagery" className="scroll-mt-24 pt-4 border-t border-gray-200 dark:border-gray-800">
        <div className="mb-6">
          <h2
            className={`text-xl font-bold tracking-tight ${
              isDarkMode ? 'text-white' : 'text-[#0B1C30]'
            }`}
          >
            Assets & Imagery
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left card: Photography Style */}
          <div
            className={`p-6 rounded-[8px] border flex flex-col justify-between space-y-6 ${
              isDarkMode
                ? 'bg-[#132338] border-[#1E2E44]'
                : 'bg-[#EFF4FF] border-[#DCE9FF]'
            }`}
          >
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-[8px] bg-[#0062FF] text-white flex items-center justify-center shadow-sm">
                <Camera className="w-6 h-6" />
              </div>
              <h3
                className={`font-bold text-base ${
                  isDarkMode ? 'text-white' : 'text-[#0B1C30]'
                }`}
              >
                Photography Style
              </h3>
              <p
                className={`text-xs max-w-sm mx-auto leading-relaxed ${
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
                    onShowToast('Iconography Style', `Standard Academic Blue: ${item.label}`);
                  }}
                  className={`h-12 rounded-[8px] border flex items-center justify-center transition-all ${
                    activePhotoIcon === idx
                      ? 'bg-[#004CCA] text-white border-[#004CCA] shadow-sm'
                      : isDarkMode
                      ? 'bg-[#0F1D32] border-[#2A3E5C] text-[#A0AEC0] hover:text-white'
                      : 'bg-white border-[#DCE9FF] text-[#485E8D] hover:border-[#0062FF]'
                  }`}
                  title={item.label}
                >
                  {item.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Right card: Dark Navy Iconography Specs */}
          <div className="p-8 rounded-[8px] bg-[#0B1C30] text-white flex flex-col justify-center border border-[#1E2E44] shadow-md">
            <h3 className="font-bold text-lg mb-4 text-white">
              Iconography Specs
            </h3>

            <ul className="space-y-3.5">
              <li className="flex items-center space-x-3 text-sm text-[#E2E8F0]">
                <CheckCircle2 className="w-5 h-5 text-[#60A5FA] flex-shrink-0" />
                <span>Weight: 400 (Standard)</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-[#E2E8F0]">
                <CheckCircle2 className="w-5 h-5 text-[#60A5FA] flex-shrink-0" />
                <span>Style: Material Symbols Outlined</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-[#E2E8F0]">
                <CheckCircle2 className="w-5 h-5 text-[#60A5FA] flex-shrink-0" />
                <span>Usage: Accent primary colors or neutral grey</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. DESIGN TOKENS */}
      <section id="tokens" className="scroll-mt-24 pt-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2
            className={`text-xl font-bold tracking-tight ${
              isDarkMode ? 'text-white' : 'text-[#0B1C30]'
            }`}
          >
            Design Tokens
          </h2>
          <button
            onClick={handleCopyCss}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#004CCA] hover:bg-[#0062FF] text-white text-xs font-semibold rounded-md transition-colors"
          >
            {copiedCss ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCss ? 'Copied CSS!' : 'Copy CSS'}</span>
          </button>
        </div>

        {/* Dark Navy code block exactly from screenshot */}
        <div className="rounded-[8px] overflow-hidden bg-[#0B1C30] border border-[#1E2E44] shadow-md">
          <pre className="p-6 text-xs sm:text-sm font-mono text-[#E2E8F0] overflow-x-auto leading-relaxed">
            <code>{DESIGN_TOKENS_CSS_CODE}</code>
          </pre>
        </div>
      </section>
    </div>
  );
};
