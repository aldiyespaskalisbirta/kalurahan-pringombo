import Image from "next/image";
import React from "react";

function AccessDenied() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-300">
      <h1 className="z-50 text-white font-bold text-xl md:text-6xl drop-shadow-xl text-center px-4">
        MAAF, ANDA TIDAK MEMILIKI AKSES UNTUK MELIHAT SITUS INI
      </h1>
      <div className="absolute w-full h-full blur-sm flex items-center justify-center">
        <Image src="/assets/logo.svg" alt="denied" width={300} height={300} />
      </div>
    </div>
  );
}

export default AccessDenied;
