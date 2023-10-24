import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('loggedIn')?.value === 'true';

  // checks if user can access a login page
  // it's restricted when user is logged in
  if (request.nextUrl.pathname.endsWith('/login') && isLoggedIn) {
    const url = request.nextUrl.clone();
    url.pathname = '/';

    return NextResponse.redirect(url);
  }

  // checks if user can access a home page
  // it's private and is for authenticated users only
  if (request.nextUrl.pathname.endsWith('/') && !isLoggedIn) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';

    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();
  response.cookies.set('loggedIn', String(isLoggedIn));

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
