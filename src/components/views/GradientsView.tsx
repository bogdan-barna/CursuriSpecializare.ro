import React, { useState } from 'react';
import { Check, Copy, Layers, Palette, Sparkles } from 'lucide-react';

interface GradientsViewProps {
  onShowToast: (title: string, message: string) => void;
  isDarkMode: boolean;
}

interface GradientToken {
  name: string;
  usage: string;
  css: string;
  tailwindClass?: string;
  colors: string[];
  note: string;
}

const GRADIENTS: GradientToken[] = [
  {
    name: 'Catalog Banner Soft Blue',
    usage: 'Course Catalog hero / top announcement surfaces',
    css: 'linear-gradient(90deg, #EFF4FF 0%, #E5EEFF 100%)',
    tailwindClass: 'bg-gradient-to-r from-[#EFF4FF] to-[#E5EEFF]',
    colors: ['#EFF4FF', '#E5EEFF'],
    note: 'Used by the current catalog banner for a soft, educational blue surface.',
  },
  {
    name: 'Modal Image Scrim',
    usage: 'Course detail modal image overlay for readable titles',
    css: 'linear-gradient(0deg, #0B1C30 0%, rgba(11, 28, 48, 0.50) 50%, transparent 100%)',
    tailwindClass: 'bg-gradient-to-t from-[#0B1C30] via-[#0B1C30]/50 to-transparent',
    colors: ['#0B1C30', 'rgba(11, 28, 48, 0.50)', 'transparent'],
    note: 'Dark navy image overlay used to keep white titles and badges readable.',
  },
  {
    name: 'Primary Action Blue',
    usage: 'Primary CTA cards, active navigation states, download buttons',
    css: 'linear-gradient(135deg, #004CCA 0%, #0062FF 100%)',
    colors: ['#004CCA', '#0062FF'],
    note: 'A stronger action gradient derived from the two main brand blues.',
  },
  {
    name: 'Academic Navy Depth',
    usage: 'Dark cards, premium sections, institutional panels',
    css: 'linear-gradient(135deg, #0B1C30 0%, #132338 100%)',
    colors: ['#0B1C30', '#132338'],
    note: 'Best for dark mode surfaces and institutional trust sections.',
  },
  {
    name: 'Container Blue Elevation',
    usage: 'Secondary info cards, helper panels, documentation callouts',
    css: 'linear-gradient(135deg, #F8F9FF 0%, #DCE9FF 100%)',
    colors: ['#F8F9FF', '#DCE9FF'],
    note: 'Adds light-mode depth without introducing heavy contrast.',
  },
  {
    name: 'Accent Highlight Glow',
    usage: 'Small feature cards, badge backgrounds, visual emphasis',
    css: 'radial-gradient(circle at top left, rgba(0, 98, 255, 0.22) 0%, rgba(0, 76, 202, 0.08) 42%, transparent 78%)',
    colors: ['rgba(0, 98, 255, 0.22)', 'rgba(0, 76, 202, 0.08)', 'transparent'],
    note: 'Decorative glow that stays inside the CursuriSpecializare blue system.',
  },
];

export const GradientsView: React.FC<GradientsViewProps> = ({ onShowToast, isDarkMode }) => {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const copyValue = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    setCopiedValue(value);
    onShowToast('Gradient copied', `${label} copied to clipboard.`);
    setTimeout(() => setCopiedValue(null), 1800);
  };

  return (
    <div className="space-y-10 pb-16">
      <section>
        <span className="text-xs font-bold tracking-widest text-[#004CCA] uppercase">
          Gradient Library
        </span>
        <div className="mt-2 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <h1
              className={`text-2xl sm:text-3xl font-bold tracking-tight ${
                isDarkMode ? 'text-white' : 'text-[#0B1C30]'
              }`}
            >
              CursuriSpecializare gradient colors
            </h1>
            <p
              className={`mt-3 max-w-3xl text-sm sm:text-base leading-relaxed ${
                isDarkMode ? 'text-[#CBD5E1]' : 'text-[#475569]'
              }`}
            >
              A card-by-card collection of gradients, color codes, and copy-ready CSS values used
              across the CursuriSpecializare visual system.
            </p>
          </div>
          <div
            className={`inline-flex items-center gap-2 rounded-[8px] border px-4 py-3 text-sm font-semibold ${
              isDarkMode
                ? 'bg-[#132338] border-[#1E2E44] text-[#CBD5E1]'
                : 'bg-white border-[#E2E8F0] text-[#485E8D] shadow-sm'
            }`}
          >
            <Palette className="w-4 h-4 text-[#0062FF]" />
            {GRADIENTS.length} gradient tokens
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {GRADIENTS.map((gradient) => (
          <article
            key={gradient.name}
            className={`group rounded-[12px] border overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg ${
              isDarkMode
                ? 'bg-[#132338] border-[#1E2E44] hover:border-[#0062FF]'
                : 'bg-white border-[#E2E8F0] shadow-sm hover:border-[#0062FF]'
            }`}
          >
            <div className="h-40 relative overflow-hidden" style={{ background: gradient.css }}>
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0))]" />
              <div className="absolute left-5 bottom-5 flex items-center gap-2">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] bg-white/20 text-white backdrop-blur-md ring-1 ring-white/30">
                  <Sparkles className="w-5 h-5" />
                </span>
                <span className="rounded-full bg-black/45 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                  {gradient.colors.length} colors
                </span>
              </div>
            </div>

            <div className="p-5 space-y-5">
              <div>
                <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-[#0B1C30]'}`}>
                  {gradient.name}
                </h2>
                <p className={`mt-1 text-sm ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
                  {gradient.usage}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {gradient.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => copyValue(color, color)}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-mono transition-all hover:scale-105 ${
                      isDarkMode
                        ? 'bg-[#0B1C30] border-[#2A3E5C] text-[#E2E8F0] hover:border-[#0062FF]'
                        : 'bg-[#F8F9FF] border-[#DCE9FF] text-[#0B1C30] hover:border-[#0062FF]'
                    }`}
                  >
                    <span
                      className="h-3.5 w-3.5 rounded-full border border-white/40 shadow-sm"
                      style={{
                        background:
                          color === 'transparent'
                            ? 'linear-gradient(135deg, #ffffff 25%, #cbd5e1 25%, #cbd5e1 50%, #ffffff 50%, #ffffff 75%, #cbd5e1 75%)'
                            : color,
                      }}
                    />
                    {color}
                  </button>
                ))}
              </div>

              <div
                className={`rounded-[8px] border p-4 ${
                  isDarkMode ? 'bg-[#0B1C30] border-[#1E2E44]' : 'bg-[#F8F9FF] border-[#E2E8F0]'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#64748B]">
                    <Layers className="w-3.5 h-3.5" /> CSS value
                  </div>
                  <button
                    onClick={() => copyValue(gradient.css, gradient.name)}
                    className="inline-flex items-center gap-1.5 rounded-[6px] bg-[#004CCA] px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-[#0062FF]"
                  >
                    {copiedValue === gradient.css ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedValue === gradient.css ? 'Copied' : 'Copy CSS'}
                  </button>
                </div>
                <code className={`block break-words text-xs leading-relaxed ${isDarkMode ? 'text-[#CBD5E1]' : 'text-[#334155]'}`}>
                  background: {gradient.css};
                </code>
                {gradient.tailwindClass && (
                  <code className={`mt-2 block break-words text-xs leading-relaxed ${isDarkMode ? 'text-[#60A5FA]' : 'text-[#004CCA]'}`}>
                    {gradient.tailwindClass}
                  </code>
                )}
              </div>

              <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                {gradient.note}
              </p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};
