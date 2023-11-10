import { getAllSuketKematian } from "@/actions/suket-kematian/suket-kematian-actions";
import ListNoSurat from "./_components/list-no-surat";

async function PengantarSkckPage() {
  const surat = await getAllSuketKematian();
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

export default PengantarSkckPage;
