import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);
const isAuthRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

const allowedSatelliteOrigins = new Set([
  'https://appraislyai.com',
  'https://www.appraislyai.com',
  'https://imagelablr.com',
  'https://www.imagelablr.com',
  'https://restorecam.com',
  'https://www.restorecam.com',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  const redirectUrl = req.nextUrl.searchParams.get('redirect_url');
  let isAllowedSatelliteRedirect = false;

  if (redirectUrl) {
    try {
      const parsed = new URL(redirectUrl);
      isAllowedSatelliteRedirect = allowedSatelliteOrigins.has(parsed.origin);
    } catch {
      isAllowedSatelliteRedirect = false;
    }
  }

  // Already signed in — break local auth-route loops, but preserve valid satellite redirects
  if (userId && isAuthRoute(req)) {
    if (isAllowedSatelliteRedirect) {
      return NextResponse.redirect(redirectUrl!);
    }
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
