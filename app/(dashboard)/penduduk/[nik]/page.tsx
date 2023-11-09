import {
  getDataAyahId,
  getDataIbuId,
  getPendudukId,
} from "@/actions/get-penduduk-id";

import Actions from "./_components/actions";
import { decodeData } from "@/lib/encrypt/decode";
import { formatDateStrip } from "@/lib/format/format-date-strip";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

type Props = {
  params: {
    nik: string;
  };
};
async function PendudukIdPage({ params }: Props) {
  const nik = decodeURIComponent(params.nik);
  const data = await getPendudukId(nik);
  if (!data) {
    return null;
  }

  const data_ayah = await getDataAyahId(
    decodeURIComponent(data.nokk!),
    data.nama_ayah!
  );

  const data_ibu = await getDataIbuId(
    decodeURIComponent(data.nokk!),
    data.nama_ibu!
  );
  return (
    <div className="p-6">
      <div className="w-full">
        <Link
          href="/penduduk"
          className="w-fit p-2 flex items-center test-sm hover:opacity-75 trasition mb-6"
        >
          <IoMdArrowRoundBack className="h-4 w-4 mr-2" />
          Kembali
        </Link>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-between shadow-lg p-4 mb-12">
          <h1 className="font-[500] text-xl">
            Biodata Penduduk (NIK: {decodeData(data.nik)})
          </h1>
          <Actions nik={data.nik} />
        </div>
        <div className="flex bg-sky-100/40 p-1">
          <h1 className="w-96">Status Dasar</h1>
          <span className="px-2">:</span>
          <p>HIDUP</p>
        </div>
        <div className="flex p-1">
          <h1 className="w-96">Nama</h1>
          <span className="px-2">:</span>
          <p>{data.nama}</p>
        </div>
        <div className="flex bg-sky-100/40 p-1">
          <h1 className="w-96">Nomor Induk Kependudukan</h1>
          <span className="px-2">:</span>
          <p>{decodeData(data.nik)}</p>
        </div>
        <div className="flex p-1">
          <h1 className="w-96">Nomor Kartu Keluarga</h1>
          <span className="px-2">:</span>
          <p>{data.nokk ? decodeData(data.nokk) : "-"}</p>
        </div>
        <div className="flex bg-sky-100/40 p-1">
          <h1 className="w-96">Status Hubungan Dalam Keluarga</h1>
          <span className="px-2">:</span>
          <p>{data.shdk ? data.shdk.toUpperCase() : "-"}</p>
        </div>
        <div className="flex p-1">
          <h1 className="w-96">Jenis Kelamin</h1>
          <span className="px-2">:</span>
          <p>{data.jenis_kelamin ? data.jenis_kelamin.toUpperCase() : "-"}</p>
        </div>
        <div className="flex bg-sky-100/40 p-1">
          <h1 className="w-96">Agama</h1>
          <span className="px-2">:</span>
          <p>{data.agama ? data.agama.toUpperCase() : "-"}</p>
        </div>
        <div className="flex p-1">
          <h1 className="w-96">Status Penduduk</h1>
          <span className="px-2">:</span>
          <p>{data.status_duk ? data.status_duk.toUpperCase() : "-"}</p>
        </div>
      </div>
      <div className="mt-5 flex flex-col">
        <div className="flex p-1 bg-cyan-400">
          <h1 className="font-semibold">DATA KELAHIRAN</h1>
        </div>
        <div className="flex p-1">
          <h1 className="w-96">Akta Kelahiran</h1>
          <span className="px-2">:</span>
          <p>-</p>
        </div>
        <div className="flex bg-sky-100/40 p-1">
          <h1 className="w-96">Tempat / Tanggal Lahir</h1>
          <span className="px-2">:</span>
          <p>
            {data.tempat_lahir ? data.tempat_lahir : "-"}
            {" / "}
            {data.tanggal_lahir
              ? formatDateStrip(data.tanggal_lahir.toString())
              : "-"}
          </p>
        </div>
        <div className="flex p-1">
          <h1 className="w-96">Tempat Dilahirkan</h1>
          <span className="px-2">:</span>
          <p>-</p>
        </div>
        <div className="flex bg-sky-100/40 p-1">
          <h1 className="w-96">Jenis Kelahiran</h1>
          <span className="px-2">:</span>
          <p>-</p>
        </div>
        <div className="flex p-1">
          <h1 className="w-96">Kelahiran Anak Ke</h1>
          <span className="px-2">:</span>
          <p>-</p>
        </div>
        <div className="flex bg-sky-100/40 p-1">
          <h1 className="w-96">Penolong Kelahiran</h1>
          <span className="px-2">:</span>
          <p>-</p>
        </div>
        <div className="flex p-1">
          <h1 className="w-96">Berat Lahir</h1>
          <span className="px-2">:</span>
          <p>- Kg</p>
        </div>
        <div className="flex bg-sky-100/40 p-1">
          <h1 className="w-96">Panjang Lahir</h1>
          <span className="px-2">:</span>
          <p>- cm</p>
        </div>
      </div>
      <div className="mt-5 flex flex-col">
        <div className="flex p-1  bg-cyan-400">
          <h1 className="font-semibold">PENDIDIKAN DAN PEKERJAAN</h1>
        </div>
        <div className="flex p-1">
          <h1 className="w-96">Pendidikan Dalam KK</h1>
          <span className="px-2">:</span>
          <p>{data.pendidikan_kk ? data.pendidikan_kk : "-"}</p>
        </div>
        <div className="flex bg-sky-100/40 p-1">
          <h1 className="w-96">Pendidikan Sedang Ditempuh</h1>
          <span className="px-2">:</span>
          <p>{data.pendidikan_sdt ? data.pendidikan_sdt : "-"}</p>
        </div>
        <div className="flex p-1">
          <h1 className="w-96">Pekerjaan</h1>
          <span className="px-2">:</span>
          <p>{data.pekerjaan ? data.pekerjaan : "-"}</p>
        </div>
      </div>
      <div className="mt-5 flex flex-col">
        <div className="flex p-1  bg-cyan-400">
          <h1 className="font-semibold">DATA KEWARGANEGARAAN</h1>
        </div>
        <div className="flex p-1">
          <h1 className="w-96">Warga Negara</h1>
          <span className="px-2">:</span>
          <p>{data.kewarganegaraan ? data.kewarganegaraan : "-"}</p>
        </div>
        <div className="flex bg-sky-100/40 p-1">
          <h1 className="w-96">Nomor Paspor</h1>
          <span className="px-2">:</span>
          <p>-</p>
        </div>
        <div className="flex p-1">
          <h1 className="w-96">Tanggal Berakhir Paspor</h1>
          <span className="px-2">:</span>
          <p>-</p>
        </div>
      </div>
      <div className="mt-5 flex flex-col">
        <div className="flex p-1 bg-cyan-400">
          <h1 className="font-semibold">ORANG TUA</h1>
        </div>
        <div className="flex p-1">
          <h1 className="w-96">NIK Ayah</h1>
          <span className="px-2">:</span>
          <p>{data_ayah?.nik ? decodeData(data_ayah.nik) : "-"}</p>
        </div>
        <div className="flex bg-sky-100/40 p-1">
          <h1 className="w-96">Nama Ayah</h1>
          <span className="px-2">:</span>
          <p>{data.nama_ayah ? data.nama_ayah : "-"}</p>
        </div>
        <div className="flex p-1">
          <h1 className="w-96">NIK Ibu</h1>
          <span className="px-2">:</span>
          <p>{data_ibu?.nik ? decodeData(data_ibu.nik) : "-"}</p>
        </div>
        <div className="flex bg-sky-100/40 p-1">
          <h1 className="w-96">Nama Ibu</h1>
          <span className="px-2">:</span>
          <p>{data.nama_ibu ? data.nama_ibu : "-"}</p>
        </div>
      </div>
    </div>
  );
}

export default PendudukIdPage;
