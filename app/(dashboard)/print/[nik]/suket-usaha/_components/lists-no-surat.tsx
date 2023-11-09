"use client";
import { SuketUsaha } from "@prisma/client";
import ListNoSurat from "./list-no-surat";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  nik: string;
  items?: SuketUsaha[];
};
function ListsNoSurat({ nik, items }: Props) {
  const pathname = usePathname();
  const editPage = pathname?.includes("/edit");

  return (
    <>
      {!editPage && (
        <div className="flex items-center justify-start space-x-2 shadow-md py-2">
          {items?.map((item) => (
            <ListNoSurat
              key={item.no_surat}
              nik={nik}
              no_surat={item.no_surat}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default ListsNoSurat;
