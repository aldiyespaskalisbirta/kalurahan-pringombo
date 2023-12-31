import { EditNama } from "@/components/penduduk/edit-nama";
import { EditPadukuhan } from "@/components/penduduk/edit-padukuhan";
import { EditPekerjaan } from "@/components/penduduk/edit-pekerjaan";
import { EditRt } from "@/components/penduduk/edit-rt";
import { EditRw } from "@/components/penduduk/edit-rw";
import { EditTanggalLahir } from "@/components/penduduk/edit-tanggal-lahir";
import { EditTempatLahir } from "@/components/penduduk/edit-tempat-lahir";
import { EditAgama } from "@/components/penduduk/edit-agama";
import { EditNamaAyah } from "@/components/penduduk/edit-nama-ayah";
import { EditNamaIbu } from "@/components/penduduk/edit-nama-ibu";

import { EditNomorSurat } from "./_components/edit-nomor-surat";
import { EditLokasiMeninggal } from "./_components/edit-lokasi-meninggal";
import { EditAnakKe } from "./_components/edit-anak-ke";
import { EditTanggalKematian } from "./_components/edit-tanggal-kematian";

import { getPendudukById } from "@/actions/penduduk-actions";
import { getSuketKematianById } from "@/actions/suket-kematian/suket-kematian-actions";

type Props = {
  params: {
    nik: string;
    no_surat: string;
  };
};

async function EditSuketUsahaPage({ params }: Props) {
  const nik = decodeURIComponent(params.nik);
  const no_surat = decodeURIComponent(params.no_surat);

  const data_penduduk = await getPendudukById(nik);
  const data_surat = await getSuketKematianById(nik, no_surat);

  if (!data_penduduk || !data_surat) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-x-8 mx-8 pb-12">
      <EditNomorSurat initialData={data_surat} nik={nik} />
      <EditNama initialData={data_penduduk} nik={nik} />
      <EditTempatLahir initialData={data_penduduk} nik={nik} />
      <EditTanggalLahir initialData={data_penduduk} nik={nik} />
      <EditAgama initialData={data_penduduk} nik={nik} />
      <EditPekerjaan initialData={data_penduduk} nik={nik} />
      <EditPadukuhan initialData={data_penduduk} nik={nik} />
      <EditRt initialData={data_penduduk} nik={nik} />
      <EditRw initialData={data_penduduk} nik={nik} />
      <EditNamaAyah initialData={data_penduduk} nik={nik} />
      <EditNamaIbu initialData={data_penduduk} nik={nik} />
      <EditLokasiMeninggal initialData={data_surat} nik={nik} />
      <EditTanggalKematian initialData={data_surat} nik={nik} />
      <EditAnakKe initialData={data_surat} nik={nik} />
    </div>
  );
}

export default EditSuketUsahaPage;
