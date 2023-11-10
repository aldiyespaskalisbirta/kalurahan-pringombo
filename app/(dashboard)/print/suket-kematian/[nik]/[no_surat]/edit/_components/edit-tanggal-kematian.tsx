"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

import { CalendarIcon, Pencil } from "lucide-react";

import { formatDateString } from "@/lib/format/format-date-string";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DateFormatter } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { getYear } from "date-fns";
import { SuketKematian } from "@prisma/client";

interface Props {
  initialData: SuketKematian;
  nik: string;
}

const formSchema = z.object({
  tanggal_kematian: z.date(),
});

export const EditTanggalKematian = ({ initialData, nik }: Props) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tanggal_kematian: initialData.tanggal_kematian!,
    },
  });

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
      await axios.patch(
        `/api/print/suket-kematian/${initialData.no_surat}`,
        values
      );
      toast.success("Berhasil diubah");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Gagal mengedit");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Tanggal Kematian
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Batal</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.tanggal_kematian && "text-slate-500 italic"
          )}
        >
          {!initialData.tanggal_kematian
            ? "Tidak diketahui"
            : formatDateString(initialData.tanggal_kematian.toString())}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
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
            <Button type="submit">Simpan</Button>
          </form>
        </Form>
      )}
    </div>
  );
};
