import { SignIn } from "@clerk/nextjs";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ redirect_url?: string }>;
}) {
  const { redirect_url } = await searchParams;
  return <SignIn forceRedirectUrl={redirect_url} />;
}
