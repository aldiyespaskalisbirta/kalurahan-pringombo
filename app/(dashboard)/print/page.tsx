import { GetAllPenduduk } from "@/actions/penduduk-actions";
import { DataTable } from "./_components/print-data-table";
import { columns } from "./_components/print-columns";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function PrintPage() {
  const data = await GetAllPenduduk();
  if (!data) {
    return null;
  }

  return (
    <div className="p-6">
      <div className="flex flex-wrap gap-4">
        <Link href="/print/suket-usaha">
          <Button>SUKET USAHA</Button>
        </Link>
        <Link href="/print/suket-kematian">
          <Button>SUKET KEMATIAN</Button>
        </Link>
        <Link href="/print/sktm">
          <Button>SKTM</Button>
        </Link>
        <Link href="/print/pengantar-skck">
          <Button>PENGANTAR SKCK</Button>
        </Link>
        <Link href="/print/ijin-keramaian">
          <Button>IZIN KERAMAIAN</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default PrintPage;
