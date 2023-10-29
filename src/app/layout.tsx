import { TITLE } from '@/constants';
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
  title: TITLE,
  description: '都道府県の人口推移が分かるグラフです',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
