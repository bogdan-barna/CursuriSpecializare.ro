import React, { lazy, Suspense } from 'react';

import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import '../admincn/admincn-globals.css';

import { AdminThemeProvider } from '../admin/AdminThemeProvider';
import { usePlatformPathname } from '../platformRouter';

const LoginPage = lazy(() => import('@admincn/views/pages/auth/login/index'));
const PasswordLoginPage = lazy(() => import('@admincn/views/pages/auth/login/password/index'));
const RegisterPage = lazy(() => import('@admincn/views/pages/auth/register/index'));
const ForgotPasswordPage = lazy(() => import('@admincn/views/pages/auth/forgot-password/index'));

function AuthPage() {
  const pathname = usePlatformPathname();

  if (pathname === '/pages/auth/login/password') {
    return <PasswordLoginPage />;
  }
  if (pathname.startsWith('/pages/auth/register')) {
    return <RegisterPage />;
  }
  if (pathname.startsWith('/pages/auth/forgot-password')) {
    return <ForgotPasswordPage />;
  }
  return <LoginPage />;
}

export function AuthApp() {
  return (
    <AdminThemeProvider>
      <Suspense
        fallback={
          <div className="admincn-root flex min-h-screen items-center justify-center text-sm text-muted-foreground">
            Betöltés…
          </div>
        }
      >
        <AuthPage />
      </Suspense>
    </AdminThemeProvider>
  );
}
