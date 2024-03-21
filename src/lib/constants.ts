import { Metadata } from 'next';
import { getAssets } from './utils';

export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export const getDefaultMetadata = (config?: Metadata): Metadata => {
  return {
    icons: {
      icon: '/favicon.ico',
      shortcut: '/icon-192.png',
      apple: '/icon-512.png',
    },
    title: {
      default: 'Nevateam',
      template: `%s | SMAT The Alternative Investment Network`,
    },
    description:
      'Smat is an investment platform that connects deal sponsors with wealth managers, allowing investors to subscribe financial products with low intermediary costs.',
    robots: { index: true, follow: true },
    authors: { name: 'Smat SA' },
    creator: 'Smat SA',
    publisher: 'Smat SA',
    keywords: [
      'wealth management',
      'distribution',
      'finance',
      'alternative investment',
      'investment network',
      'investment community',
      'investment',
      'Nevateam',
    ],
    metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN!),
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      url: process.env.NEXT_PUBLIC_DOMAIN,
      title: 'Nevateam @ Smat',
      description:
        'Smat is a platform connecting real asset owners/sponsors with the first digital community of wealth managers.',
      siteName: 'Nevateam @ Smat',
      images: [
        {
          url: getAssets('v2/smat-og.png'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Nevateam @ Smat',
      description:
        'Smat is a platform connecting real asset owners/sponsors with the first digital community of wealth managers.',
      site: '@smat_io',
      creator: '@lukasver',
      images: getAssets('v2/smat-og.png'),
    },
    ...config,
  };
};
