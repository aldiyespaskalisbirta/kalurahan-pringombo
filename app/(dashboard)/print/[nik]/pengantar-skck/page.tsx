import PengantarSkckPDF from "./_components/pengantar-skck-pdf";
import { getPendudukById } from "@/actions/penduduk-actions";

type Props = {
  params: {
    nik: string;
  };
};
async function SuketKematianPage({ params }: Props) {
  const nik = decodeURIComponent(params.nik);

  const data_penduduk = await getPendudukById(nik);

  if (!data_penduduk) {
    return null;
  }
  return (
    <div
      className={`p-12 flex items-center flex-col xl:mx-40 mb-10 bg-slate-700`}
    >
      <PengantarSkckPDF nik={nik} data={{ individu: data_penduduk }} />
    </div>
  );
}

export default SuketKematianPage;
