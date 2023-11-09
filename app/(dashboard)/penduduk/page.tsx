import { DataTable } from "./_components/penduduk-data-table";
import { columns } from "./_components/penduduk-columns";

import { GetAllPenduduk } from "@/actions/penduduk-actions";

async function PendudukPage() {
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

export default PendudukPage;
