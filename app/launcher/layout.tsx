import { ClerkProvider } from "@clerk/nextjs";

export default function LauncherLayout({ children }: { children: React.ReactNode }) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
