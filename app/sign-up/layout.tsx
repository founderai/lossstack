import { ClerkProvider } from "@clerk/nextjs";

const allowedOrigins = [
  "https://appraislyai.com",
  "https://www.appraislyai.com",
  "https://imagelablr.com",
  "https://www.imagelablr.com",
  "https://restorecam.com",
  "https://www.restorecam.com",
];

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider allowedRedirectOrigins={allowedOrigins}>
      {children}
    </ClerkProvider>
  );
}
