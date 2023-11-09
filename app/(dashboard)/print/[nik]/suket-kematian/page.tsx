import { getPendudukById } from "@/actions/penduduk-actions";
import SuketKematianPDF from "./_components/suket-kematian-pdf";

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
      <SuketKematianPDF nik={nik} data={{ individu: data_penduduk }} />
    </div>
  );
}

export default SuketKematianPage;
