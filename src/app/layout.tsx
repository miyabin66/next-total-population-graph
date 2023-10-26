import { Noto_Sans_JP } from 'next/font/google';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@/styles/globals.scss';

const inter = Noto_Sans_JP({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
