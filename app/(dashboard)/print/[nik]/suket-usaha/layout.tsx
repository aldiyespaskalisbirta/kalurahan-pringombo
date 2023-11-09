import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { getAllSuketUsaha } from "@/actions/suket-usaha/suket-usaha-actions";

import Actions from "./_components/actions";
import ListsNoSurat from "./_components/lists-no-surat";
import LoadingPage from "@/components/loading";

type Props = {
  params: {
    nik: string;
  };
  children: React.ReactNode;
};

async function SuketUsahaLayout({ params, children }: Props) {
  const session = await getServerSession();
  if (!session) {
    return redirect("/denied");
  }
  const nik = decodeURIComponent(params.nik);
  const data = await getAllSuketUsaha(nik);
  if (!data) {
    return null;
  }
  return (
    <div className="px-1 md:px-6">
      <div className="w-full p-2">
        <Actions nik={nik} />
      </div>
      <div className="overflow-x-auto scrollbar-hide">
        <ListsNoSurat nik={nik} items={data} />
      </div>
      <div className="py-2 md:py-6">
        <Suspense fallback={<LoadingPage />}>{children}</Suspense>
      </div>
    </div>
  );
}

export default SuketUsahaLayout;
