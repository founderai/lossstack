import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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
  const { userId } = await auth();
  const params = await searchParams;
  const safeRedirect = normalizeRedirectUrl(params.redirect_url);

  if (userId) {
    redirect(safeRedirect ?? "/dashboard");
  }

  return (
    <SignIn
      signUpUrl="/sign-up"
      fallbackRedirectUrl="/dashboard"
      forceRedirectUrl={safeRedirect}
    />
  );
}
