import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type AnchorHTMLAttributes,
  type ReactNode,
} from 'react';

type AdminRouterContextValue = {
  pathname: string;
  searchParams: URLSearchParams;
  navigate: (href: string) => void;
};

const AdminRouterContext = createContext<AdminRouterContextValue | null>(null);

function parseHref(href: string): { pathname: string; search: string } {
  const [pathname, search = ''] = href.split('?');
  return { pathname, search: search ? `?${search}` : '' };
}

export function AdminRouterProvider({
  pathname,
  searchParams,
  onNavigate,
  children,
}: {
  pathname: string;
  searchParams: URLSearchParams;
  onNavigate: (pathname: string, searchParams: URLSearchParams) => void;
  children: ReactNode;
}) {
  const navigate = useCallback(
    (href: string) => {
      if (href === '#design-system') {
        window.dispatchEvent(new CustomEvent('admin-exit'));
        return;
      }
      if (href.startsWith('http://') || href.startsWith('https://')) {
        window.location.href = href;
        return;
      }
      const { pathname: nextPath, search } = parseHref(href);
      onNavigate(nextPath, new URLSearchParams(search.replace(/^\?/, '')));
    },
    [onNavigate]
  );

  const value = useMemo(
    () => ({ pathname, searchParams, navigate }),
    [pathname, searchParams, navigate]
  );

  return <AdminRouterContext.Provider value={value}>{children}</AdminRouterContext.Provider>;
}

function useAdminRouter() {
  const ctx = useContext(AdminRouterContext);
  if (!ctx) {
    throw new Error('Admin router hooks must be used within AdminRouterProvider');
  }
  return ctx;
}

export function usePathname(): string {
  return useAdminRouter().pathname;
}

export function useSearchParams(): URLSearchParams {
  return useAdminRouter().searchParams;
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export default function Link({ href, onClick, target, children, ...rest }: LinkProps) {
  const { navigate } = useAdminRouter();
  const isExternal =
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    target === '_blank';

  if (href === '#design-system') {
    return (
      <a
        href={href}
        onClick={(event) => {
          onClick?.(event);
          event.preventDefault();
          window.dispatchEvent(new CustomEvent('admin-exit'));
        }}
        {...rest}
      >
        {children}
      </a>
    );
  }

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
