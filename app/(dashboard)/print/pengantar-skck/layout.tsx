import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";


import Actions from "./_components/actions";
import LoadingPage from "@/components/loading";

type Props = {
  children: React.ReactNode;
};

async function PengantarSkckLayout({ children }: Props) {
  const session = await getServerSession();
  if (!session) {
    return redirect("/denied");
  }

  return (
    <div className="px-1 md:px-6">
      <div className="w-full p-2">
        <Actions />
      </div>
      <div className="py-2 md:py-6 h-screen">
        <Suspense fallback={<LoadingPage />}>{children}</Suspense>
      </div>
    </div>
  );
}

export default PengantarSkckLayout;
