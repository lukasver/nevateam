import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { Toaster } from 'sonner';
import HomeLayout from '@/components/home-layout';
import { getDefaultMetadata } from '@/lib/constants';

import './globals.css';
import themes from '@/theme';

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
          <body>
            <HomeLayout>{children}</HomeLayout>
            <Toaster position='top-right' />
          </body>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
