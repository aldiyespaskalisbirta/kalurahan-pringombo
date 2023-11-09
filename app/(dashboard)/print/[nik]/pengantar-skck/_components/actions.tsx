"use client";

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
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

type Props = {
  nik: string;
  no_surat?: string;
};

const formSchema = z.object({
  no_surat: z.string().min(1),
});

function Actions({ nik, no_surat }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      no_surat: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/penduduk/${nik}/sktm`, {
        no_surat: encodeData(values.no_surat),
      });
      router.refresh();
      router.push(`/print/${nik}/sktm/${encodeData(values.no_surat)}/edit`);
      toast.success("Surat berhasil dibuat");
    } catch {
      toast.error("Gagal membuat surat");
    }
  };

  const editPage = pathname?.includes("/edit");
  return (
    <nav className="w-full flex justify-between items-center">
      {!editPage && (
        <>
          <Link href="/print">
            <Button variant="ghost">
              <IoMdArrowRoundBack className="h-4 w-4 mr-2" />
              Kembali
            </Button>
          </Link>
          {!no_surat && (
            <AlertDialog>
              <AlertDialogTrigger className="bg-black text-white p-2 rounded-lg font-[500] px-4">
                Buat surat
              </AlertDialogTrigger>
              <AlertDialogContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Nomor Surat</AlertDialogTitle>
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
      )}
    </nav>
  );
}

export default Actions;
