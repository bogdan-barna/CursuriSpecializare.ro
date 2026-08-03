import React from 'react';
import { X, Download, ShieldCheck, FileCode, Package, Layers, ExternalLink } from 'lucide-react';

interface SdkModalProps {
  onClose: () => void;
  onDownload: (packageName: string) => void;
  isDarkMode: boolean;
}

export const SdkModal: React.FC<SdkModalProps> = ({
  onClose,
  onDownload,
  isDarkMode,
}) => {
  const packages = [
    {
      name: '@cursuri/design-tokens-v1.4',
      type: 'CSS / SCSS / Tailwind',
      size: '28 KB',
      command: 'npm i @cursuri-specializare/tokens',
    },
    {
      name: '@cursuri/react-components-academic',
      type: 'React 18 / TypeScript / UI',
      size: '185 KB',
      command: 'npm i @cursuri-specializare/ui',
    },
    {
      name: 'Figma Token Sync & JSON Kit',
      type: 'W3C Standard JSON Design Tokens',
      size: '42 KB',
      command: 'npx @cursuri/sync-figma',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div
        className={`w-full max-w-xl rounded-[8px] overflow-hidden border shadow-2xl ${
          isDarkMode
            ? 'bg-[#0F1D32] border-[#1E2E44] text-white'
            : 'bg-white border-[#E2E8F0] text-[#0B1C30]'
        }`}
      >
        <div className="p-6 bg-[#001D4A] text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-[8px] bg-[#0062FF] text-white flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Download Design System SDK</h3>
              <p className="text-xs text-[#CBD5E1]">v1.4.0-stable • Academic Blue Standard</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <p
            className={`text-sm ${
              isDarkMode ? 'text-[#CBD5E1]' : 'text-[#475569]'
            }`}
          >
            Pachetele noastre oficiale asigură conformitatea vizuală cu standardul{' '}
            <strong>Professional Academic Blue</strong> pentru portalurile universitare și
            centrele acreditate de formare.
          </p>

          <div className="space-y-3">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`p-4 rounded-[8px] border flex items-center justify-between transition-all ${
                  isDarkMode
                    ? 'bg-[#132338] border-[#1E2E44]'
                    : 'bg-[#F8F9FF] border-[#E2E8F0]'
                }`}
              >
                <div className="min-w-0 pr-4">
                  <div className="font-semibold text-sm truncate">{pkg.name}</div>
                  <div className="text-xs text-[#64748B] mt-0.5">{pkg.type}</div>
                  <div className="text-[11px] font-mono text-[#0062FF] mt-1.5 bg-[#EFF4FF] dark:bg-[#1E2E44] px-2 py-1 rounded inline-block">
                    {pkg.command}
                  </div>
                </div>

                <button
                  onClick={() => onDownload(pkg.name)}
                  className="px-3.5 py-2 bg-[#004CCA] hover:bg-[#0062FF] text-white text-xs font-semibold rounded-[8px] transition-colors flex items-center space-x-1 flex-shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>SDK ({pkg.size})</span>
                </button>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs text-[#64748B]">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Acreditat pentru aplicații guvernamentale și instituționale</span>
            </div>
            <button
              onClick={onClose}
              className={`px-5 py-2 rounded-[8px] border text-sm font-medium ${
                isDarkMode
                  ? 'border-[#485E8D] text-white hover:bg-[#1E2E44]'
                  : 'border-[#737687] text-[#475569] hover:bg-[#F8F9FF]'
              }`}
            >
              Închide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
