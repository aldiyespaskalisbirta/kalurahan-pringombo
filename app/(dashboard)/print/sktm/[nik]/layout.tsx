import { Suspense } from "react";

import { getSktmOwner } from "@/actions/sktm/sktm-actions";
import LoadingPage from "@/components/loading";

import NoSuratRoutes from "./_components/no-surat-routes";

type Props = {
  params: { nik: string };
  children: React.ReactNode;
};

async function SuketUsahaOwnerLayout({ params, children }: Props) {
  const nik = decodeURIComponent(params.nik);

  const owner = await getSktmOwner(nik);
  if (!owner) return null;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <NoSuratRoutes data={owner} />
      </div>
      <div>
        <Suspense fallback={<LoadingPage />}>{children}</Suspense>
      </div>
    </div>
  );
}

export default SuketUsahaOwnerLayout;
