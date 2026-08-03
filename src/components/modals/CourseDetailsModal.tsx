import React, { useState } from 'react';
import { Course } from '../../types';
import {
  X,
  Award,
  Clock,
  Calendar,
  CheckCircle2,
  BookOpen,
  UserCheck,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface CourseDetailsModalProps {
  course: Course | null;
  onClose: () => void;
  onEnroll: (course: Course, studentName: string, studentEmail: string) => void;
  isDarkMode: boolean;
}

export const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({
  course,
  onClose,
  onEnroll,
  isDarkMode,
}) => {
  const [studentName, setStudentName] = useState('John Doe');
  const [studentEmail, setStudentEmail] = useState('barna.bogdan@startup-hub.ro');
  const [step, setStep] = useState<'details' | 'form' | 'success'>('details');

  if (!course) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEnroll(course, studentName, studentEmail);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div
        className={`w-full max-w-3xl rounded-[8px] overflow-hidden border shadow-2xl transition-all ${
          isDarkMode
            ? 'bg-[#0F1D32] border-[#1E2E44] text-white'
            : 'bg-white border-[#E2E8F0] text-[#0B1C30]'
        }`}
      >
        {/* Modal Header banner */}
        <div className="relative h-48 w-full bg-[#001D4A]">
          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C30] via-[#0B1C30]/50 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title and Badge overlay */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-[#0062FF] text-white text-xs font-semibold rounded-full shadow-sm">
                Specializare • {course.category}
              </span>
              <span className="px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                {course.durationHours} ore de formare
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {course.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {step === 'details' && (
            <div className="space-y-6">
              {/* Accreditation & Stats */}
              <div
                className={`grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-[8px] border ${
                  isDarkMode
                    ? 'bg-[#132338] border-[#1E2E44]'
                    : 'bg-[#EFF4FF] border-[#DCE9FF]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-[#0062FF] flex-shrink-0" />
                  <div>
                    <div className="text-xs text-[#64748B]">Acreditare oficială</div>
                    <div className="text-sm font-semibold">{course.accreditedBy}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-[#0062FF] flex-shrink-0" />
                  <div>
                    <div className="text-xs text-[#64748B]">Data începerii</div>
                    <div className="text-sm font-semibold">{course.nextDate}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-[#64748B]">Certificat Recunoscut</div>
                    <div className="text-sm font-semibold">RO & Uniunea Europeană</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#64748B] mb-2">
                  Descrierea Programului
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    isDarkMode ? 'text-[#CBD5E1]' : 'text-[#475569]'
                  }`}
                >
                  {course.description}
                </p>
              </div>

              {/* Curriculum */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#64748B] mb-3">
                  Tematica Cursului
                </h3>
                <div className="space-y-2.5">
                  {course.syllabus.map((mod, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start space-x-3 p-3 rounded-[8px] border ${
                        isDarkMode
                          ? 'bg-[#132338] border-[#1E2E44]'
                          : 'bg-[#F8F9FF] border-[#E2E8F0]'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0062FF] mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-medium">{mod}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Actions */}
              <div className="pt-4 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="text-xs text-[#64748B]">Taxă integrală program de specializare</div>
                  <div className="text-2xl font-bold text-[#004CCA] dark:text-[#60A5FA]">
                    {course.priceLei.toLocaleString('ro-RO')} lei
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={onClose}
                    className={`px-4 py-2.5 rounded-[8px] border text-sm font-medium transition-colors ${
                      isDarkMode
                        ? 'border-[#485E8D] text-white hover:bg-[#1E2E44]'
                        : 'border-[#737687] text-[#475569] hover:bg-[#F8F9FF]'
                    }`}
                  >
                    Închide
                  </button>
                  <button
                    onClick={() => setStep('form')}
                    className="inline-flex items-center space-x-2 px-6 py-2.5 bg-[#004CCA] hover:bg-[#0062FF] text-white font-semibold text-sm rounded-[8px] shadow-sm transition-all"
                  >
                    <span>Înscriere la Curs</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="border-b pb-4">
                <h3 className="text-lg font-bold">Formular Înscriere Curs</h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Completați datele pentru rezervarea locului la: <strong>{course.title}</strong>
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Nume Complet (pe diplomă)</label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-[8px] border text-sm focus:ring-2 focus:ring-[#0062FF] focus:outline-none ${
                    isDarkMode
                      ? 'bg-[#132338] border-[#2A3E5C] text-white'
                      : 'bg-white border-[#C2C6D9] text-[#0B1C30]'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">E-mail Contact</label>
                <input
                  type="email"
                  required
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-[8px] border text-sm focus:ring-2 focus:ring-[#0062FF] focus:outline-none ${
                    isDarkMode
                      ? 'bg-[#132338] border-[#2A3E5C] text-white'
                      : 'bg-white border-[#C2C6D9] text-[#0B1C30]'
                  }`}
                />
              </div>

              <div className="p-3.5 rounded-[8px] bg-[#EFF4FF] dark:bg-[#132338] border border-[#DCE9FF] dark:border-[#1E2E44] text-xs">
                <p className="font-semibold text-[#004CCA] dark:text-[#60A5FA]">
                  ✓ Garanția recunoașterii Ministerului Educației
                </p>
                <p className="mt-1 text-[#475569] dark:text-[#CBD5E1]">
                  După trimiterea formularului, secretariatul universitar vă va contacta în 24h
                  pentru semnarea contractului de studii și facturare.
                </p>
              </div>

              <div className="pt-4 border-t flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-4 py-2 rounded-[8px] border text-sm font-medium"
                >
                  Înapoi
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#004CCA] hover:bg-[#0062FF] text-white font-semibold text-sm rounded-[8px] shadow-sm"
                >
                  Confirmă Înscrierea
                </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold">Înscriere Trimisă cu Succes!</h3>
              <p className="text-sm text-[#64748B] max-w-md mx-auto">
                Vă mulțumim, <strong>{studentName}</strong>! Am înregistrat solicitarea de înscriere
                pentru <strong>{course.title}</strong>. Veți primi instrucțiunile de participare
                la adresa <strong>{studentEmail}</strong>.
              </p>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#004CCA] hover:bg-[#0062FF] text-white font-semibold text-sm rounded-[8px] shadow-sm"
                >
                  Înapoi la Design System
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
