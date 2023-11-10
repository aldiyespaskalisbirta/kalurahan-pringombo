import { getAllSuketUsaha } from "@/actions/suket-usaha/suket-usaha-actions";
import React from "react";
import ListNoSurat from "./_components/list-no-surat";

async function SuketUsahaPage() {
  const surat = await getAllSuketUsaha();
  return (
    <div className="flex flex-wrap gap-2">
      {surat?.length === 0 && (
        <h1 className="w-full text-xl font-[500] text-center">
          Tidak ada surat
        </h1>
      )}
      {surat?.map((item) => (
        <ListNoSurat
          key={item.no_surat}
          nik={item.pendudukId}
          no_surat={item.no_surat}
        />
      ))}
    </div>
  );
}

export default SuketUsahaPage;
