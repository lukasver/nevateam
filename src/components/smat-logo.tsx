import { getAssets } from '@/lib/utils';
import { Box, SxProps } from '@mui/material';
import Image from 'next/image';
import { ComponentProps, SyntheticEvent, forwardRef } from 'react';

interface LogoProps {
  black?: boolean;
  sx?: SxProps;
  onClick?: (e?: SyntheticEvent<HTMLDivElement>) => void;
  href?: string;
  anchorProps?: Partial<ComponentProps<'a'>>;
}

export const SmatLogo = forwardRef(function Logo(
  { black = true, sx = {}, onClick, href }: LogoProps,
  ref
) {
  const props = {
    src: getAssets(black ? 'v2/v2-logo-tp.webp' : 'v2/v2-logo.webp'),
  };
  const handleLogoClick = (e: SyntheticEvent<HTMLDivElement>) => {
    onClick?.(e);
  };
  return (
    <Box
      onClick={handleLogoClick}
      component={'a'}
      ref={ref}
      sx={{
        width: { xs: '12rem', md: '24rem' },
        height: { xs: '6rem', md: '9rem' },
        ...sx,
      }}
      {...(href && { href })}
    >
      <Image
        alt='Smat logo'
        priority
        {...props}
        placeholder={undefined}
        layout='fixed'
        height={48}
        width={160}
      />
    </Box>
  );
});
