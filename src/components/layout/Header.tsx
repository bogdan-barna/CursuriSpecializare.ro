import React from 'react';
import { TopTab } from '../../types';
import { Moon, Sun, Download, ShieldCheck, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: TopTab;
  onSelectTab: (tab: TopTab) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenSdkModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  isDarkMode,
  onToggleTheme,
  onOpenSdkModal,
}) => {
  const tabs: { id: TopTab; label: string; badge?: string }[] = [
    { id: 'guidelines', label: 'Guidelines' },
    { id: 'components', label: 'Components' },
    { id: 'tokens', label: 'Tokens' },
    { id: 'assets', label: 'Assets' },
    { id: 'catalog', label: 'Course Catalog', badge: 'EU Accredited' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-200 ${
        isDarkMode
          ? 'bg-[#0B1C30] border-[#1E2E44] text-white'
          : 'bg-white border-[#E2E8F0] text-[#0B1C30]'
      }`}
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Identity / Logo */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onSelectTab('guidelines')}
            className="flex items-center space-x-2.5 text-left focus:outline-none group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#004CCA] flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:bg-[#0062FF] transition-colors">
              CS
            </div>
            <div className="flex items-baseline space-x-1">
              <span
                className={`font-bold text-lg tracking-tight transition-colors ${
                  isDarkMode ? 'text-white' : 'text-[#0B1C30]'
                }`}
              >
                CursuriSpecializare
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0062FF] inline-block"></span>
            </div>
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`relative px-4 py-5 text-sm font-medium transition-colors focus:outline-none flex items-center space-x-1.5 ${
                  isActive
                    ? 'text-[#0062FF] font-semibold'
                    : isDarkMode
                    ? 'text-[#A0AEC0] hover:text-white'
                    : 'text-[#475569] hover:text-[#0B1C30]'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                      isActive
                        ? 'bg-[#E5EEFF] text-[#004CCA]'
                        : isDarkMode
                        ? 'bg-[#1E2E44] text-[#94A3B8]'
                        : 'bg-[#EFF4FF] text-[#0062FF]'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
                {/* Active Underline exact from image */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0062FF] rounded-t-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenSdkModal}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-[#004CCA] hover:bg-[#0062FF] active:bg-[#003EA8] text-white text-sm font-semibold rounded-[8px] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0062FF] focus:ring-offset-2"
          >
            <span>Download SDK</span>
          </button>

          <button
            onClick={onToggleTheme}
            aria-label="Toggle dark mode"
            className={`p-2.5 rounded-[8px] transition-colors ${
              isDarkMode
                ? 'bg-[#1E2E44] text-[#E2E8F0] hover:bg-[#2A3E5C]'
                : 'bg-[#F8F9FF] text-[#485E8D] hover:bg-[#E2E8F0]'
            }`}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile nav pills */}
      <div className="flex md:hidden overflow-x-auto px-4 py-2 border-t border-gray-100 dark:border-gray-800 space-x-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-[#004CCA] text-white'
                  : isDarkMode
                  ? 'bg-[#1E2E44] text-[#A0AEC0]'
                  : 'bg-[#EFF4FF] text-[#485E8D]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
