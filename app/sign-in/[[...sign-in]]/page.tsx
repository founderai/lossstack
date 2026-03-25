"use client";

import { SignIn, useAuth } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function SignInInner() {
  const { isSignedIn, isLoaded } = useAuth();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url");

  useEffect(() => {
    if (isLoaded && isSignedIn && redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, [isLoaded, isSignedIn, redirectUrl]);

  if (!isLoaded) return null;
  if (isSignedIn && redirectUrl) return null;

  return <SignIn />;
}

export default function Page() {
  return (
    <Suspense>
      <SignInInner />
    </Suspense>
  );
}
