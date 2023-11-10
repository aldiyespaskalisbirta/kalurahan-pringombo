import { getPendudukById } from "@/actions/penduduk-actions";
import { EditAgama } from "@/components/penduduk/edit-agama";
import { EditGolDarah } from "@/components/penduduk/edit-gol-darah";
import { EditJenisKelamin } from "@/components/penduduk/edit-jenis-kelamin";
import { EditNama } from "@/components/penduduk/edit-nama";
import { EditNamaAyah } from "@/components/penduduk/edit-nama-ayah";
import { EditNamaIbu } from "@/components/penduduk/edit-nama-ibu";
import { EditNamaPanggilan } from "@/components/penduduk/edit-nama-panggilan";
import { EditNik } from "@/components/penduduk/edit-nik";
import { EditNokk } from "@/components/penduduk/edit-nokk";
import { EditPadukuhan } from "@/components/penduduk/edit-padukuhan";
import { EditPekerjaan } from "@/components/penduduk/edit-pekerjaan";
import { EditPendidikanKk } from "@/components/penduduk/edit-pendidikan-kk";
import { EditPendidikanSdt } from "@/components/penduduk/edit-pendidikan-sdt";
import { EditRt } from "@/components/penduduk/edit-rt";
import { EditRw } from "@/components/penduduk/edit-rw";
import { EditShdk } from "@/components/penduduk/edit-shdk";
import { EditStatusDuk } from "@/components/penduduk/edit-status-duk";
import { EditStatusKawin } from "@/components/penduduk/edit-status-kawin";
import { EditTanggalLahir } from "@/components/penduduk/edit-tanggal-lahir";
import { EditTempatLahir } from "@/components/penduduk/edit-tempat-lahir";
import { decodeData } from "@/lib/encrypt/decode";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

type Props = {
  params: {
    nik: string;
  };
};

async function EditPage({ params }: Props) {
  const nik = decodeURIComponent(params.nik);
  const data = await getPendudukById(nik);
  if (!data) {
    return null;
  }
  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href="/penduduk/[nik]"
              as={`/penduduk/${nik}`}
              prefetch={true}
              className="w-fit p-2 flex items-center test-sm hover:opacity-75 trasition mb-6"
            >
              <IoMdArrowRoundBack className="h-4 w-4 mr-2" />
              Kembali
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">
                  Edit Data{" "}
                  <span className="text-sky-700 font-semibold">
                    {decodeData(nik)}
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-x-8 mx-8 pb-12">
        <EditNik initialData={data} nik={nik} />
        <EditNokk initialData={data} nik={nik} />
        <EditNama initialData={data} nik={nik} />
        <EditNamaPanggilan initialData={data} nik={nik} />
        <EditJenisKelamin initialData={data} nik={nik} />
        <EditAgama initialData={data} nik={nik} />
        <EditTanggalLahir initialData={data} nik={nik} />
        <EditTempatLahir initialData={data} nik={nik} />
        <EditPadukuhan initialData={data} nik={nik} />
        <EditRt initialData={data} nik={nik} />
        <EditRw initialData={data} nik={nik} />
        <EditPendidikanKk initialData={data} nik={nik} />
        <EditPendidikanSdt initialData={data} nik={nik} />
        <EditPekerjaan initialData={data} nik={nik} />
        <EditStatusKawin initialData={data} nik={nik} />
        <EditShdk initialData={data} nik={nik} />
        <EditGolDarah initialData={data} nik={nik} />
        <EditNamaAyah initialData={data} nik={nik} />
        <EditNamaIbu initialData={data} nik={nik} />
        <EditStatusDuk initialData={data} nik={nik} />
      </div>
    </>
  );
}

export default EditPage;
