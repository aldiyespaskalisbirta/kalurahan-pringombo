"use client";

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

import { Pencil } from "lucide-react";

import { Individu } from "@/types/penduduk";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  initialData: Individu;
  nik: string;
}

const formSchema = z.object({
  pendidikan_sdt: z.string().min(1),
});

export const EditPendidikanSdt = ({ initialData, nik }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pendidikan_sdt: initialData.pendidikan_sdt || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formatString = values.pendidikan_sdt.toUpperCase();
      await axios.patch(`/api/penduduk/${nik}`, {
        pendidikan_sdt: formatString,
      });
      toast.success("Pendidikan SDT berhasil diubah");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Gagal mengedit");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Pendidikan Sedang di Tempuh
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
            !initialData.pendidikan_sdt && "text-slate-500 italic"
          )}
        >
          {!initialData.pendidikan_sdt
            ? "Tidak diketahui"
            : initialData.pendidikan_sdt}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="pendidikan_sdt"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Pendidikan SDT" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="TIDAK / BELUM SEKOLAH">
                        TIDAK / BELUM SEKOLAH
                      </SelectItem>
                      <SelectItem value="BELUM TAMAT SD/SEDERAJAT">
                        BELUM TAMAT SD/SEDERAJAT
                      </SelectItem>
                      <SelectItem value="TAMAT SD / SEDERAJAT">
                        TAMAT SD / SEDERAJAT
                      </SelectItem>
                      <SelectItem value="SLTP/SEDERAJAT">
                        SLTP/SEDERAJAT
                      </SelectItem>
                      <SelectItem value="SLTA / SEDERAJAT">
                        SLTA / SEDERAJAT
                      </SelectItem>
                      <SelectItem value="DIPLOMA I / II">
                        DIPLOMA I / II
                      </SelectItem>
                      <SelectItem value="AKADEMI/ DIPLOMA III/S. MUDA">
                        AKADEMI/ DIPLOMA III/S. MUDA
                      </SelectItem>
                      <SelectItem value="DIPLOMA IV/ STRATA I">
                        DIPLOMA IV/ STRATA I
                      </SelectItem>
                      <SelectItem value="STRATA II">STRATA II</SelectItem>
                      <SelectItem value="STRATA III">STRATA III</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Simpan
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
