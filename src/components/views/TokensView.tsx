import React, { useState } from 'react';
import { DESIGN_TOKENS_CSS_CODE, COLOR_SWATCHES } from '../../data/designSystemData';
import { Copy, Check, Sliders, Palette, Layers, Box } from 'lucide-react';

interface TokensViewProps {
  onShowToast: (title: string, message: string) => void;
  isDarkMode: boolean;
}

export const TokensView: React.FC<TokensViewProps> = ({
  onShowToast,
  isDarkMode,
}) => {
  const [copiedCss, setCopiedCss] = useState(false);

  const handleCopyCss = () => {
    navigator.clipboard.writeText(DESIGN_TOKENS_CSS_CODE);
    setCopiedCss(true);
    onShowToast('CSS copied', 'Design tokens block copied to clipboard.');
    setTimeout(() => setCopiedCss(false), 2000);
  };

  const spacingTokens = [
    { name: '--spacing-unit', value: '4px', label: 'Base unit (1x)' },
    { name: '--spacing-xs', value: '8px', label: 'Minimal space (2x)' },
    { name: '--spacing-md', value: '16px', label: 'Standard space (4x)' },
    { name: '--spacing-lg', value: '24px', label: 'Gutters / Grid (6x)' },
    { name: '--spacing-xl', value: '32px', label: 'Small section (8x)' },
    { name: '--spacing-2xl', value: '48px', label: 'Medium section (12x)' },
    { name: '--spacing-3xl', value: '64px', label: 'Major section (16x)' },
  ];

  return (
    <div className="space-y-12 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-[#004CCA] uppercase">
            DESIGN TOKENS & SPECIFICATIONS
          </span>
          <h1
            className={`text-2xl sm:text-3xl font-bold mt-1 tracking-tight ${
              isDarkMode ? 'text-white' : 'text-[#0B1C30]'
            }`}
          >
            Design Tokens Architecture
          </h1>
          <p
            className={`mt-2 text-sm max-w-2xl ${
              isDarkMode ? 'text-[#CBD5E1]' : 'text-[#475569]'
            }`}
          >
            CSS custom properties defining the Professional Academic Blue identity. Export directly
            to your application or reference via Tailwind CSS classes.
          </p>
        </div>

        <button
          onClick={handleCopyCss}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#004CCA] hover:bg-[#0062FF] text-white text-sm font-semibold rounded-[8px] transition-all shadow-sm self-start sm:self-center"
        >
          {copiedCss ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copiedCss ? 'CSS Copied!' : 'Copy :root CSS'}</span>
        </button>
      </div>

      {/* 1. Complete CSS Code Block from screenshot */}
      <section className="space-y-3">
        <h2 className="text-base font-bold">1. CSS Custom Properties (:root)</h2>
        <div className="rounded-[8px] overflow-hidden bg-[#0B1C30] border border-[#1E2E44] shadow-md">
          <div className="flex items-center justify-between px-4 py-2 bg-[#0F1D32] border-b border-[#1E2E44] text-xs text-[#94A3B8]">
            <span>src/styles/tokens.css</span>
            <span>Design System v1.4.0-stable</span>
          </div>
          <pre className="p-6 text-xs sm:text-sm font-mono text-[#E2E8F0] overflow-x-auto leading-relaxed">
            <code>{DESIGN_TOKENS_CSS_CODE}</code>
          </pre>
        </div>
      </section>

      {/* 2. Color Variable Mapping */}
      <section className="space-y-4">
        <h2 className="text-base font-bold">2. Color Variables & Hex Code Mapping</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COLOR_SWATCHES.map((swatch) => (
            <div
              key={swatch.name}
              className={`p-4 rounded-[8px] border flex items-center space-x-3 ${
                isDarkMode
                  ? 'bg-[#132338] border-[#1E2E44]'
                  : 'bg-white border-[#E2E8F0] shadow-sm'
              }`}
            >
              <div
                style={{ backgroundColor: swatch.hex }}
                className={`w-10 h-10 rounded-[8px] flex-shrink-0 ${
                  swatch.border ? 'border border-gray-300' : ''
                }`}
              />
              <div className="min-w-0">
                <div className="text-xs font-semibold truncate">{swatch.name}</div>
                <div className="text-[11px] font-mono text-[#0062FF]">{swatch.variableName}</div>
                <div className="text-[11px] font-mono text-[#64748B]">{swatch.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Spacing Scale Visualizer */}
      <section className="space-y-4">
        <h2 className="text-base font-bold">3. Spacing Scale (4px Base Grid)</h2>
        <div
          className={`p-6 rounded-[8px] border space-y-4 ${
            isDarkMode
              ? 'bg-[#132338] border-[#1E2E44]'
              : 'bg-white border-[#E2E8F0] shadow-sm'
          }`}
        >
          {spacingTokens.map((item) => (
            <div key={item.name} className="flex items-center space-x-4">
              <div className="w-28 text-xs font-mono font-medium text-[#0062FF]">
                {item.value}
              </div>
              <div className="flex-1 flex items-center">
                <div
                  style={{ width: item.value }}
                  className="h-5 bg-[#0062FF] rounded-sm mr-3 transition-all"
                />
                <span className="text-xs text-[#64748B] hidden sm:inline">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Typography Token Variables (Inter Font) */}
      <section className="space-y-4">
        <h2 className="text-base font-bold">4. Typography Variables (Inter Typeface)</h2>
        <div
          className={`p-6 rounded-[8px] border space-y-4 ${
            isDarkMode
              ? 'bg-[#132338] border-[#1E2E44]'
              : 'bg-white border-[#E2E8F0] shadow-sm'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: '--font-family', value: 'Inter, -apple-system, sans-serif', desc: 'Primary institutional typeface' },
              { name: '--font-size-display', value: '48px (3rem)', desc: 'Display / Hero headers' },
              { name: '--font-size-h1', value: '32px (2rem)', desc: 'Page & Section titles' },
              { name: '--font-size-h2', value: '24px (1.5rem)', desc: 'Card headings & Modal titles' },
              { name: '--font-size-body-lg', value: '18px (1.125rem)', desc: 'Lead paragraphs & Intro text' },
              { name: '--font-size-body-md', value: '16px (1rem)', desc: 'Standard body text & tables' },
              { name: '--font-size-label', value: '13px (0.8125rem)', desc: 'Badges, chips & uppercase tags' },
            ].map((token) => (
              <div
                key={token.name}
                className={`p-4 rounded-[8px] border flex flex-col justify-between ${
                  isDarkMode
                    ? 'bg-[#0F1D32] border-[#1E2E44]'
                    : 'bg-[#F8F9FF] border-[#E2E8F0]'
                }`}
              >
                <div>
                  <div className="text-xs font-mono font-semibold text-[#0062FF]">
                    {token.name}
                  </div>
                  <div className="text-sm font-bold mt-1 text-[#0B1C30] dark:text-white">
                    {token.value}
                  </div>
                </div>
                <div className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-2 border-t border-gray-200 dark:border-gray-800 pt-2">
                  {token.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
