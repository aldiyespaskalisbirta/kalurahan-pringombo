import Link from "next/link";

import { BsFileEarmarkPdf } from "react-icons/bs";

import { getPendudukById } from "@/actions/penduduk-actions";
import { decodeData } from "@/lib/encrypt/decode";
import { formatString } from "@/lib/format/format-string";
import { Card } from "@/components/ui/card";

type Props = {
  nik: string;
  no_surat: string;
};
async function ListNoSurat({ nik, no_surat }: Props) {
  const pemilik_surat = await getPendudukById(nik);
  return (
    <Link
      href={`/print/suket-kematian/[nik]/[no_surat]`}
      as={`/print/suket-kematian/${nik}/${no_surat}`}
    >
      <Card className="w-fit p-2 cursor-pointer hover:bg-sky-200/20">
        <div className="w-32 inline-block flex-col items-center justify-center break-words">
          <div className="w-full flex items-center justify-center">
            <BsFileEarmarkPdf className="text-red-600 h-20 w-20" />
          </div>
          <div>
            <h1 className="font-[500] mt-2 text-center truncate">
              {decodeData(no_surat)}
            </h1>
            <p className="line-clamp-1 text-xs text-center">
              {pemilik_surat?.nama ? formatString(pemilik_surat.nama) : "-"}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default ListNoSurat;
