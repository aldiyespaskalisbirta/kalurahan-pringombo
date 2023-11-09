import { prisma } from "@/lib/prisma";

import DataCard from "./_components/data-card";

export default async function Dashboard() {
  const positionsToFind = [
    "LURAH",
    "CARIK",
    "JAGABAYA",
    "ULU ULU",
    "KAMITUA",
    "KAUR TATA LAKSANA",
    "KAUR DANARTA",
    "KAUR PANGRIPTO",
  ];

  const findPosition = (position: string) => {
    return prisma.penduduk.findFirst({
      where: {
        jabatan_di_kalurahan: position,
      },
    });
  };

  const searchResults = await Promise.all(positionsToFind.map(findPosition));

  const [
    lurah,
    carik,
    jagabaya,
    ulu_ulu,
    kamitua,
    kaur_tata_laksana,
    kaur_danarta,
    kaur_pangripto,
  ] = searchResults;
  return (
    <section className="p-6 grid gird-cols-1 md:grid-cols-2 h-full">
      <div className="flex flex-col gap-6 p-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="font-semibold text-4xl">VISI</h1>
          <p className="text-center">
            Mewujudkan desa Pringombo yang sehat, cerdas, maju mandiri,
            bermartabat dan berbudaya.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="font-semibold text-4xl">MISI</h1>
          <ul className="flex flex-col items-center space-y-4">
            <li className="flex relative">
              <div className="h-2 w-2 absolute top-2 bg-black rounded-full" />
              <p className="ml-4 text-justify">
                Mewujudkan tata pemerintahan yang baik, demokratis dan
                bertanggungjawab sejalan dengan peningkatan profesionalisme dan
                kinerja aparatur desa kemudian
              </p>
            </li>
            <li className="flex relative">
              <div className="h-2 w-2 absolute top-2 bg-black rounded-full" />
              <p className="ml-4 text-justify">
                Mewujudkan kualitas sumber daya manusia yang sehat dan cerdas
                serta mampu mendukung eksistensi pembangunan desa
              </p>
            </li>
            <li className="flex relative">
              <div className="h-2 w-2 absolute top-2 bg-black rounded-full" />
              <p className="ml-4 text-justify">
                Mewujudkan perekonomian desa yang berbasis pada ekonomi
                kerakyatan dan potensi unggulan desa
              </p>
            </li>
            <li className="flex relative">
              <div className="h-2 w-2 top-2 absolute bg-black rounded-full" />
              <p className="ml-4 text-justify">
                Mewujudkan kualitas dan kuantitas prasarana dan sarana
                infrasutruktur desa yang menunjang pengembangan wilayah,
                penyediaan pelayanan sosial dasar dan pertumbuhan ekonomi desa,
                serta
              </p>
            </li>
            <li className="flex relative">
              <div className="h-2 w-2 absolute top-2 bg-black rounded-full" />
              <p className="ml-4 text-justify">
                Mewujudkan kehidupan masyarakat yang aman dan damai didukung
                oleh penegakkan supremasi hukum.
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-6 p-4 md:overflow-auto">
        <h1 className="font-semibold text-4xl text-center">Perangkat Desa</h1>
        <div className="grid gap-2 grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
          <DataCard
            image="./assets/logo.svg"
            nama={lurah?.nama}
            jabatan="Lurah"
          />
          <DataCard
            image="./assets/logo.svg"
            nama={carik?.nama}
            jabatan="Carik"
          />
          <DataCard
            image="./assets/logo.svg"
            nama={jagabaya?.nama}
            jabatan="Jagabaya"
          />
          <DataCard
            image="./assets/logo.svg"
            nama={ulu_ulu?.nama}
            jabatan="Ulu Ulu"
          />
          <DataCard
            image="./assets/logo.svg"
            nama={kamitua?.nama}
            jabatan="Kamitua"
          />
          <DataCard
            image="./assets/logo.svg"
            nama={kaur_tata_laksana?.nama}
            jabatan="Kaur Tata laksana"
          />
          <DataCard
            image="./assets/logo.svg"
            nama={kaur_danarta?.nama}
            jabatan="Kaur Danarta"
          />
          <DataCard
            image="./assets/logo.svg"
            nama={kaur_pangripto?.nama}
            jabatan="Kaur Pangripto"
          />
        </div>
      </div>
    </section>
  );
}
