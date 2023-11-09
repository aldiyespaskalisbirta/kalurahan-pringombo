
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AuthProvider from "@/components/context/auth-provider";
import { ToastProvider } from "@/components/context/toaster-provider";

const poppins = Poppins({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kalurahan Pringombo",
  description: "CREATE BY STUDENTS IN SANATA DHARMA UNIVERSITY",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider session={session}>
          <ToastProvider />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
