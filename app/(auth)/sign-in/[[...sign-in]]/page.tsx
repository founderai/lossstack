import { SignIn } from "@clerk/nextjs";

interface PageProps {
  searchParams: Promise<{ redirect_url?: string }>;
}

const ALLOWED_REDIRECT_HOSTS = new Set([
  "appraislyai.com",
  "www.appraislyai.com",
  "imagelablr.com",
  "www.imagelablr.com",
  "restorecam.com",
  "www.restorecam.com",
]);

function normalizeRedirectUrl(raw?: string): string | undefined {
  if (!raw) return undefined;

  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    decoded = raw;
  }

  let parsed: URL;
  try {
    parsed = new URL(decoded);
  } catch {
    return undefined;
  }

  if (parsed.protocol !== "https:") return undefined;
  if (!ALLOWED_REDIRECT_HOSTS.has(parsed.hostname)) return undefined;

  parsed.pathname = parsed.pathname.replace(/\/{2,}/g, "/") || "/";

  return parsed.toString();
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const safeRedirect = normalizeRedirectUrl(params.redirect_url);

  return (
    <SignIn
      signUpUrl="/sign-up"
      fallbackRedirectUrl="/dashboard"
      forceRedirectUrl={safeRedirect}
    />
  );
}
