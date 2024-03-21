import { Box, SxProps } from '@mui/material';
import Image from 'next/image';
import { ComponentProps } from 'react';

interface BackgroundImageProps extends ComponentProps<typeof Image> {
  position?: 'left' | 'right';
  rotate?: boolean;
  sx?: SxProps;
}

export const BackgroundImage = ({
  position = 'right',
  rotate = false,
  sx = {},
  ...rest
}: BackgroundImageProps) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: '0 0 0 0',
        zIndex: -1,
        opacity: 0.6,
        ...(rotate && { transform: 'rotate(180deg)' }),
        '& > span > img': {
          WebkitMaskImage: `-webkit-gradient(linear, ${position} top, ${position} bottom, from(rgba(0,0,0,1) 80&), to(rgba(0,0,0,0)))`,
          maskImage: `linear-gradient(to ${position}, rgba(0,0,0,1) 80%, rgba(0,0,0,0))`,
        },
        ...sx,
      }}
    >
      <Image layout={'fill'} priority {...rest} />
    </Box>
  );
};
