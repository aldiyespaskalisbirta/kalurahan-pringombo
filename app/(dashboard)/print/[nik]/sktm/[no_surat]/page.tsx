import SktmPDF from "../_components/sktm-pdf";
import { getPendudukById } from "@/actions/penduduk-actions";
import { getSktmById } from "@/actions/sktm/sktm-actions";

type Props = {
  params: {
    nik: string;
    no_surat: string;
  };
};

async function SuketUsahaIdPage({ params }: Props) {
  const nik = decodeURIComponent(params.nik);
  const no_surat = decodeURIComponent(params.no_surat);

  const data_surat = await getSktmById(nik, no_surat);
  const data_penduduk = await getPendudukById(nik);

  if (!data_surat || !data_penduduk) {
    return null;
  }

  return (
    <div className={`p-12 flex items-center flex-col mx-40 mb-10 bg-slate-700`}>
      <SktmPDF
        nik={nik}
        data={{ surat: data_surat, individu: data_penduduk }}
      />
    </div>
  );
}

export default SuketUsahaIdPage;
