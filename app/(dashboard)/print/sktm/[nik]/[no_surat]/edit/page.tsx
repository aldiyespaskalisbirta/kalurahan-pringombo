import { EditNama } from "@/components/penduduk/edit-nama";
import { EditNamaPanggilan } from "@/components/penduduk/edit-nama-panggilan";
import { EditPadukuhan } from "@/components/penduduk/edit-padukuhan";
import { EditPekerjaan } from "@/components/penduduk/edit-pekerjaan";
import { EditRt } from "@/components/penduduk/edit-rt";
import { EditRw } from "@/components/penduduk/edit-rw";
import { EditTanggalLahir } from "@/components/penduduk/edit-tanggal-lahir";
import { EditTempatLahir } from "@/components/penduduk/edit-tempat-lahir";
import { EditNomorSurat } from "./_components/edit-nomor-surat";

import { getPendudukById } from "@/actions/penduduk-actions";
import { getSktmById } from "@/actions/sktm/sktm-actions";
import { EditJenisKelamin } from "@/components/penduduk/edit-jenis-kelamin";
import { EditStatusKawin } from "@/components/penduduk/edit-status-kawin";
import { EditPendidikanKk } from "@/components/penduduk/edit-pendidikan-kk";
import { EditAgama } from "@/components/penduduk/edit-agama";
import { EditNamaInstansi } from "./_components/edit-nama-instansi";
import { EditFakultasProdi } from "./_components/edit-fakultas-prodi";
import { EditKelasSemester } from "./_components/edit-kelas-semester";

type Props = {
  params: {
    nik: string;
    no_surat: string;
  };
};

async function EditSuketUsahaPage({ params }: Props) {
  const nik_ortu = decodeURIComponent(params.nik);
  const no_surat = decodeURIComponent(params.no_surat);

  const data_ortu = await getPendudukById(nik_ortu);
  const data_surat = await getSktmById(nik_ortu, no_surat);
  const nik_anak = data_surat?.nik_anak;
  const data_anak = nik_anak && (await getPendudukById(nik_anak));

  if (!data_ortu || !data_anak || !data_surat) {
    return null;
  }

  return (
    <div className="mx-8 pb-12 space-y-4">
      <EditNomorSurat initialData={data_surat} nik={nik_ortu} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-x-8">
        <div className="">
          <h1 className="font-[500]">Data Orangtua</h1>
          <EditNama initialData={data_ortu} nik={nik_ortu} />
          <EditTempatLahir initialData={data_ortu} nik={nik_ortu} />
          <EditTanggalLahir initialData={data_ortu} nik={nik_ortu} />
          <EditJenisKelamin initialData={data_ortu} nik={nik_ortu} />
          <EditStatusKawin initialData={data_ortu} nik={nik_ortu} />
          <EditPekerjaan initialData={data_ortu} nik={nik_ortu} />
          <EditPendidikanKk initialData={data_ortu} nik={nik_ortu} />
          <EditAgama initialData={data_ortu} nik={nik_ortu} />
          <EditPadukuhan initialData={data_ortu} nik={nik_ortu} />
          <EditRt initialData={data_ortu} nik={nik_ortu} />
          <EditRw initialData={data_ortu} nik={nik_ortu} />
        </div>
        <div>
          <h1 className="font-[500]">Data Anak</h1>
          <EditNama initialData={data_anak} nik={nik_anak} />
          <EditTempatLahir initialData={data_anak} nik={nik_anak} />
          <EditTanggalLahir initialData={data_anak} nik={nik_anak} />
          <EditJenisKelamin initialData={data_anak} nik={nik_anak} />
          {/* // TODO: fakultas_prodi, kelas_semester */}
          <EditNamaInstansi initialData={data_surat} nik={nik_ortu} />
          <EditFakultasProdi initialData={data_surat} nik={nik_ortu} />
          <EditKelasSemester initialData={data_surat} nik={nik_ortu} />
        </div>
      </div>
    </div>
  );
}

export default EditSuketUsahaPage;
