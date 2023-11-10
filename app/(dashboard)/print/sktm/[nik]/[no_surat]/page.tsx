import { getPendudukById } from "@/actions/penduduk-actions";
import { getSktmById } from "@/actions/sktm/sktm-actions";
import SktmPDF from "../../_components/sktm-pdf";

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
  const data_ortu = await getPendudukById(nik);
  const data_anak =
    data_surat?.nik_anak && (await getPendudukById(data_surat.nik_anak));

  if (!data_surat || !data_ortu || !data_anak) {
    return null;
  }

  return (
    <div className={`p-12 flex items-center flex-col mx-40 mb-10 bg-slate-700`}>
      <SktmPDF
        nik={nik}
        data={{
          surat: data_surat,
          data_ortu: data_ortu,
          data_anak: data_anak,
        }}
      />
    </div>
  );
}

export default SuketUsahaIdPage;
