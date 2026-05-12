import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);
const ALLOWED_EXTERNAL_REDIRECT_HOSTS = new Set([
  'appraislyai.com',
  'www.appraislyai.com',
  'imagelablr.com',
  'www.imagelablr.com',
  'restorecam.com',
  'www.restorecam.com',
]);

function parseRedirectUrl(value: string): URL | null {
  const candidates = [value];
  try {
    const decoded = decodeURIComponent(value);
    if (decoded !== value) candidates.unshift(decoded);
  } catch {}

  for (const candidate of candidates) {
    try {
      return new URL(candidate);
    } catch {}
  }

  return null;
}

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl.clone();
  const authState = await auth();

  if (url.pathname === '/sign-in') {
    const rawRedirect = url.searchParams.get('redirect_url');
    let normalizedRedirect: string | null = null;

    if (rawRedirect) {
      const parsed = parseRedirectUrl(rawRedirect);

      if (parsed) {
        const host = parsed.hostname.toLowerCase();

        if (host === 'lossstack.com' || host === 'www.lossstack.com') {
          if (!parsed.pathname.startsWith('/sign-in')) {
            parsed.protocol = 'https:';
            normalizedRedirect = parsed.toString();
          }
        } else if (ALLOWED_EXTERNAL_REDIRECT_HOSTS.has(host)) {
          parsed.protocol = 'https:';
          normalizedRedirect = parsed.toString();
        }
      }

      if (authState.userId) {
        if (normalizedRedirect) {
          return NextResponse.redirect(normalizedRedirect);
        }
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }

      if (normalizedRedirect !== rawRedirect) {
        if (normalizedRedirect) {
          url.searchParams.set('redirect_url', normalizedRedirect);
        } else {
          url.searchParams.delete('redirect_url');
        }

        return NextResponse.redirect(url);
      }
    } else if (authState.userId) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
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
