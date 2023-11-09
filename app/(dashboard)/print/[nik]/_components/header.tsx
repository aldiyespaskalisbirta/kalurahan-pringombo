import Image from "next/image";

function Header() {
  return (
    <div className="grid grid-cols-6 w-full border-b-4 border-black mt-8 pb-4">
      <div className="col-span-1 flex items-center justify-center">
        <Image src="/assets/logo.svg" alt="logo" width={180} height={180} />
      </div>
      <div className="col-span-5 flex items-center justify-center flex-col">
        <p className="text-xl tracking-wide leading-6 text-center">
          KABUPATEN GUNUNGKIDUL
          <br />
          KAPANEWON RONGKOP
          <br />
          <span className="font-bold text-xl">
            PEMERINTAH KALURAHAN PRINGOMBO
          </span>
        </p>

        <Image
          src="/assets/aksara.png"
          alt="aksara"
          width={200}
          height={70}
          className="mt-3"
        />
        <div>
          <p className="text-sm tracking-wide leading-4 text-center">
            Alamat: Pakel RT 026 RW 007, Pringombo, Rongkop, Gunungkidul Kode
            Pos 55883
            <br />
            e-mail : desapringombo@gmail.com website :
            desapringombo.gunungkidulkab.go.id
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
