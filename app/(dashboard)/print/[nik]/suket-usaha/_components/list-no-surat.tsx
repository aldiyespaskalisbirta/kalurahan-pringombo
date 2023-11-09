"use client";

import Link from "next/link";

import { decodeData } from "@/lib/encrypt/decode";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  nik: string;
  no_surat: string;
};
function ListNoSurat({ nik, no_surat }: Props) {
  const pathname = usePathname();

  const isSelected =
    pathname.split("/")[pathname.split("/").length - 1] === no_surat;
  return (
    <div>
      <Link
        href={`/print/[nik]/suket-usaha/[no_surat]`}
        as={`/print/${nik}/suket-usaha/${no_surat}`}
      >
        <Button
          variant="ghost"
          className={cn(
            "border-2 border-slate-400 rounded-full px-2 md:px-8 font-semibold text-slate-500 hover:border-sky-700 hover:text-sky-700",
            isSelected && "border-sky-700 text-sky-700"
          )}
        >
          {decodeData(no_surat)}
        </Button>
      </Link>
    </div>
  );
}

export default ListNoSurat;
