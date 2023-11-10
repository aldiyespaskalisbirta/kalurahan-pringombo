import { Suspense } from "react";

import { getSktmOwner } from "@/actions/sktm/sktm-actions";
import LoadingPage from "@/components/loading";

type Props = {
  children: React.ReactNode;
};

async function PengantarSkckOwnerLayout({ children }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <Suspense fallback={<LoadingPage />}>{children}</Suspense>
    </div>
  );
}

export default PengantarSkckOwnerLayout;
