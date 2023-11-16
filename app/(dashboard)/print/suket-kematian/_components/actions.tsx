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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDateString } from "@/lib/format/format-date-string";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getYear } from "date-fns";
import { DateFormatter } from "react-day-picker";

const formSchema = z.object({
  nik: z.string().min(1),
  no_surat: z.string().min(1),
  lokasi_meninggal: z.string().min(1),
  tanggal_kematian: z.date(),
  anak_ke: z.coerce.number().min(1),
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
      lokasi_meninggal: "",
      tanggal_kematian: new Date(),
      anak_ke: undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const getMonth = (month: Date): string => {
    const monthNumber = month.getMonth();
    if (monthNumber === 0) return "Januari";
    if (monthNumber === 1) return "Februari";
    if (monthNumber === 2) return "Maret";
    if (monthNumber === 3) return "April";
    if (monthNumber === 4) return "Mei";
    if (monthNumber === 5) return "Juni";
    if (monthNumber === 6) return "Juli";
    if (monthNumber === 7) return "Agustus";
    if (monthNumber === 8) return "Sepetember";
    if (monthNumber === 9) return "Oktober";
    if (monthNumber === 10) return "November";
    else return "Desember";
  };

  const formatCaption: DateFormatter = (this_date) => {
    const get_month = getMonth(this_date);
    const get_year = getYear(this_date);
    return (
      <>
        <span aria-label={get_month}>{get_month}</span>{" "}
        <span className="ml-2">{get_year}</span>
      </>
    );
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/print/suket-kematian`, {
        pendudukId: encodeData(values.nik),
        no_surat: encodeData(values.no_surat),
        lokasi_meninggal: values.lokasi_meninggal.toUpperCase(),
        tanggal_kematian: values.tanggal_kematian,
        anak_ke: values.anak_ke,
      });
      router.refresh();
      router.push(
        `/print/suket-kematian/${encodeData(values.nik)}/${encodeData(
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
        <Link href={isSuratIdPage ? "/print/suket-kematian" : `${back}`}>
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
                      Buat Suket Usaha
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
                    <FormLabel className="text-start">
                      Lokasi Meninggal
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name="lokasi_meninggal"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="mb-5"
                              disabled={isSubmitting}
                              placeholder="Lokasi meninggal"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormLabel className="text-start">
                      Tanggal Kematian
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name="tanggal_kematian"
                      render={({ field }) => (
                        <FormItem>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    formatDateString(field.value.toString())
                                  ) : (
                                    <span>Pilih tanggal</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                                defaultMonth={new Date(field.value)}
                                formatters={{ formatCaption }}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormLabel className="text-start">Anak Ke</FormLabel>
                    <FormField
                      control={form.control}
                      name="anak_ke"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              className="mb-5"
                              disabled={isSubmitting}
                              placeholder="Anak ke"
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
