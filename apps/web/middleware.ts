import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/contact",
  "/privacy-policy",
];

export function middleware(request: NextRequest) {
  console.log("Middleware:", request.nextUrl.pathname);
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("accessToken")?.value;

  const isPublic = PUBLIC_ROUTES.some((route) =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // User is not logged in
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // User already logged in
  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};