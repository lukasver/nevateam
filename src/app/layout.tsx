import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { Toaster } from 'sonner';
import HomeLayout from '@/components/home-layout';
import { getDefaultMetadata } from '@/lib/constants';

import './globals.css';
import themes from '@/theme';
import { BackgroundImage } from '@/components/background-image';
import { getAssets } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Nevateam | SMAT The Alternative Investment Network',
  ...getDefaultMetadata(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <AppRouterCacheProvider>
        <ThemeProvider theme={themes}>
          <body style={{ position: 'relative' }}>
            <HomeLayout>{children}</HomeLayout>
            <Toaster position='top-right' />
            <BackgroundImage alt={'bg'} src={getAssets('v2/SMAT_05.webp')} />
          </body>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
