import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import { AuthApp } from './auth/AuthApp.tsx';
import { PlatformRouterProvider, usePlatformPathname } from './platformRouter.tsx';
import './index.css';

function Root() {
  const pathname = usePlatformPathname();

  if (pathname.startsWith('/pages/auth')) {
    return <AuthApp />;
  }

  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PlatformRouterProvider>
      <Root />
    </PlatformRouterProvider>
  </StrictMode>
);
