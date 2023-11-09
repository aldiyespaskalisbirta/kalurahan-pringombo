"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { Penduduk } from "@prisma/client";

import { ArrowUpDown, FileText, MoreHorizontal } from "lucide-react";

import { decodeData } from "@/lib/encrypt/decode";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Penduduk>[] = [
  {
    accessorKey: "nik",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          NIK
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const decodeNik = decodeData(row.getValue("nik"));
      return <div className="font-medium">{decodeNik}</div>;
    },
  },
  {
    accessorKey: "nama",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "padukuhan",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Padukuhan
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "rt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          RT
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "rw",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          RW
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const { nik } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/print/${nik}/suket-usaha`}>
              <DropdownMenuItem>
                <FileText className="h-4 w-4 mr-2" />
                Suket Usaha
              </DropdownMenuItem>
            </Link>
            <Link href={``}>
              <DropdownMenuItem disabled>
                <FileText className="h-4 w-4 mr-2" />
                Suket Beda Nama
              </DropdownMenuItem>
            </Link>
            <Link href={``}>
              <DropdownMenuItem disabled>
                <FileText className="h-4 w-4 mr-2" />
                Suket Beda Nama - Sertif Tanah
              </DropdownMenuItem>
            </Link>
            <Link href={`/print/${nik}/suket-kematian`}>
              <DropdownMenuItem>
                <FileText className="h-4 w-4 mr-2" />
                Suket Kematian
              </DropdownMenuItem>
            </Link>
            <Link href={`/print/${nik}/sktm`}>
              <DropdownMenuItem>
                <FileText className="h-4 w-4 mr-2" />
                Suket Tidak Mampu
              </DropdownMenuItem>
            </Link>
            <Link href={``}>
              <DropdownMenuItem disabled>
                <FileText className="h-4 w-4 mr-2" />
                Suket Tidak Mampu - BPJS
              </DropdownMenuItem>
            </Link>
            <Link href={``}>
              <DropdownMenuItem disabled>
                <FileText className="h-4 w-4 mr-2" />
                Perubahan Data Penduduk
              </DropdownMenuItem>
            </Link>
            <Link href={``}>
              <DropdownMenuItem disabled>
                <FileText className="h-4 w-4 mr-2" />
                Rekomendasi Kepesertaan
              </DropdownMenuItem>
            </Link>
            <Link href={``}>
              <DropdownMenuItem disabled>
                <FileText className="h-4 w-4 mr-2" />
                Surat Pernyataan Miskin
              </DropdownMenuItem>
            </Link>
            <Link href={`/print/${nik}/pengantar-skck`}>
              <DropdownMenuItem>
                <FileText className="h-4 w-4 mr-2" />
                Surat Pengantar SKCK
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
