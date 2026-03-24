import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function LauncherPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>LossStack Launcher</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <a href="https://appraislyai.com" target="_blank">
          Open Appraisly
        </a>

        <a href="https://imagelablr.com" target="_blank">
          Open ImageLablr
        </a>

        <a href="https://restorecam.com" target="_blank">
          Open RestoreCam
        </a>
      </div>
    </main>
  );
}
