import PengantarSkckPDF from "../../_components/pengantar-skck-pdf";

import { getPendudukById } from "@/actions/penduduk-actions";
import { getPengantarSkckById } from "@/actions/pengantar-skck/pengantar-skck-actions";

type Props = {
  params: {
    nik: string;
    no_surat: string;
  };
};

async function PengantarSkckIdPage({ params }: Props) {
  const nik = decodeURIComponent(params.nik);
  const no_surat = decodeURIComponent(params.no_surat);

  const data_surat = await getPengantarSkckById(nik, no_surat);
  const data_individu = await getPendudukById(nik);

  if (!data_surat || !data_individu) {
    return null;
  }

  return (
    <div className={`p-12 flex items-center flex-col mx-40 mb-10 bg-slate-700`}>
      <PengantarSkckPDF
        nik={nik}
        data={{
          surat: data_surat,
          individu: data_individu,
        }}
      />
    </div>
  );
}

export default PengantarSkckIdPage;
