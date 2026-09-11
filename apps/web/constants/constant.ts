export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  CONTACT: "/contact",
  PRIVACY_POLICY: "/privacy-policy",
  TERMS: "/terms",
} as const;

export const PUBLIC_ROUTES: readonly string[] = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
];

export const SHARED_ROUTES: readonly string[] = [
  ROUTES.HOME,
  ROUTES.CONTACT,
  ROUTES.PRIVACY_POLICY,
  ROUTES.TERMS,
];

export const PROTECTED_ROUTE_PREFIXES: readonly string[] = [
  "/dashboard",
  "/tenders",
  "/company-profile",
  "/ai-analysis",
  "/compliance",
  "/checklist",
  "/comparison",
  "/proposals",
];

export const isPublicRoute = (pathname: string) =>
  PUBLIC_ROUTES.includes(pathname);

export const isSharedRoute = (pathname: string) =>
  SHARED_ROUTES.includes(pathname);

export const isProtectedRoute = (pathname: string) =>
  PROTECTED_ROUTE_PREFIXES.some((route) =>
    pathname.startsWith(route)
  );