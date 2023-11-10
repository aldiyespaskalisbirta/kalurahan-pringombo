"use client";

import { Suspense } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

import LoadingPage from "@/components/loading";

function PrintLayout({ children }: { children: React.ReactNode }) {
  const session = useSession();
  if (session.status === "unauthenticated") return redirect("/denied");
  return (
    <div className="h-full">
      <Suspense fallback={<LoadingPage />}>{children}</Suspense>
    </div>
  );
}

export default PrintLayout;
