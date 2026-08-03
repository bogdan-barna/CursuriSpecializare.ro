import React from 'react';
import { SidebarSection, TopTab } from '../../types';
import {
  ShieldCheck,
  Palette,
  Type,
  LayoutGrid,
  Box,
  Image as ImageIcon,
  BookOpen,
  Settings,
  ExternalLink,
  Sparkles,
  Layers,
} from 'lucide-react';

interface SidebarProps {
  activeSection: SidebarSection;
  onSelectSection: (section: SidebarSection) => void;
  onOpenStorybook: () => void;
  onOpenSettings: () => void;
  onOpenDocumentation: () => void;
  isDarkMode: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSelectSection,
  onOpenStorybook,
  onOpenSettings,
  onOpenDocumentation,
  isDarkMode,
}) => {
  const sections: { id: SidebarSection; label: string; icon: React.ReactNode }[] = [
    {
      id: 'brand-identity',
      label: 'Brand Identity',
      icon: <ShieldCheck className="w-4 h-4" />,
    },
    {
      id: 'colors',
      label: 'Colors',
      icon: <Palette className="w-4 h-4" />,
    },
    {
      id: 'typography',
      label: 'Typography',
      icon: <Type className="w-4 h-4" />,
    },
    {
      id: 'buttons-ui',
      label: 'Buttons & UI',
      icon: <LayoutGrid className="w-4 h-4" />,
    },
    {
      id: 'components',
      label: 'Components',
      icon: <Box className="w-4 h-4" />,
    },
    {
      id: 'motion-imagery',
      label: 'Motion & Imagery',
      icon: <ImageIcon className="w-4 h-4" />,
    },
  ];

  return (
    <aside
      className={`w-full lg:w-64 flex-shrink-0 border-r flex flex-col justify-between ${
        isDarkMode
          ? 'bg-[#0F1D32] border-[#1E2E44] text-white'
          : 'bg-white border-[#E2E8F0] text-[#0B1C30]'
      }`}
    >
      {/* Top Branding Header */}
      <div className="p-6">
        <div className="mb-6">
          <h2
            className={`font-bold text-base tracking-tight ${
              isDarkMode ? 'text-white' : 'text-[#0B1C30]'
            }`}
          >
            Design System
          </h2>
          <p
            className={`text-xs font-medium mt-0.5 ${
              isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
            }`}
          >
            v1.4.0-stable
          </p>
        </div>

        {/* Sidebar Navigation */}
        <nav className="space-y-1">
          {sections.map((item) => {
            const isSelected = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSection(item.id)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-[8px] text-sm font-medium transition-all ${
                  isSelected
                    ? isDarkMode
                      ? 'bg-[#1E3A68] text-white shadow-sm'
                      : 'bg-[#E5EEFF] text-[#004CCA] font-semibold shadow-sm'
                    : isDarkMode
                    ? 'text-[#A0AEC0] hover:bg-[#1E2E44] hover:text-white'
                    : 'text-[#475569] hover:bg-[#F8F9FF] hover:text-[#0B1C30]'
                }`}
              >
                <span
                  className={`${
                    isSelected
                      ? 'text-[#0062FF]'
                      : isDarkMode
                      ? 'text-[#64748B]'
                      : 'text-[#64748B]'
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Action Area: View Storybook, Settings, Documentation */}
      <div
        className={`p-6 border-t space-y-4 ${
          isDarkMode ? 'border-[#1E2E44]' : 'border-[#E2E8F0]'
        }`}
      >
        <button
          onClick={onOpenStorybook}
          className="w-full py-2.5 px-4 bg-[#004CCA] hover:bg-[#0062FF] active:bg-[#003EA8] text-white text-sm font-semibold rounded-[8px] transition-all shadow-sm flex items-center justify-center space-x-2"
        >
          <Layers className="w-4 h-4" />
          <span>View Storybook</span>
        </button>

        <div className="pt-2 space-y-2">
          <button
            onClick={onOpenSettings}
            className={`w-full flex items-center space-x-3 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              isDarkMode
                ? 'text-[#94A3B8] hover:text-white hover:bg-[#1E2E44]'
                : 'text-[#64748B] hover:text-[#0B1C30] hover:bg-[#F8F9FF]'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Settings</span>
          </button>

          <button
            onClick={onOpenDocumentation}
            className={`w-full flex items-center space-x-3 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              isDarkMode
                ? 'text-[#94A3B8] hover:text-white hover:bg-[#1E2E44]'
                : 'text-[#64748B] hover:text-[#0B1C30] hover:bg-[#F8F9FF]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Documentation</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
