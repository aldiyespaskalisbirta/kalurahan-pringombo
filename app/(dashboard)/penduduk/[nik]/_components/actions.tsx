"use client";

import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

import { BsPencil, BsTrash } from "react-icons/bs";

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
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { decodeData } from "@/lib/encrypt/decode";

type Props = {
  nik: string;
};
function Actions({ nik }: Props) {
  const router = useRouter();

  const onDelete = async () => {
    try {
      await axios.delete(`/api/penduduk/${nik}`);

      toast.success("Berhasil dihapus");
      router.refresh();
      router.push(`/penduduk`);
    } catch {
      toast.error("Gagal menghapus data");
    }
  };
  return (
    <nav className="flex gap-2">
      <Link href="/penduduk/[nik]" as={`/penduduk/${nik}/edit`}>
        <Button
          variant="ghost"
          className="bg-slate-700 shadow-lg text-white hover:bg-slate-600 hover:text-white"
        >
          <BsPencil className="mr-2 w-4 h-4" />
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
                {decodeData(nik)}
              </span>
              ?
            </AlertDialogTitle>
            <AlertDialogDescription className="my-4">
              Data yang sudah dihapus tidak bisa dikembalikan
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </nav>
  );
}

export default Actions;
