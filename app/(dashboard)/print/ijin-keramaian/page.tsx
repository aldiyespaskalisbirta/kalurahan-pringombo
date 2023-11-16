import {
  createIzinKeramaian,
  getAllIzinKeramaian,
} from "@/actions/izin-keramaian/izin-keramaian-actions";
import { GetAllPenduduk } from "@/actions/penduduk-actions";

async function IzinKeramaianPage() {
  const surat = await createIzinKeramaian(
    "MzM3MjA1MjMwODc3MDAxMA==",
    "SURAT IZIN KERAMAIAN 3"
  );

  const get_all_izin_keramaian = await getAllIzinKeramaian();

  console.log("[SURAT_IZIN_KERAMAIAN]", get_all_izin_keramaian);
  return (
    <div>
      {get_all_izin_keramaian?.map((item) => (
        <p key={item.no_surat}>
          {item.penduduk.map((is) => (
            <span key={is.pendudukId}>{is.izinKeramaianId}</span>
          ))}
        </p>
      ))}
    </div>
  );
}

export default IzinKeramaianPage;
