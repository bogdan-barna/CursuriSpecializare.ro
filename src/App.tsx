import React, { useState } from 'react';
import { TopTab, SidebarSection, Course, ToastMessage } from './types';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { GuidelinesView } from './components/views/GuidelinesView';
import { ComponentsView } from './components/views/ComponentsView';
import { TokensView } from './components/views/TokensView';
import { AssetsView } from './components/views/AssetsView';
import { CatalogView } from './components/views/CatalogView';
import { CourseDetailsModal } from './components/modals/CourseDetailsModal';
import { SdkModal } from './components/modals/SdkModal';
import { ToastContainer } from './components/ui/ToastContainer';
import { downloadDesignResource } from './utils/downloadSdk';
import {
  ShieldCheck,
  BookOpen,
  Layers,
  Settings,
  X,
  ExternalLink,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TopTab>('guidelines');
  const [activeSidebarSection, setActiveSidebarSection] =
    useState<SidebarSection>('brand-identity');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showSdkModal, setShowSdkModal] = useState(false);
  const [showStorybookModal, setShowStorybookModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'blue' = 'blue') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSelectTab = (tab: TopTab) => {
    setActiveTab(tab);
    if (tab === 'guidelines') setActiveSidebarSection('brand-identity');
    else if (tab === 'components') setActiveSidebarSection('components');
    else if (tab === 'tokens') setActiveSidebarSection('colors');
    else if (tab === 'assets') setActiveSidebarSection('motion-imagery');
  };

  const handleSelectSidebarSection = (section: SidebarSection) => {
    setActiveSidebarSection(section);
    // Automatically map section to corresponding top tab for visual consistency
    if (section === 'brand-identity') setActiveTab('guidelines');
    else if (section === 'colors' || section === 'typography') setActiveTab('tokens');
    else if (section === 'buttons-ui' || section === 'components') setActiveTab('components');
    else if (section === 'motion-imagery') setActiveTab('assets');

    // Scroll smoothly to section anchor if on guidelines page
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnroll = (course: Course, name: string, email: string) => {
    addToast(
      'Înscriere înregistrată!',
      `Rezervarea pentru cursul "${course.title}" a fost trimisă pentru ${name} (${email}).`,
      'success'
    );
  };

  const handleDownloadSdk = (packageName: string) => {
    const { filename } = downloadDesignResource(packageName);
    addToast(
      'Fișier descărcat cu succes!',
      `Pachetul ${packageName} (${filename}) a fost descărcat pe computerul dvs.`,
      'success'
    );
    setShowSdkModal(false);
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        isDarkMode ? 'bg-[#0B1C30] text-white dark' : 'bg-[#F8F9FF] text-[#0B1C30]'
      }`}
    >
      {/* Sticky top Navigation Header exactly matching screen 1 */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        isDarkMode={isDarkMode}
        onToggleTheme={() => {
          setIsDarkMode(!isDarkMode);
          addToast(
            'Temă schimbată',
            !isDarkMode ? 'Ați activat modul Întunecat (Dark Navy).' : 'Ați activat modul Luminos (Light Professional).'
          );
        }}
        onOpenSdkModal={() => setShowSdkModal(true)}
      />

      {/* Main Container Layout with Sidebar + Content */}
      <div className="flex-1 max-w-[1500px] w-full mx-auto flex flex-col lg:flex-row">
        {/* Left Sidebar */}
        <Sidebar
          activeSection={activeSidebarSection}
          onSelectSection={handleSelectSidebarSection}
          onOpenStorybook={() => {
            setShowStorybookModal(true);
            addToast('Storybook Preview', 'Mediu interactiv de testare componente UI v1.4.0');
          }}
          onOpenSettings={() => {
            setShowSettingsModal(true);
            addToast('Settings & Token Configuration', 'Administrare variabile CSS și parametri export');
          }}
          onOpenDocumentation={() => {
            setShowDocModal(true);
            addToast('Ghid Instituțional', 'Documentație oficială pentru acreditare și standard COR');
          }}
          isDarkMode={isDarkMode}
        />

        {/* Right Main Content Area */}
        <main
          className={`flex-1 min-w-0 p-6 sm:p-10 lg:p-12 overflow-x-hidden ${
            isDarkMode ? 'bg-[#0F1D32]/40' : 'bg-[#F8F9FF]'
          }`}
        >
          {activeTab === 'guidelines' && (
            <GuidelinesView
              onSelectCourse={(c) => setSelectedCourse(c)}
              onShowToast={addToast}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === 'components' && (
            <ComponentsView
              onSelectCourse={(c) => setSelectedCourse(c)}
              onShowToast={addToast}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === 'tokens' && (
            <TokensView onShowToast={addToast} isDarkMode={isDarkMode} />
          )}

          {activeTab === 'assets' && (
            <AssetsView onShowToast={addToast} isDarkMode={isDarkMode} />
          )}

          {activeTab === 'catalog' && (
            <CatalogView
              onSelectCourse={(c) => setSelectedCourse(c)}
              onShowToast={addToast}
              isDarkMode={isDarkMode}
            />
          )}
        </main>
      </div>

      {/* Course Details & Enrollment Modal */}
      <CourseDetailsModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onEnroll={handleEnroll}
        isDarkMode={isDarkMode}
      />

      {/* Download SDK Modal */}
      {showSdkModal && (
        <SdkModal
          onClose={() => setShowSdkModal(false)}
          onDownload={handleDownloadSdk}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Storybook Live Modal */}
      {showStorybookModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            className={`w-full max-w-2xl rounded-[8px] overflow-hidden border shadow-2xl p-6 ${
              isDarkMode
                ? 'bg-[#0F1D32] border-[#1E2E44] text-white'
                : 'bg-white border-[#E2E8F0] text-[#0B1C30]'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-[8px] bg-[#004CCA] text-white flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Storybook Component Playground</h3>
                  <p className="text-xs text-[#64748B]">Professional Academic Blue v1.4.0-stable</p>
                </div>
              </div>
              <button
                onClick={() => setShowStorybookModal(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <p>
                Storybook integrat în CursuriSpecializare oferă previzualizare în timp real pentru
                toate stările butonului (Primary, Outline, Text Link), câmpurile de input și
                cardurile de diplomă acreditată.
              </p>
              <div
                className={`p-4 rounded-[8px] border text-xs font-mono space-y-1 ${
                  isDarkMode ? 'bg-[#132338] border-[#1E2E44]' : 'bg-[#EFF4FF] border-[#DCE9FF]'
                }`}
              >
                <div className="text-[#0062FF] font-bold"># Rulați pe mediul local:</div>
                <div>npm run storybook</div>
                <div># Port implicit: http://localhost:6006</div>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setShowStorybookModal(false)}
                  className="px-5 py-2 bg-[#004CCA] hover:bg-[#0062FF] text-white text-sm font-semibold rounded-[8px]"
                >
                  Închide Storybook
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            className={`w-full max-w-lg rounded-[8px] overflow-hidden border shadow-2xl p-6 ${
              isDarkMode
                ? 'bg-[#0F1D32] border-[#1E2E44] text-white'
                : 'bg-white border-[#E2E8F0] text-[#0B1C30]'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-[#0062FF]" />
                <h3 className="font-bold text-lg">Settings & Design Parameters</h3>
              </div>
              <button onClick={() => setShowSettingsModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between p-3 rounded-[8px] border border-gray-200 dark:border-gray-800">
                <div>
                  <div className="font-semibold">Grid 12-Column Alignment</div>
                  <div className="text-xs text-[#64748B]">Activează liniile de ghidaj desktop</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600 text-xs font-bold">
                  Activ (1200px)
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-[8px] border border-gray-200 dark:border-gray-800">
                <div>
                  <div className="font-semibold">Contrast WCAG AA Guarantee</div>
                  <div className="text-xs text-[#64748B]">Verificare lizibilitate font Inter</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600 text-xs font-bold">
                  Conform (7.2:1)
                </span>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="px-5 py-2 bg-[#004CCA] hover:bg-[#0062FF] text-white text-sm font-semibold rounded-[8px]"
                >
                  Salvează
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Documentation Modal */}
      {showDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            className={`w-full max-w-xl rounded-[8px] overflow-hidden border shadow-2xl p-6 ${
              isDarkMode
                ? 'bg-[#0F1D32] border-[#1E2E44] text-white'
                : 'bg-white border-[#E2E8F0] text-[#0B1C30]'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-[#0062FF]" />
                <h3 className="font-bold text-lg">Documentație COR & Ministerul Educației</h3>
              </div>
              <button onClick={() => setShowDocModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4 text-sm leading-relaxed">
              <p>
                Platforma <strong>CursuriSpecializare</strong> furnizează cursuri acreditate care se
                finalizează cu diplome eliberate sub egida <strong>Ministerului Educației</strong> și a{' '}
                <strong>Ministerului Muncii și Solidarității Sociale</strong>.
              </p>
              <div className="p-3.5 rounded-[8px] bg-[#EFF4FF] dark:bg-[#132338] border border-[#DCE9FF] dark:border-[#1E2E44] text-xs space-y-1">
                <div className="font-bold text-[#004CCA] dark:text-[#60A5FA]">
                  Recunoaștere în Uniunea Europeană (Apostila de la Haga)
                </div>
                <p className="text-[#475569] dark:text-[#CBD5E1]">
                  Toate certificatele pot fi apostilate și sunt valabile nelimitat în cele 27 de
                  state membre ale Uniunii Europene.
                </p>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setShowDocModal(false)}
                  className="px-5 py-2 bg-[#004CCA] hover:bg-[#0062FF] text-white text-sm font-semibold rounded-[8px]"
                >
                  Am înțeles
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast notification stack */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
