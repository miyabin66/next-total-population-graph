import '@/styles/globals.scss';
import { TITLE } from '@/constants';
import { BASE_URL } from '@/env';
import { Noto_Sans_JP } from 'next/font/google';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const inter = Noto_Sans_JP({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const DESCRIPTION = '都道府県の人口推移が分かるグラフです';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL || ''),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    url: BASE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: TITLE,
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
