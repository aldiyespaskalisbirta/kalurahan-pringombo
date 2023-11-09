"use client";

import { Source_Serif_4 } from "next/font/google";
import generatePDF, { Margin } from "react-to-pdf";

import { Penduduk, SuketUsaha } from "@prisma/client";
import { BsFilePdfFill, BsPencil, BsTrash } from "react-icons/bs";

import { formatString } from "@/lib/format/format-string";
import { decodeData } from "@/lib/encrypt/decode";
import { formatDateStrip } from "@/lib/format/format-date-strip";
import { formatNumber } from "@/lib/format/format-number";
import { Button } from "@/components/ui/button";
import Header from "../../_components/header";
import Link from "next/link";
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
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const source_serif_4 = Source_Serif_4({
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

type Props = {
  nik: string;
  data: {
    surat?: SuketUsaha;
    individu: Penduduk;
  };
};

function SuketUsahaPDF({ nik, data }: Props) {
  const router = useRouter();

  const downloadPDF = () => {
    generatePDF(() => document.getElementById("container"), {
      method: "save",
      filename: `surat-keterangan-usaha-${decodeData(nik)}.pdf`,
      page: { margin: Margin.NONE },
    });
  };

  const onDelete = async () => {
    try {
      await axios.delete(
        `/api/penduduk/${nik}/suket-usaha/${data.surat?.no_surat}`
      );
      toast.success("Berhasil dihapus");
      router.refresh();
      router.push(`/print/${nik}/suket-usaha`);
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
                href="/print/[nik]/suket-usaha/[no_surat]"
                as={`/print/${nik}/suket-usaha/${data.surat.no_surat}/edit`}
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
          <div className="flex flex-col justify-center items-center mt-5">
            <h1 className="font-bold text-2xl border-b-2 pb-3 border-black w-full">
              SURAT KETERANGAN USAHA
            </h1>
            <p className="text-lg">
              Nomor:{" "}
              {data.surat?.no_surat
                ? decodeData(data.surat?.no_surat)
                : "........................."}
            </p>
          </div>
          <div className="mt-8">
            <p className="text-lg min-w-full">
              <span className="px-8" />
              Yang bertanda tangan di bawah ini Lurah Kalurahan Pringombo
              Kapanewon Rongkop Menerangkan bahwa:
            </p>
          </div>
          <div className="flex flex-col w-full mt-8">
            <div className="flex">
              <div className="flex w-[500px] text-lg items-center">
                <h1 className="w-48">Nama Lengkap</h1>
                <span className="px-2">:</span>
                <p className="font-semibold">
                  {data.individu.nama ? data.individu.nama.toUpperCase() : "-"}
                </p>
              </div>
              <div className="flex text-lg">
                <h1 className="w-20">Alias</h1>
                <span className="px-2">:</span>
                <p>
                  {data.individu.alias
                    ? formatString(data.individu.alias)
                    : "-"}
                </p>
              </div>
            </div>
            <div className="text-lg flex">
              <h1 className="w-48">NIK</h1>
              <span className="px-2">:</span>
              <p className="font-semibold">{decodeData(data.individu.nik)}</p>
            </div>
            <div className="flex">
              <div className="flex w-[500px] text-lg items-center">
                <h1 className="w-48">Tempat/Tanggal Lahir</h1>
                <span className="px-2">:</span>
                <p className="font-semibold">
                  {data.individu.tempat_lahir
                    ? formatString(data.individu.tempat_lahir)
                    : "-"}
                  ,{" "}
                  {data.individu.tanggal_lahir
                    ? formatDateStrip(data.individu.tanggal_lahir?.toString())
                    : "-"}
                </p>
              </div>
              <div className="flex text-lg">
                <h1 className="w-20">Usia</h1>
                <span className="px-2">:</span>
                <p>{data.individu.umur ? data.individu.umur : "-"} Tahun</p>
              </div>
            </div>
            <div className="text-lg flex space-x-2">
              <h1 className="w-48">Alamat Asal</h1>
              <span>:</span>
              <p className="flex-1 font-semibold">
                {data.individu.padukuhan
                  ? data.individu.padukuhan.toUpperCase()
                  : "-"}{" "}
                RT {data.individu.rt ? formatNumber(data.individu.rt) : "-"} RW{" "}
                {data.individu.rw ? formatNumber(data.individu.rw) : "-"},
                Pringombo, Rongkop, Gunungkidul
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full mt-8">
            <div className="text-lg flex">
              <h1 className="">
                Orang tersebut benar-benar mempunyai usaha pokok
              </h1>
              <span className="px-2">:</span>
              <p className="font-semibold">
                {data.individu.pekerjaan
                  ? formatString(data.individu.pekerjaan)
                  : "-"}
              </p>
            </div>
            <div className="text-lg flex space-x-2">
              <h1 className="w-48">Usaha Sampingan</h1>
              <span>:</span>
              <p>
                {data.surat?.usaha_sampingan
                  ? formatString(data.surat.usaha_sampingan)
                  : "...................."}
              </p>
            </div>
            <div className="text-lg flex space-x-2">
              <h1 className="w-48">Di Kalurahan</h1>
              <span>:</span>
              <p>
                {data.surat?.di_kalurahan
                  ? formatString(data.surat.di_kalurahan)
                  : "...................."}
              </p>
            </div>
            <div className="text-lg flex space-x-2">
              <h1 className="w-48">Di Kapenawon</h1>
              <span>:</span>
              <p>
                {data.surat?.di_kapenawon
                  ? formatString(data.surat.di_kapenawon)
                  : "...................."}
              </p>
            </div>
            <div className="text-lg flex space-x-2">
              <h1 className="w-48">Kabupaten</h1>
              <span>:</span>
              <p>
                {data.surat?.di_kabupaten
                  ? formatString(data.surat.di_kabupaten)
                  : "...................."}
              </p>
            </div>
          </div>
          <div className="w-full mt-8">
            <p className="text-lg">
              <span className="px-8" />
              Demikian Surat Keterangan Usaha ini kami buat dengan sebenarnya,
              dan agar dapat dipergunakan seperlunya.
            </p>
          </div>
          <div className="w-full flex justify-end items-end">
            <div className="flex justify-center items-center flex-col">
              <p className="text-lg">
                Pringombo, {dateNow.getDate()} {months[dateNow.getMonth()]}{" "}
                {dateNow.getFullYear()}
              </p>
              <p className="text-lg">Lurah Pringombo</p>
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

export default SuketUsahaPDF;
