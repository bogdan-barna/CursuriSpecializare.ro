import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from 'react';

type PlatformRouterContextValue = {
  pathname: string;
  navigate: (href: string) => void;
};

const PlatformRouterContext = createContext<PlatformRouterContextValue | null>(null);

function parsePathname(href: string): string {
  const [pathname] = href.split('?');
  return pathname || '/';
}

export function PlatformRouterProvider({ children }: { children: ReactNode }) {
  const [pathname, setPathname] = useState(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((href: string) => {
    const nextPath = parsePathname(href);
    if (nextPath === window.location.pathname) return;
    window.history.pushState({}, '', href.startsWith('/') ? href : `/${href}`);
    setPathname(window.location.pathname);
  }, []);

  const value = useMemo(() => ({ pathname, navigate }), [pathname, navigate]);

  return (
    <PlatformRouterContext.Provider value={value}>{children}</PlatformRouterContext.Provider>
  );
}

function usePlatformRouter() {
  const ctx = useContext(PlatformRouterContext);
  if (!ctx) {
    throw new Error('Platform router hooks must be used within PlatformRouterProvider');
  }
  return ctx;
}

export function usePlatformPathname(): string {
  return usePlatformRouter().pathname;
}

export function usePlatformNavigate(): (href: string) => void {
  return usePlatformRouter().navigate;
}

type PlatformLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export default function PlatformLink({ href, onClick, children, target, ...rest }: PlatformLinkProps) {
  const { navigate } = usePlatformRouter();
  const isExternal =
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('#') ||
    target === '_blank';

  if (isExternal) {
    return (
      <a href={href} target={target} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          event.preventDefault();
          navigate(href);
        }
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
