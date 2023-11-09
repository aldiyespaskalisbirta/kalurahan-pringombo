import { EditNama } from "@/components/penduduk/edit-nama";
import { EditPadukuhan } from "@/components/penduduk/edit-padukuhan";
import { EditPekerjaan } from "@/components/penduduk/edit-pekerjaan";
import { EditRt } from "@/components/penduduk/edit-rt";
import { EditRw } from "@/components/penduduk/edit-rw";
import { EditTanggalLahir } from "@/components/penduduk/edit-tanggal-lahir";
import { EditTempatLahir } from "@/components/penduduk/edit-tempat-lahir";
import { EditAgama } from "@/components/penduduk/edit-agama";
import { EditJenisKelamin } from "@/components/penduduk/edit-jenis-kelamin";
import { EditPendidikanKk } from "@/components/penduduk/edit-pendidikan-kk";
import { EditNomorSurat } from "./_components/edit-nomor-surat";
import { EditKeperluan } from "./_components/edit-untuk-keperluan";

import Actions from "./_components/actions";
import { getPengantarSkckById } from "@/actions/pengantar-skck/pengantar-skck-actions";
import { getPendudukById } from "@/actions/penduduk-actions";

type Props = {
  params: {
    nik: string;
    no_surat: string;
  };
};

async function EditSuketKematianPage({ params }: Props) {
  const nik = decodeURIComponent(params.nik);
  const no_surat = decodeURIComponent(params.no_surat);

  const data_penduduk = await getPendudukById(nik);
  const data_surat = await getPengantarSkckById(nik, no_surat);

  if (!data_penduduk || !data_surat) {
    return null;
  }

  return (
    <div>
      <div className="px-6">
        <div className="flex items-center justify-between">
          <div className="w-fit">
            <Actions nik={nik} no_surat={no_surat} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-x-8 mx-8 pb-12">
        <EditNomorSurat initialData={data_surat} nik={nik} />
        <EditNama initialData={data_penduduk} nik={nik} />
        <EditTempatLahir initialData={data_penduduk} nik={nik} />
        <EditTanggalLahir initialData={data_penduduk} nik={nik} />
        <EditJenisKelamin initialData={data_penduduk} nik={nik} />
        <EditAgama initialData={data_penduduk} nik={nik} />
        <EditPekerjaan initialData={data_penduduk} nik={nik} />
        <EditPendidikanKk initialData={data_penduduk} nik={nik} />
        <EditKeperluan initialData={data_surat} nik={nik} />
        <EditPadukuhan initialData={data_penduduk} nik={nik} />
        <EditRt initialData={data_penduduk} nik={nik} />
        <EditRw initialData={data_penduduk} nik={nik} />
      </div>
    </div>
  );
}

export default EditSuketKematianPage;
