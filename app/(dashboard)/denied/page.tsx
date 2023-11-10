"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

function AccessDenied() {
  const session = useSession();
  if (session.status === "authenticated") return redirect("/");
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-slate-300">
      <h1 className="z-50 text-white font-bold text-xl md:text-6xl drop-shadow-xl text-center px-4">
        MAAF, ANDA TIDAK MEMILIKI AKSES UNTUK MELIHAT SITUS INI
      </h1>
      <div className="absolute w-full h-full blur-sm flex items-center justify-center">
        <Image src="/assets/logo.svg" alt="denied" width={300} height={300} />
      </div>

      <Link href="/" className="cursor-pointer z-50">
        <Button
          variant="link"
          className="text-white font-bold text-xl md:text-6xl drop-shadow-xl text-center px-4"
        >
          <IoMdArrowRoundBack className="h-4 w-4 mr-2" />
          Kembali ke halaman utama
        </Button>
      </Link>
    </div>
  );
}

export default AccessDenied;
