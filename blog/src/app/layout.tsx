import { Open_Sans } from 'next/font/google';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import './globals.css';

const sans = Open_Sans({
  subsets: ['latin'],
});

export const metadata = {
  title: {
    default: `DongHun's Blog`,
    template: `DongHun's Blog | %s`,
  },
  description: '프론트엔드 엔지니어 DongHun, Kim의 블로그',
  icons: '/favicon.ico',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="sans.className">
      <body className="mx-auto flex w-full max-w-screen-2xl flex-col">
        <Header />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
