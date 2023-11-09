import { GetAllPenduduk } from "@/actions/penduduk-actions";
import { DataTable } from "./_components/print-data-table";
import { columns } from "./_components/print-columns";

async function PrintPage() {
  const data = await GetAllPenduduk();
  if (!data) {
    return null;
  }

  return (
    <div className="p-6">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default PrintPage;
