import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthContext from "@/contexts/AuthContext";
import SWRConfigContext from "@/contexts/SWRConfigContext";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Instagram",
  description: "Instagram clone built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={openSans.className}>
      <body className="w-full overflow-auto bg-neutral-50">
        <AuthContext>
          <header className="sticky top-0 z-10 border-b bg-white">
            <div className="mx-auto max-w-screen-xl">
              <Navbar />
            </div>
          </header>
          <main className="mx-auto flex w-full max-w-screen-xl justify-center">
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
        <div id="portal" />
      </body>
    </html>
  );
}
