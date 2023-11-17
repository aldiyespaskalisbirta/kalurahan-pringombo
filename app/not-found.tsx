import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-screen h-screen flex flex-col lg:flex-row items-center justify-center gap-4">
      <div className="relative w-96 h-96 z-50">
        <Image src="/assets/logo.svg" fill alt="logo" />
      </div>
      <div className="flex flex-col text-center lg:text-start">
        <h2 className="font-semibold text-3xl">Not Found</h2>
        <p className="text-gray-500 font-light">
          Halaman yang Anda cari tidak ditemukan
        </p>
        <Link href="/" className="mt-4">
          <Button>Kembali ke halaman utama</Button>
        </Link>
      </div>
    </main>
  );
}
