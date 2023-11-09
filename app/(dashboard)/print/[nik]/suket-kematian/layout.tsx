import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import Actions from "./_components/actions";
import ListNoSurat from "./_components/list-no-surat";
import LoadingPage from "@/components/loading";
import { getSuketKematian } from "@/actions/suket-kematian/suket-kematian-actions";

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
  const data = await getSuketKematian(nik);

  return (
    <div className="px-1 md:px-6">
      <div className="w-full p-2">
        <Actions nik={nik} no_surat={data?.no_surat} />
      </div>
      <div className="overflow-x-auto scrollbar-hide">
        {data?.no_surat && <ListNoSurat nik={nik} no_surat={data?.no_surat} />}
      </div>
      <div className="py-2 md:py-6">
        <Suspense fallback={<LoadingPage />}>{children}</Suspense>
      </div>
    </div>
  );
}

export default SuketUsahaLayout;
