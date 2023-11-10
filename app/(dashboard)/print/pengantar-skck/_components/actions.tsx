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
  nik: z.string().min(1),
  no_surat: z.string().min(1),
  keperluan: z.string().min(1),
});

function Actions() {
  const router = useRouter();
  const pathname = usePathname();

  const isSuratPage = pathname.split("/").length > 3;
  const isSuratIdPage = pathname.split("/").length === 5;
  const nik = isSuratIdPage && pathname.split("/").at(-2);
  const back = pathname.split("/").slice(0, -1).join("/");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nik: nik ? decodeData(nik) : "",
      no_surat: "",
      keperluan: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/print/pengantar-skck`, {
        pendudukId: encodeData(values.nik),
        no_surat: encodeData(values.no_surat),
        keperluan: values.keperluan.toUpperCase(),
      });
      router.refresh();
      router.push(
        `/print/pengantar-skck/${encodeData(values.nik)}/${encodeData(
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
        <Link href={isSuratIdPage ? "/print/pengantar-skck" : `${back}`}>
          <Button variant="ghost">
            <IoMdArrowRoundBack className="h-4 w-4 mr-2" />
            Kembali
          </Button>
        </Link>
        {!isSuratPage && (
          <AlertDialog>
            <AlertDialogTrigger
              className="bg-black text-white p-2 rounded-lg font-[500] px-4"
              onClick={() => router.refresh()}
            >
              Buat Suart
            </AlertDialogTrigger>
            <AlertDialogContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">
                      Buat Pengantar SKCK
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
                    <FormLabel className="text-start">NIK</FormLabel>
                    <FormField
                      control={form.control}
                      name="nik"
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
                    <FormLabel className="text-start">Keperluan</FormLabel>
                    <FormField
                      control={form.control}
                      name="keperluan"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="mb-5"
                              disabled={isSubmitting}
                              placeholder="Tambahkan Keperluan"
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
