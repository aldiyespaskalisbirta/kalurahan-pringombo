"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

type Props = {
  nik: string;
  no_surat: string;
};

function Actions({ nik, no_surat }: Props) {
  const router = useRouter();
  return (
    <Link
      href="/print/[nik]/sktm/[no_surat]"
      as={`/print/${nik}/sktm/${no_surat}`}
      prefetch={true}
      className="flex items-center test-sm hover:opacity-75 trasition mb-6"
    >
      <Button variant="ghost" onClick={() => router.refresh()}>
        <IoMdArrowRoundBack className="h-4 w-4 mr-2" />
        Kembali
      </Button>
    </Link>
  );
}

export default Actions;
