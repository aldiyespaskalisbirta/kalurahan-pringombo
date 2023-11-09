"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { formatString } from "@/lib/format/format-string";
import { Button } from "./ui/button";

function NavbarRoutes() {
  const pathname = usePathname();
  const { status, data } = useSession();

  const statistikPage = pathname?.startsWith("/statistik");
  const pendudukPage = pathname?.startsWith("/penduduk");
  const printPage = pathname?.startsWith("/print");
  const deniedPage = pathname?.startsWith("/denied");
  return (
    <>
      {statistikPage && (
        <div className="hidden md:block">
          <h1 className="text-3xl font-semibold">
            Data <span className="text-sky-700">Statistik</span>
          </h1>
        </div>
      )}
      {pendudukPage && (
        <div className="hidden md:block">
          <h1 className="text-3xl font-semibold">
            Data <span className="text-sky-700">Penduduk</span>
          </h1>
        </div>
      )}
      {printPage && (
        <div className="hidden md:block">
          <h1 className="text-3xl font-semibold">
            <span className="text-sky-700">Print</span> Data Penduduk
          </h1>
        </div>
      )}
      {deniedPage && (
        <div className="hidden md:block">
          <h1 className="text-3xl font-semibold">
            Acsess <span className="text-sky-700">Denied</span>
          </h1>
        </div>
      )}

      <div className="flex gap-x-2 ml-auto">
        {status === "authenticated" ? (
          <div className="flex items-center gap-x-2 ml-auto">
            <h1 className="font-semibold text-2xl">
              Hi, {data.user?.name && formatString(data.user?.name)}
            </h1>
            <Button
              onClick={() => signOut()}
              className="border-2 rounded-xl"
              variant="ghost"
            >
              <BiLogOut className="h-4 w-4 mr-2" />
              Keluar
            </Button>
          </div>
        ) : (
          <Link href="/login">
            <Button variant="ghost" className="border-2 rounded-xl">
              <BiLogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          </Link>
        )}
      </div>
    </>
  );
}

export default NavbarRoutes;
