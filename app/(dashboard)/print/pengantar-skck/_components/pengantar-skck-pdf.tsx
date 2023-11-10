"use client";

import Link from "next/link";
import generatePDF, { Margin } from "react-to-pdf";

import { Source_Serif_4 } from "next/font/google";

import { formatNumber } from "@/lib/format/format-number";
import { formatDateStrip } from "@/lib/format/format-date-strip";
import { formatString } from "@/lib/format/format-string";
import Header from "../../_components/header";

import { Button } from "@/components/ui/button";

import { decodeData } from "@/lib/encrypt/decode";
import { Penduduk, PengantarSKCK } from "@prisma/client";
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
    surat?: PengantarSKCK;
    individu: Penduduk;
  };
}

const source_serif_4 = Source_Serif_4({
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

function PengantarSkckPDF({ nik, data }: Props) {
  const router = useRouter();

  const downloadPDF = () => {
    generatePDF(() => document.getElementById("container"), {
      method: "save",
      filename: `pengantar-skck-${decodeData(nik)}.pdf`,
      page: { margin: Margin.MEDIUM },
    });
  };

  const onDelete = async () => {
    try {
      await axios.delete(`/api/print/pengantar-skck/${data.surat?.no_surat}`);
      toast.success("Berhasil dihapus");
      router.refresh();
      router.push(`/print/pengantar-skck`);
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
                href="/print/pengantar-skck/[nik]/[no_surat]"
                as={`/print/pengantar-skck/${nik}/${data.surat.no_surat}/edit`}
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
        className={`bg-white ${source_serif_4.className} px-14 mb-10 pb-20`}
      >
        <div className="flex justify-center items-center flex-col">
          <Header />
          <div className="flex flex-col justify-center items-center mt-2">
            <h1 className="font-bold text-xl border-b-2 border-black w-full pb-1">
              SURAT PENGANTAR SKCK
            </h1>
            <p className="text-lg tracking-tighter">
              Nomor:{" "}
              {data.surat?.no_surat
                ? decodeData(data.surat?.no_surat)
                : "........................."}
            </p>
          </div>
          <div className="mt-8">
            <p className="text-lg tracking-tighter min-w-full text-justify">
              <span className="px-8" />
              Yang bertanda tangan di bawah ini, Lurah Pringombo, Kapanewon
              Rongkop, Kabupaten Gunungkidul, menerangkan bahwa :
            </p>
          </div>
          <div className="flex flex-col w-full mt-5">
            <div className="text-lg flex space-x-2">
              <h1 className="w-60 tracking-tighter">Nama Lengkap</h1>
              <span>:</span>
              <p className="tracking-tighter">
                {data.individu.nama ? data.individu.nama.toUpperCase() : "-"}
              </p>
            </div>
            <div className="text-lg flex space-x-2">
              <h1 className="w-60 tracking-tighter">No. Induk Kependudukan</h1>
              <span>:</span>
              <p className="tracking-tighter">
                {data.individu.nik ? decodeData(data.individu.nik) : "-"}
              </p>
            </div>
            <div className="text-lg flex space-x-2">
              <h1 className="w-60 tracking-tighter">Nomor Kartu Keluarga</h1>
              <span>:</span>
              <p className="tracking-tighter">
                {data.individu.nokk ? decodeData(data.individu.nokk) : "-"}
              </p>
            </div>
            <div className="text-lg flex space-x-2">
              <h1 className="w-60 tracking-tighter">Tempat/Tanggal Lahir</h1>
              <span>:</span>
              <p className="tracking-tighter">
                {data.individu.tempat_lahir
                  ? formatString(data.individu.tempat_lahir)
                  : "-"}
                ,{" "}
                {data.individu.tanggal_lahir
                  ? formatDateStrip(data.individu.tanggal_lahir?.toString())
                  : "-"}
              </p>
            </div>
            <div className="text-lg flex space-x-2">
              <h1 className="w-60 tracking-tighter">Jenis Kelamin</h1>
              <span>:</span>
              <p className="tracking-tighter">
                {data.individu.jenis_kelamin
                  ? formatString(data.individu.jenis_kelamin)
                  : "-"}
              </p>
            </div>
            <div className="text-lg flex space-x-2">
              <h1 className="w-60 tracking-tighter">Kewarganegaraan</h1>
              <span>:</span>
              <p className="tracking-tighter">
                {data.individu.kewarganegaraan
                  ? formatString(data.individu.kewarganegaraan)
                  : "-"}
              </p>
            </div>
            <div className="text-lg flex space-x-2">
              <h1 className="w-60 tracking-tighter">Agama</h1>
              <span>:</span>
              <p className="tracking-tighter">
                {data.individu.agama ? formatString(data.individu.agama) : "-"}
              </p>
            </div>
            <div className="text-lg flex space-x-2">
              <h1 className="w-60 tracking-tighter">Pekerjaan</h1>
              <span>:</span>
              <p className="tracking-tighter">
                {data.individu.pekerjaan
                  ? formatString(data.individu.pekerjaan)
                  : "-"}
              </p>
            </div>
            <div className="text-lg flex space-x-2">
              <h1 className="w-60 tracking-tighter">Pendidikan Terakhir</h1>
              <span>:</span>
              <p className="tracking-tighter">
                {data.individu.pendidikan_kk
                  ? data.individu.pendidikan_kk
                  : "-"}
              </p>
            </div>
            <div className="text-lg flex space-x-2">
              <h1 className="w-60 tracking-tighter">Untuk Keperluan</h1>
              <span>:</span>
              <p className="font-bold tracking-tighter">
                {data.surat?.keperluan
                  ? formatString(data.surat?.keperluan)
                  : "-"}
              </p>
            </div>
            <div className="text-lg flex space-x-2">
              <h1 className="w-60 tracking-tighter">Alamat Asal</h1>
              <span>:</span>
              <p className="flex-1 tracking-tighter">
                RT {data.individu.rt ? formatNumber(data.individu.rt) : "-"}
                {" :"} RW{" "}
                {data.individu.rw ? formatNumber(data.individu.rw) : "-"} {":"}{" "}
                Kode Pos 55883
                <br />
                Padukuhan{" "}
                {data.individu.padukuhan
                  ? data.individu.padukuhan.toUpperCase()
                  : "-"}
                , Kapenawon Rongkop, Kabupaten Gunungkidul, Daerah Istimewa
                Yogyakarta
              </p>
            </div>
          </div>
          <div className="w-full mt-8">
            <p className="text-md leading-5 tracking-tighter text-justify">
              <span className="px-8" />
              Menerangkan bahwa orang tersebut diatas benar-benar Penduduk
              Kalurahan Pringombo, Kapanewon Rongkop, Kabupaten Gunungkidul yang
              beradat istiadat baik, tidak tersangkut urusan Polisi.
            </p>
          </div>
          <p className="mt-2 text-md leading-5 tracking-tighter text-justify">
            <span className="px-8" />
            Demikian Surat Pengantar ini kami buat dengan sebenarnya dan agar
            dapat dipergunakan sebagaimana mestinya, kemudian agar menjadikan
            maklum.
          </p>
          <div className="grid grid-cols-2 w-full mt-8">
            <div className="flex flex-col justify-between items-center">
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-lg tracking-tighter text-center">
                  Pemegang Surat
                </p>
              </div>
              <div className="w-full h-full">
                <p className="pt-20 tracking-tighter text-center">
                  {data.individu.nama}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between items-center">
              <div className="w-full h-full flex flex-col items-center justify-center">
                <p className="text-lg tracking-tighter text-center">
                  Pringombo, {dateNow.getDate()} {months[dateNow.getMonth()]}{" "}
                  {dateNow.getFullYear()}
                </p>
                <p className="text-lg tracking-tighter text-center">
                  Lurah Pringombo
                </p>
              </div>
              <div className="w-full h-full">
                <p className="pt-20 tracking-tighter text-center">
                  ERMINA KRISTIANI SUSANTI
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center pt-10">
            <div className="flex justify-center items-center flex-col">
              <p className="text-lg tracking-tighter">
                Nomor :{" "}
                {data.surat?.no_polisi
                  ? data.surat?.no_polisi
                  : "............................................"}
              </p>
              <p className="text-lg tracking-tighter">KAPOLSEK RONGKOP</p>
              <span className="pt-20">
                {data.surat?.no_reg_pok
                  ? data.surat?.no_reg_pok
                  : "............................................................."}
                <p className="tracking-tighter">NRP</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PengantarSkckPDF;
