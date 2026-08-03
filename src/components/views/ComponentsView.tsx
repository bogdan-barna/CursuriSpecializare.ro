import React, { useState } from 'react';
import { Course } from '../../types';
import { FEATURED_COURSES } from '../../data/designSystemData';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  AlertCircle,
  HelpCircle,
  BookOpen,
} from 'lucide-react';

interface ComponentsViewProps {
  onSelectCourse: (course: Course) => void;
  onShowToast: (title: string, message: string) => void;
  isDarkMode: boolean;
}

export const ComponentsView: React.FC<ComponentsViewProps> = ({
  onSelectCourse,
  onShowToast,
  isDarkMode,
}) => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'buttons' | 'cards' | 'badges'>('all');

  return (
    <div className="space-y-12 pb-16">
      <div>
        <span className="text-xs font-bold tracking-widest text-[#004CCA] uppercase">
          DESIGN SYSTEM SHOWCASE
        </span>
        <h1
          className={`text-2xl sm:text-3xl font-bold mt-1 tracking-tight ${
            isDarkMode ? 'text-white' : 'text-[#0B1C30]'
          }`}
        >
          Interactive UI Components Library
        </h1>
        <p
          className={`mt-2 text-sm sm:text-base max-w-3xl ${
            isDarkMode ? 'text-[#CBD5E1]' : 'text-[#475569]'
          }`}
        >
          Explore and interact with the standard CursuriSpecializare UI components. All components
          adhere strictly to the Professional Academic Blue v1.4.0-stable specifications.
        </p>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          {(['all', 'buttons', 'cards', 'badges'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedTab === tab
                  ? 'bg-[#004CCA] text-white shadow-sm'
                  : isDarkMode
                  ? 'bg-[#132338] text-[#A0AEC0] hover:text-white'
                  : 'bg-[#EFF4FF] text-[#485E8D] hover:bg-[#DCE9FF]'
              }`}
            >
              {tab === 'all'
                ? 'All Components'
                : tab === 'buttons'
                ? 'Buttons & Actions'
                : tab === 'cards'
                ? 'Course Cards'
                : 'Badges & Accreditation'}
            </button>
          ))}
        </div>
      </div>

      {/* 1. BUTTONS SECTION */}
      {(selectedTab === 'all' || selectedTab === 'buttons') && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold">1. Buttons & Action States</h2>
          <div
            className={`p-6 rounded-[8px] border grid grid-cols-1 md:grid-cols-3 gap-6 ${
              isDarkMode
                ? 'bg-[#132338] border-[#1E2E44]'
                : 'bg-white border-[#E2E8F0] shadow-sm'
            }`}
          >
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase text-[#64748B]">Primary Solid</span>
              <div className="pt-1">
                <button
                  onClick={() =>
                    onShowToast('Primary Button', 'Brand color #004CCA • Radius 8px')
                  }
                  className="w-full py-2.5 px-4 bg-[#004CCA] hover:bg-[#0062FF] text-white font-semibold text-sm rounded-[8px] shadow-sm transition-all"
                >
                  Primary Action
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase text-[#64748B]">Outline / Border</span>
              <div className="pt-1">
                <button
                  onClick={() =>
                    onShowToast('Outline Button', 'Thin border #0062FF with white/transparent background')
                  }
                  className={`w-full py-2.5 px-4 font-semibold text-sm rounded-[8px] border transition-all ${
                    isDarkMode
                      ? 'border-[#485E8D] text-white hover:bg-[#1E3A68]'
                      : 'border-[#0062FF] text-[#0062FF] hover:bg-[#EFF4FF]'
                  }`}
                >
                  Outline Action
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase text-[#64748B]">Text Link</span>
              <div className="pt-1 flex items-center justify-center h-10">
                <button
                  onClick={() => onShowToast('Text Link', 'Arrow navigation link • #0062FF')}
                  className="inline-flex items-center space-x-1.5 font-semibold text-sm text-[#0062FF] hover:underline"
                >
                  <span>Text Link</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. COURSE CARDS GRID SECTION */}
      {(selectedTab === 'all' || selectedTab === 'cards') && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold">2. Course Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_COURSES.slice(0, 3).map((course) => (
              <div
                key={course.id}
                onClick={() => onSelectCourse(course)}
                className={`group rounded-[8px] overflow-hidden border cursor-pointer transition-all hover:shadow-lg ${
                  isDarkMode
                    ? 'bg-[#132338] border-[#1E2E44] hover:border-[#0062FF]'
                    : 'bg-white border-[#E2E8F0] shadow-sm hover:border-[#0062FF]'
                }`}
              >
                <div className="relative h-44 w-full overflow-hidden bg-[#E5EEFF]">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-[#0062FF] text-white text-xs font-semibold rounded-full shadow-sm">
                      Specialization
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-base group-hover:text-[#0062FF] transition-colors">
                      {course.title}
                    </h3>
                    <p
                      className={`text-xs mt-1.5 line-clamp-2 ${
                        isDarkMode ? 'text-[#94A3B8]' : 'text-[#475569]'
                      }`}
                    >
                      {course.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                    <span
                      className={`font-bold text-sm ${
                        isDarkMode ? 'text-[#60A5FA]' : 'text-[#004CCA]'
                      }`}
                    >
                      {course.priceLei.toLocaleString()} RON
                    </span>
                    <span className="inline-flex items-center space-x-1 text-xs font-semibold text-[#0062FF]">
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. ACCREDITATION BADGES SECTION */}
      {(selectedTab === 'all' || selectedTab === 'badges') && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold">3. Accreditation Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={`p-6 rounded-[8px] border flex items-start space-x-4 ${
                isDarkMode
                  ? 'bg-[#132338] border-[#1E2E44]'
                  : 'bg-white border-[#E2E8F0] shadow-sm'
              }`}
            >
              <div className="w-10 h-10 rounded-[8px] bg-[#0062FF] text-white flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base">Accredited Diplomas</h3>
                <p
                  className={`text-xs mt-1 leading-relaxed ${
                    isDarkMode ? 'text-[#94A3B8]' : 'text-[#475569]'
                  }`}
                >
                  Our certificates are officially recognized by the Ministry of Education and are
                  valid across the entire European Union.
                </p>
              </div>
            </div>

            <div
              className={`p-6 rounded-[8px] border flex items-start space-x-4 ${
                isDarkMode
                  ? 'bg-[#132338] border-[#1E2E44]'
                  : 'bg-white border-[#E2E8F0] shadow-sm'
              }`}
            >
              <div className="w-10 h-10 rounded-[8px] bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base">Institutional Authority</h3>
                <p
                  className={`text-xs mt-1 leading-relaxed ${
                    isDarkMode ? 'text-[#94A3B8]' : 'text-[#475569]'
                  }`}
                >
                  Standard occupational classifications and pedagogical methodologies aligned with EU labor market requirements.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
