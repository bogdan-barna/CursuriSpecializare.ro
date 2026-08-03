import React, { useState } from 'react';
import { Course } from '../../types';
import { FEATURED_COURSES } from '../../data/designSystemData';
import {
  Search,
  Filter,
  CheckCircle2,
  Award,
  Clock,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Calendar,
} from 'lucide-react';

interface CatalogViewProps {
  onSelectCourse: (course: Course) => void;
  onShowToast: (title: string, message: string) => void;
  isDarkMode: boolean;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  onSelectCourse,
  onShowToast,
  isDarkMode,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'HR', 'Management', 'IT', 'Contabilitate'];

  const filteredCourses = FEATURED_COURSES.filter((course) => {
    const matchesCategory =
      selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-16">
      {/* Banner introduction */}
      <div
        className={`p-8 rounded-[8px] border relative overflow-hidden ${
          isDarkMode
            ? 'bg-[#132338] border-[#1E2E44]'
            : 'bg-gradient-to-r from-[#EFF4FF] to-[#E5EEFF] border-[#DCE9FF]'
        }`}
      >
        <div className="max-w-3xl space-y-3">
          <span className="px-3 py-1 bg-[#004CCA] text-white text-xs font-bold rounded-full uppercase tracking-wider">
            Ministerul Educației • Uniunea Europeană
          </span>
          <h1
            className={`text-2xl sm:text-4xl font-bold tracking-tight ${
              isDarkMode ? 'text-white' : 'text-[#0B1C30]'
            }`}
          >
            Catalog Programe de Specializare
          </h1>
          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isDarkMode ? 'text-[#CBD5E1]' : 'text-[#475569]'
            }`}
          >
            Alegeți dintre programele noastre acreditate cu recunoaștere în România și în
            toate statele membre ale Uniunii Europene. Fiecare program este structurat
            conform standardelor COR și metodologiei moderne de formare.
          </p>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-[8px] text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#004CCA] text-white shadow-sm'
                  : isDarkMode
                  ? 'bg-[#132338] text-[#A0AEC0] hover:text-white border border-[#1E2E44]'
                  : 'bg-white text-[#485E8D] hover:bg-[#EFF4FF] border border-[#E2E8F0]'
              }`}
            >
              {cat === 'All' ? 'Toate Domeniile' : cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search
            className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
              isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
            }`}
          />
          <input
            type="text"
            placeholder="Caută curs sau ocupație COR..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-[8px] border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#0062FF] ${
              isDarkMode
                ? 'bg-[#132338] border-[#2A3E5C] text-white placeholder-[#64748B]'
                : 'bg-white border-[#C2C6D9] text-[#0B1C30] placeholder-[#64748B]'
            }`}
          />
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            onClick={() => onSelectCourse(course)}
            className={`group rounded-[8px] overflow-hidden border cursor-pointer transition-all hover:shadow-lg flex flex-col justify-between ${
              isDarkMode
                ? 'bg-[#132338] border-[#1E2E44] hover:border-[#0062FF]'
                : 'bg-white border-[#E2E8F0] shadow-sm hover:border-[#0062FF]'
            }`}
          >
            <div>
              {/* Image Banner */}
              <div className="relative h-48 w-full overflow-hidden bg-[#E5EEFF]">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-[#0062FF] text-white text-xs font-semibold rounded-full shadow-sm">
                    {course.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 bg-black/70 text-white text-[11px] font-medium rounded-md backdrop-blur-sm">
                    {course.durationHours} ore
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-center space-x-2 text-xs text-[#64748B]">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>{course.accreditedBy}</span>
                </div>

                <h3 className="font-bold text-lg group-hover:text-[#0062FF] transition-colors line-clamp-1">
                  {course.title}
                </h3>

                <p
                  className={`text-xs leading-relaxed line-clamp-3 ${
                    isDarkMode ? 'text-[#94A3B8]' : 'text-[#475569]'
                  }`}
                >
                  {course.description}
                </p>
              </div>
            </div>

            {/* Price and Details footer */}
            <div className="p-5 pt-0">
              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#64748B] uppercase font-semibold">
                    Taxă curs
                  </div>
                  <span
                    className={`font-bold text-base ${
                      isDarkMode ? 'text-[#60A5FA]' : 'text-[#004CCA]'
                    }`}
                  >
                    {course.priceLei.toLocaleString('ro-RO')} lei
                  </span>
                </div>

                <span className="inline-flex items-center space-x-1 text-sm font-semibold text-[#0062FF] group-hover:translate-x-1 transition-transform">
                  <span>Details</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-16 border rounded-[8px] bg-white dark:bg-[#132338] border-gray-200 dark:border-gray-800">
          <BookOpen className="w-12 h-12 text-[#64748B] mx-auto mb-3" />
          <h3 className="text-lg font-bold">Niciun curs găsit</h3>
          <p className="text-sm text-[#64748B] mt-1">
            Nu am găsit cursuri care să corespundă criteriilor alese. Încearcă o altă categorie
            sau un alt cuvânt cheie.
          </p>
        </div>
      )}
    </div>
  );
};
