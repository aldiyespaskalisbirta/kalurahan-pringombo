"use client";

import Link from "next/link";
import generatePDF, { Margin } from "react-to-pdf";

import { Source_Serif_4 } from "next/font/google";

import { formatNumber } from "@/lib/format/format-number";
import { formatDateStrip } from "@/lib/format/format-date-strip";
import { formatString } from "@/lib/format/format-string";
import { formatDateString } from "@/lib/format/format-date-string";
import Header from "../../_components/header";

import { Button } from "@/components/ui/button";

import { decodeData } from "@/lib/encrypt/decode";
import { Penduduk, SuketKematian } from "@prisma/client";
import { formatNumberToString } from "@/lib/format/format-number-to-string";
import { BsFilePdfFill, BsPencil, BsTrash } from "react-icons/bs";
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

interface Props {
  nik: string;
  data: {
    surat?: SuketKematian;
    individu: Penduduk;
  };
}

const source_serif_4 = Source_Serif_4({
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

function SuketKematianPDF({ nik, data }: Props) {
  const router = useRouter();

  const downloadPDF = () => {
    generatePDF(() => document.getElementById("container"), {
      method: "save",
      filename: `suket-kematian-${decodeData(nik)}.pdf`,
      page: { margin: Margin.MEDIUM },
    });
  };

  const onDelete = async () => {
    try {
      await axios.delete(`/api/print/suket-kematian/${data.surat?.no_surat}`);
      toast.success("Berhasil dihapus");
      router.refresh();
      router.push(`/print/suket-kematian`);
    } catch {
      toast.error("Gagal menghapus data");
    }
  };

  const months = [
    "Januari",
    "Jebruari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Augustus",
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
                href="/print/suket-kematian/[nik]/[no_surat]"
                as={`/print/suket-kematian/${nik}/${data.surat.no_surat}/edit`}
              >
                <Button className="mb-4 bg-sky-500 hover:bg-sky-600">
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
              SURAT KETERANGAN KEMATIAN
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
              Yang bertanda tangan dibawah ini Lurah Pringombo Kapanewon Rongkop
              Kabupaten Gunungkidul, menerangkan bahwa :
            </p>
          </div>
          <div className="flex flex-col w-full mt-8">
            <div className="text-lg flex space-x-2">
              <h1 className="w-60">Nama</h1>
              <span>:</span>
              <p>{data.individu.nama}</p>
            </div>
            <div className="text-lg flex space-x-2">
              <h1 className="w-60">NIK</h1>
              <span>:</span>
              <p>{decodeData(data.individu.nik)}</p>
            </div>
            <div className="text-lg flex space-x-2">
              <h1 className="w-60">Tempat & Tanggal Lahir</h1>
              <span>:</span>
              <p>
                {data.individu.tempat_lahir
                  ? formatString(data.individu.tempat_lahir)
                  : "-"}
                ,{" "}
                {data.individu.tanggal_lahir
                  ? formatDateStrip(data.individu.tanggal_lahir.toString())
                  : "-"}
              </p>
            </div>
            <div className="text-lg flex space-x-2">
              <h1 className="w-60">Agama</h1>
              <span>:</span>
              <p>{data.individu.agama ? data.individu.agama : "-"}</p>
            </div>
            <div className="text-lg flex space-x-2">
              <h1 className="w-60">Pekerjaan</h1>
              <span>:</span>
              <p>
                {data.individu.pekerjaan
                  ? formatString(data.individu.pekerjaan)
                  : "-"}
              </p>
            </div>
            <div className="text-lg flex space-x-2">
              <h1 className="w-60">Alamat</h1>
              <span>:</span>
              <p className="flex-1">
                Padukuhan :{" "}
                {data.individu.padukuhan
                  ? formatString(data.individu.padukuhan)
                  : "(.....)"}{" "}
                RT{" "}
                {data.individu.rt ? formatNumber(data.individu.rt) : "(.....)"}{" "}
                RW{" "}
                {data.individu.rw ? formatNumber(data.individu.rw) : "(.....)"},
                Kalurahan Pringombo Kapanewon Rongkop Kabupaten Gunungkidul.
              </p>
            </div>
          </div>
          <div className="w-full mt-8">
            <p className="text-justify text-lg">
              Orang tersebut meninggal dunia di Padukuhan{" "}
              {data.surat?.lokasi_meninggal
                ? formatString(data.surat?.lokasi_meninggal)
                : "(.....)"}{" "}
              pada tanggal{" "}
              {data.surat?.tanggal_kematian
                ? formatDateString(data.surat?.tanggal_kematian?.toString())
                : "(.....)"}{" "}
              Adalah benar-benar penduduk Kalurahan Pringombo, Kapanewon
              Rongkop, Kabupaten Gunungkidul, sesuai dengan alamat terakhir
              tersebut dan anak ke{" "}
              {data.surat?.anak_ke ? data.surat?.anak_ke : "(.....)"} (
              {data.surat?.anak_ke
                ? formatNumberToString(data.surat?.anak_ke)
                : "....."}
              ) yang dilahirkan dari pasangan suami istri:
            </p>
          </div>
          <div className="w-full mt-8 flex items-center justify-center">
            <h2 className="text-lg">
              {data.individu.nama_ayah ? data.individu.nama_ayah : "(.....)"}{" "}
              dan {data.individu.nama_ibu ? data.individu.nama_ibu : "(.....)"}
            </h2>
          </div>
          <div className="w-full mt-8">
            <p className="text-lg">
              Demikian surat keterangan ini dibuat untuk dapat dipergunakan
              sebagaimana mestinya.
            </p>
          </div>
          <div className="w-full flex justify-end items-end mt-16">
            <div className="flex justify-center items-center flex-col">
              <p className="text-lg">
                Pringombo, {dateNow.getDate()} {months[dateNow.getMonth()]}{" "}
                {dateNow.getFullYear()}
              </p>
              <p className="text-lg">a.n Lurah Pringombo</p>
              <p className="text-lg">Kaur. Tatalaksana</p>
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

export default SuketKematianPDF;
