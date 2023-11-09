import Image from "next/image";

import LoginForm from "./_components/login-form";

export default async function LoginPage() {
  return (
    <section className="bg-gray-700 min-h-screen flex items-center justify-center w-full">
      <main className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Masuk</h2>
          <p className="text-xs mt-4 text-[#002D74]">
            Selamat Datang Di Kalurahan Pringombo
          </p>

          <LoginForm />

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400"></div>
        </div>

        <div className="md:block hidden w-1/2">
          <Image
            className="rounded-2xl"
            src="/assets/logo.svg"
            alt="Login Image"
            width={800}
            height={600}
          />
        </div>
      </main>
    </section>
  );
}
