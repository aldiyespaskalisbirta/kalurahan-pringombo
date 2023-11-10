"use client";

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { usePathname, useRouter } from "next/navigation";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { encodeData } from "@/lib/encrypt/encode";
import toast from "react-hot-toast";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { decodeData } from "@/lib/encrypt/decode";

const formSchema = z.object({
  no_surat: z.string().min(1),
  nik_ortu: z.string().min(1),
  nik_anak: z.string().min(1),
  nama_instansi: z.string().min(1),
  fakultas_prodi: z.string(),
  kelas_semester: z.coerce.number().min(1),
});

function Actions() {
  const router = useRouter();
  const pathname = usePathname();

  const isSuratIdPage = pathname.split("/").length === 5;
  const isEditPage = pathname.includes("/edit");
  const nik_ortu = isSuratIdPage && pathname.split("/").at(-2);
  const back = pathname.split("/").slice(0, -1).join("/");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      no_surat: "",
      nik_ortu: nik_ortu ? decodeData(nik_ortu) : "",
      nik_anak: "",
      nama_instansi: "",
      fakultas_prodi: "",
      kelas_semester: undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/print/sktm`, {
        nik_ortu: encodeData(values.nik_ortu),
        nik_anak: encodeData(values.nik_anak),
        nama_instansi: values.nama_instansi,
        fakultas_prodi: values.fakultas_prodi || "",
        kelas_semester: values.kelas_semester,
        no_surat: encodeData(values.no_surat),
      });
      router.refresh();
      router.push(
        `/print/sktm/${encodeData(values.nik_ortu)}/${encodeData(
          values.no_surat
        )}`
      );
      toast.success("Surat berhasil dibuat");
    } catch (err: any) {
      toast.error(err.response.data);
    }
  };

  return (
    <nav className="w-full flex justify-between items-center">
      <>
        <Link href={isSuratIdPage ? "/print/sktm" : `${back}`}>
          <Button variant="ghost">
            <IoMdArrowRoundBack className="h-4 w-4 mr-2" />
            Kembali
          </Button>
        </Link>
        {!isEditPage && (
          <AlertDialog>
            <AlertDialogTrigger
              className="bg-black text-white p-2 rounded-lg font-[500] px-4"
              onClick={() => router.refresh()}
            >
              Buat Surat
            </AlertDialogTrigger>
            <AlertDialogContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">
                      Buat SKTM
                    </AlertDialogTitle>
                    <FormLabel className="text-start">Nomor Surat</FormLabel>
                    <FormField
                      control={form.control}
                      name="no_surat"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="mb-5"
                              disabled={isSubmitting}
                              placeholder="012/Reg/Test/2023"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormLabel className="text-start">NIK Orangtua</FormLabel>
                    <FormField
                      control={form.control}
                      name="nik_ortu"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="mb-5"
                              disabled={isSubmitting || nik_ortu != false}
                              placeholder="34**************"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormLabel className="text-start">NIK Anak</FormLabel>
                    <FormField
                      control={form.control}
                      name="nik_anak"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="mb-5"
                              disabled={isSubmitting}
                              placeholder="34**************"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormLabel className="text-start">Nama Instansi</FormLabel>
                    <FormField
                      control={form.control}
                      name="nama_instansi"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="mb-5"
                              disabled={isSubmitting}
                              placeholder="Nama sekolah / univ"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormLabel className="text-start">Fakultas/Prodi</FormLabel>
                    <FormField
                      control={form.control}
                      name="fakultas_prodi"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="mb-5"
                              disabled={isSubmitting}
                              placeholder="Fakultas/Prodi (jika ada)"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormLabel className="text-start">Kelas/Semester</FormLabel>
                    <FormField
                      control={form.control}
                      name="kelas_semester"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="mb-5"
                              disabled={isSubmitting}
                              placeholder="Kelas/Semester"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction
                      type="submit"
                      disabled={!isValid || isSubmitting}
                    >
                      Buat surat
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </form>
              </Form>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </>
    </nav>
  );
}

export default Actions;
