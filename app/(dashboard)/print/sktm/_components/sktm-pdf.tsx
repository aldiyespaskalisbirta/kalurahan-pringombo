"use client";

import { Source_Serif_4 } from "next/font/google";
import generatePDF, { Margin } from "react-to-pdf";

import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Penduduk, SKTM } from "@prisma/client";
import { BsFilePdfFill, BsPencil, BsTrash } from "react-icons/bs";

import { formatString } from "@/lib/format/format-string";
import { decodeData } from "@/lib/encrypt/decode";
import { formatDateStrip } from "@/lib/format/format-date-strip";
import { formatNumber } from "@/lib/format/format-number";
import { Button } from "@/components/ui/button";
import Header from "../../_components/header";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { numberToRoman } from "@/lib/format/format-number-to-roman";
import { formatNumberToString } from "@/lib/format/format-number-to-string";

const source_serif_4 = Source_Serif_4({
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

type Props = {
  nik: string;
  data: {
    surat?: SKTM;
    data_ortu: Penduduk;
    data_anak: Penduduk;
  };
};

function SktmPDF({ nik, data }: Props) {
  const router = useRouter();

  const downloadPDF = () => {
    generatePDF(() => document.getElementById("container"), {
      method: "save",
      filename: `surat-keterangan-tidak-mampu-${decodeData(nik)}.pdf`,
      page: { margin: Margin.NONE },
    });
  };

  const onDelete = async () => {
    try {
      await axios.delete(`/api/print/sktm/${data.surat?.no_surat}`);
      toast.success("Berhasil dihapus");
      router.push(`/print/sktm`);
      router.refresh();
    } catch {
      toast.error("Gagal menghapus data");
    }
  };
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const dateNow = new Date();

  return (
    <div>
      <div className="flex space-x-4">
        {data?.surat && (
          <div className="w-full flex justify-between items-center">
            <Button onClick={downloadPDF} size="lg" className="mb-4">
              <BsFilePdfFill className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <div className="flex gap-x-4">
              <Link
                href="/print/sktm/[nik]/[no_surat]"
                as={`/print/sktm/${data.data_ortu.nik}/${data.surat.no_surat}/edit`}
              >
                <Button size="lg" className="mb-4 bg-sky-500 hover:bg-sky-600">
                  <BsPencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="secondary"
                    className="bg-red-500 shadow-lg text-white hover:bg-red-600"
                  >
                    <BsTrash className="mr-2 w-4 h-4" />
                    Hapus
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Apakah anda yakin ingin menghapus{" "}
                      <span className="text-sky-700 font-semibold">
                        {decodeData(data.surat.no_surat)}
                      </span>
                      ?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="my-4">
                      Data yang sudah dihapus tidak bisa dikembalikan
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete}>
                      Hapus
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        )}
      </div>
      <div
        id="container"
        className={`bg-white ${source_serif_4.className} px-20 mb-10 pb-20`}
      >
        <div className="flex justify-center items-center flex-col">
          <Header />
          <div className="flex flex-col justify-center items-center mt-3">
            <h1 className="font-bold text-2xl border-b-2 pb-3 border-black w-full">
              SURAT KETERANGAN TIDAK MAMPU
            </h1>
            <p className="text-lg">
              Nomor:{" "}
              {data.surat?.no_surat
                ? decodeData(data.surat?.no_surat)
                : "........................."}
            </p>
          </div>
          <div className="mt-5">
            <p className="text-lg min-w-full leading-5 tracking-tighter">
              <span className="px-8" />
              Yang bertanda tangan di bawah ini, Lurah Pringombo, Kapenawon
              Rongkop, Kabupaten Gunungkidul, menerangkan dengan sebenarnya
              bahwa :
            </p>
          </div>
          <div className="flex flex-col w-full mt-5">
            <div className="text-lg flex">
              <h1 className="w-48 tracking-tighter">Nama</h1>
              <span className="px-2">:</span>
              <p className="tracking-tighter">{data.data_ortu.nama}</p>
            </div>
            <div className="text-lg flex">
              <h1 className="w-48 tracking-tighter">KTP</h1>
              <span className="px-2">:</span>
              <p className="tracking-tighter">
                {decodeData(data.data_ortu.nik)}
              </p>
            </div>
            <div className="text-lg flex">
              <h1 className="w-48 tracking-tighter">Tempat/Tanggal Lahir</h1>
              <span className="px-2">:</span>
              <p className="tracking-tighter">
                {data.data_ortu.tempat_lahir
                  ? formatString(data.data_ortu.tempat_lahir)
                  : "-"}
                ,{" "}
                {data.data_ortu.tanggal_lahir
                  ? formatDateStrip(data.data_ortu.tanggal_lahir?.toString())
                  : "-"}
              </p>
            </div>
            <div className="text-lg flex">
              <h1 className="w-48 tracking-tighter">Jenis Kelamin</h1>
              <span className="px-2">:</span>
              <p className="tracking-tighter">
                {data.data_ortu.jenis_kelamin
                  ? formatString(data.data_ortu.jenis_kelamin)
                  : "-"}
              </p>
            </div>
            <div className="text-lg flex">
              <h1 className="w-48 tracking-tighter">Status Perkawinan</h1>
              <span className="px-2">:</span>
              <p className="tracking-tighter">
                {data.data_ortu.status_kawin
                  ? formatString(data.data_ortu.status_kawin)
                  : "-"}
              </p>
            </div>
            <div className="text-lg flex">
              <h1 className="w-48 tracking-tighter">Pekerjaan</h1>
              <span className="px-2">:</span>
              <p className="tracking-tighter">
                {data.data_ortu.pekerjaan
                  ? formatString(data.data_ortu.pekerjaan)
                  : "-"}
              </p>
            </div>
            <div className="text-lg flex">
              <h1 className="w-48 tracking-tighter">Pendidikan Terakhir</h1>
              <span className="px-2">:</span>
              <p className="tracking-tighter">
                {data.data_ortu.pendidikan_kk
                  ? formatString(data.data_ortu.pendidikan_kk)
                  : "-"}
              </p>
            </div>
            <div className="text-lg flex">
              <h1 className="w-48 tracking-tighter">Agama</h1>
              <span className="px-2">:</span>
              <p className="tracking-tighter">
                {data.data_ortu.agama
                  ? formatString(data.data_ortu.agama)
                  : "-"}
              </p>
            </div>
            <div className="text-lg flex space-x-2">
              <h1 className="w-48 tracking-tighter">Alamat</h1>
              <span>:</span>
              <p className="flex-1 leading-5 tracking-tighter">
                {data.data_ortu.padukuhan
                  ? formatString(data.data_ortu.padukuhan)
                  : "-"}
                {", "}
                RT {data.data_ortu.rt ? formatNumber(data.data_ortu.rt) : "-"} /
                RW {data.data_ortu.rw ? formatNumber(data.data_ortu.rw) : "-"},
                Kalurahan Pringombo, Kapenawon Rongkop, Kabupaten Gunungkidul
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full mt-5">
            <div className="text-lg flex">
              <h1>
                Adalah benar-benar{" "}
                <span className="font-semibold">Orang Tua</span> dari :
              </h1>
            </div>
            <div className="text-lg flex">
              <h1 className="w-48 tracking-tighter">Nama</h1>
              <span className="px-2">:</span>
              <p className="tracking-tighter font-semibold">
                {data.data_anak.nama.toUpperCase()}
              </p>
            </div>
            <div className="text-lg flex">
              <h1 className="w-48 tracking-tighter">KTP</h1>
              <span className="px-2">:</span>
              <p className="tracking-tighter">
                {decodeData(data.data_anak.nik)}
              </p>
            </div>
            <div className="text-lg flex">
              <h1 className="w-48 tracking-tighter">Tempat/Tanggal Lahir</h1>
              <span className="px-2">:</span>
              <p className="tracking-tighter">
                {data.data_anak.tempat_lahir
                  ? formatString(data.data_anak.tempat_lahir)
                  : "-"}
                ,{" "}
                {data.data_anak.tanggal_lahir
                  ? formatDateStrip(data.data_anak.tanggal_lahir?.toString())
                  : "-"}
              </p>
            </div>
            <div className="text-lg flex">
              <h1 className="w-48 tracking-tighter">Jenis Kelamin</h1>
              <span className="px-2">:</span>
              <p className="tracking-tighter">
                {data.data_anak.jenis_kelamin
                  ? data.data_anak.jenis_kelamin
                  : "-"}
              </p>
            </div>
            <div className="text-lg flex">
              <h1 className="w-48 tracking-tighter">Nama Sekolah/Univ</h1>
              <span className="px-2">:</span>
              <p className="tracking-tighter">
                {data.surat?.nama_instansi
                  ? data.surat?.nama_instansi.toUpperCase()
                  : "-"}
              </p>
            </div>
            <div className="text-lg flex">
              <h1 className="w-48 tracking-tighter">Fakultas/Prodi</h1>
              <span className="px-2">:</span>
              <p className="tracking-tighter">
                {data.surat?.fakultas_prodi
                  ? data.surat?.fakultas_prodi.toUpperCase()
                  : ".........................................."}
              </p>
            </div>
            <div className="text-lg flex">
              <h1 className="w-48 tracking-tighter">Kelas/Semester</h1>
              <span className="px-2">:</span>
              <p className="tracking-tighter">
                {data.surat?.kelas_semester
                  ? numberToRoman(data.surat?.kelas_semester)
                  : "-"}{" "}
                {`(${
                  data.surat?.kelas_semester
                    ? formatString(
                        formatNumberToString(data.surat?.kelas_semester)
                      )
                    : "........."
                })`}
              </p>
            </div>
          </div>
          <div className="w-full mt-8">
            <p className="text-md leading-5 tracking-tighter text-justify">
              <span className="px-8" />
              Orang tersebut diatas adalah benar-benar warga Kalurahan
              Pringombo, Kapanewon Rongkop, Kabupaten Gunungkidul, sesuai dengan
              pengamatan kami warga tersebut keadaan perekonomiannya{" "}
              <span className="font-semibold">KURANG MAMPU</span> dan termasuk
              dalam kriteria{" "}
              <span className="font-semibold">KELUARGA MISKIN</span>.
            </p>
          </div>
          <p className="mt-2 text-md leading-5 tracking-tighter text-justify">
            <span className="px-8" />
            Demikian surat keterangan tidak mampu ini kami buat dengan keadaan
            yang sebenarnya agar dapat dipergunakan dengan sebagaimana mestinya.
          </p>
          <div className="w-full flex justify-end items-end mt-4">
            <div className="flex justify-center items-center flex-col">
              <p className="text-lg">
                Pringombo, {dateNow.getDate()} {months[dateNow.getMonth()]}{" "}
                {dateNow.getFullYear()}
              </p>
              <p className="text-lg">a.n Lurah Pringombo</p>
              <span className="pt-24">
                .......................................
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SktmPDF;
