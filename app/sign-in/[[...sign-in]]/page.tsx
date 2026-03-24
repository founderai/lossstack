import { SignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ redirect_url?: string }>;
}) {
  const { redirect_url } = await searchParams;
  const user = await currentUser();

  if (user && redirect_url) {
    redirect(redirect_url);
  }

  return <SignIn forceRedirectUrl={redirect_url} />;
}
