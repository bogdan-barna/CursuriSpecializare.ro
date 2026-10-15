import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';

import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import '../admincn/admincn-globals.css';

import Footer from '@admincn/components/layout/Footer';
import Header from '@admincn/components/layout/Header';
import Sidebar from '@admincn/components/layout/Sidebar';
import Providers from '@admincn/components/Providers';
import { SidebarInset } from '@admincn/components/ui/sidebar';
import { Toaster } from '@admincn/components/ui/sonner';

import type { EnrollmentRecord, EnrollmentStatus } from '../types';

import { AdminRouterProvider } from './router';
import { AdminThemeProvider } from './AdminThemeProvider';
import { DashboardPage } from './pages/DashboardPage';
import { InscrieriPage } from './pages/InscrieriPage';
import { CatalogAdminPage } from './pages/CatalogAdminPage';

export type AdminAppProps = {
  enrollments: EnrollmentRecord[];
  onUpdateEnrollmentStatus: (id: string, status: EnrollmentStatus) => void;
  onExit: () => void;
  initialPath?: string;
};

export function AdminApp({
  enrollments,
  onUpdateEnrollmentStatus,
  onExit,
  initialPath = '/admin/dashboard',
}: AdminAppProps) {
  const [pathname, setPathname] = useState(initialPath);
  const [searchParams, setSearchParams] = useState(() => new URLSearchParams());

  const onNavigate = useCallback((nextPath: string, nextSearch: URLSearchParams) => {
    setPathname(nextPath);
    setSearchParams(nextSearch);
  }, []);

  useEffect(() => {
    const handler = () => onExit();
    window.addEventListener('admin-exit', handler);
    return () => window.removeEventListener('admin-exit', handler);
  }, [onExit]);

  const page = useMemo(() => {
    if (pathname.startsWith('/admin/inscrieri')) {
      return (
        <InscrieriPage
          enrollments={enrollments}
          onUpdateStatus={onUpdateEnrollmentStatus}
        />
      );
    }
    if (pathname.startsWith('/admin/catalog')) {
      return <CatalogAdminPage />;
    }
    return <DashboardPage enrollments={enrollments} />;
  }, [pathname, enrollments, onUpdateEnrollmentStatus]);

  return (
    <AdminThemeProvider>
      <AdminRouterProvider pathname={pathname} searchParams={searchParams} onNavigate={onNavigate}>
        <Providers sidebarDefaultOpen>
          <div className="flex h-full min-h-screen w-full min-w-0">
            <Suspense fallback={null}>
              <Sidebar />
            </Suspense>
            <SidebarInset className="flex flex-1 flex-col">
              <Header />
              <main className="mx-auto size-full max-w-360 flex-1 px-4 py-6 sm:px-6">{page}</main>
              <Toaster />
              <Footer />
            </SidebarInset>
          </div>
        </Providers>
      </AdminRouterProvider>
    </AdminThemeProvider>
  );
}
