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
  usaha_sampingan: z.string().min(1),
  di_kalurahan: z.string().min(1),
  di_kapenawon: z.string().min(1),
  di_kabupaten: z.string().min(1),
  no_surat: z.string().min(1),
});

function Actions() {
  const router = useRouter();
  const pathname = usePathname();

  const isSuratIdPage = pathname.split("/").length === 5;
  const isEditPage = pathname.includes("/edit");
  const nik = isSuratIdPage && pathname.split("/").at(-2);
  const back = pathname.split("/").slice(0, -1).join("/");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nik: nik ? decodeData(nik) : "",
      usaha_sampingan: "",
      di_kalurahan: "",
      di_kapenawon: "",
      di_kabupaten: "",
      no_surat: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/print/suket-usaha`, {
        pendudukId: encodeData(values.nik),
        usaha_sampingan: values.usaha_sampingan,
        di_kalurahan: values.di_kalurahan,
        di_kapenawon: values.di_kapenawon,
        di_kabupaten: values.di_kabupaten,
        no_surat: encodeData(values.no_surat),
      });
      router.refresh();
      router.push(
        `/print/suket-usaha/${encodeData(values.nik)}/${encodeData(
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
        <Link href={isSuratIdPage ? "/print/suket-usaha" : `${back}`}>
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
              Buat Suart
            </AlertDialogTrigger>
            <AlertDialogContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">
                      Buat Suket Usaha
                    </AlertDialogTitle>
                    <FormLabel className="text-start">NIK</FormLabel>
                    <FormField
                      control={form.control}
                      name="nik"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="mb-5"
                              disabled={isSubmitting || nik != false}
                              placeholder="34**************"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                    <FormLabel className="text-start">
                      Usaha Sampingan
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name="usaha_sampingan"
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
                    <FormLabel className="text-start">Di Kalurahan</FormLabel>
                    <FormField
                      control={form.control}
                      name="di_kalurahan"
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
                    <FormLabel className="text-start">Di Kapenawon</FormLabel>
                    <FormField
                      control={form.control}
                      name="di_kapenawon"
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
                    <FormLabel className="text-start">Di Kabupaten</FormLabel>
                    <FormField
                      control={form.control}
                      name="di_kabupaten"
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
