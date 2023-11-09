"use client";

import { Suspense } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingPage from "@/components/loading";

function PendudukIdLayout({ children }: { children: React.ReactNode }) {
  // TODO: UNCOMMENT WHEN PRODUCTION
  const session = useSession();
  if (session.status === "unauthenticated") return redirect("/denied");
  return (
    <div className="h-screen">
      <Suspense fallback={<LoadingPage />}>{children}</Suspense>
    </div>
  );
}

export default PendudukIdLayout;
