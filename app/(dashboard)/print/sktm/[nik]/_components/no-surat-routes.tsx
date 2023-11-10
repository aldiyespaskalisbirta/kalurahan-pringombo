"use client";

import { SKTM } from "@prisma/client";

import ListNoSurat from "./list-no-surat";
import { usePathname } from "next/navigation";

type Props = {
  data?: SKTM[];
};

function NoSuratRoutes({ data }: Props) {
  const pathname = usePathname();
  const editPage = pathname?.includes("/edit");
  return (
    <>
      {!editPage && (
        <nav className="flex flex-wrap items-center justify-start space-x-2 shadow-md py-2">
          {data?.map((item) => (
            <ListNoSurat
              key={item.no_surat}
              nik={item.nik_ortu}
              no_surat={item.no_surat}
            />
          ))}
        </nav>
      )}
    </>
  );
}

export default NoSuratRoutes;
