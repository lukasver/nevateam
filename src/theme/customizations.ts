import { SxProps, Theme, keyframes } from '@mui/material';
import { Sora, Overpass, Roboto_Flex } from 'next/font/google';

export const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sora',
});
export const overpass = Overpass({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-overpass',
});

export const roboto = Roboto_Flex({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const PRIMARY_GRADIENT =
  'linear-gradient(140deg, #178097, rgba(23, 128, 151, 0.24))';

export const SECONDARY_GRADIENT =
  'linear-gradient(73.76deg, #131788 2.23%, #131788 2.24%, #178097 118.37%)';

export const ACCENT_GRADIENT =
  'linear-gradient(90deg, #6166EC 1.56%, #67E1FC 100%)';

export const BLACK_GRADIENT =
  'linear-gradient(150deg, #1d2838 35%, rgba(21, 29, 41, 0.75))';

export const CSS_TITLE: SxProps<Theme> = {
  fontFamily: sora.style.fontFamily,
  letterSpacing: '1,4px',
  fontWeight: 600,
  color: ({ palette }) => palette.text.primary,
};

export const CSS_TEXT: SxProps<Theme> = {
  fontFamily: 'Overpass, sans-serif',
  fontWeight: 600,
  color: ({ palette }) => palette.common.text,
};

export const REMOVE_SCROLLBAR = {
  '::-webkit-scrollbar': {
    width: 0,
    background: 'transparent',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: 'transparent',
  },
  '::-moz-scrollbar': {
    width: '0.5em',
    backgroundColor: 'transparent',
  },
  '::-moz-scrollbar-thumb': {
    backgroundColor: 'transparent',
  },
  '::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
};

export const TYPOGRAPHY_VARIANTS = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'body1',
  'body2',
  'subtitle1',
  'subtitle2',
].reduce((agg, variant) => {
  if (variant?.includes('h')) {
    // @ts-expect-error wontifx
    agg[variant] = {
      fontFamily: sora.style.fontFamily,
      fontWeight: 600,
      lineHeight: 1.6,
    };
    return agg;
  }
  if (variant?.includes('body')) {
    // @ts-expect-error wontifx
    agg[variant] = {
      fontFamily: overpass.style.fontFamily,
      color: variant === 'body2' ? '#616d7e' : '#000',
      fontWeight: 400,
      lineHeight: variant === 'body2' ? '176%' : 1.6,
    };
    return agg;
  }
  if (variant?.includes('subtitle')) {
    // @ts-expect-error wontifx
    agg[variant] = {
      fontFamily: sora.style.fontFamily,
      color: '#178097',
      fontWeight: 500,
    };
    return agg;
  }
  // @ts-expect-error wontifx
  agg[variant] = {
    fontFamily: overpass.style.fontFamily,
    color: '#000',
    fontWeight: 400,
    lineHeight: '176%',
  };
  return agg;
}, {});

export const UNDERLINED_LINK = {
  margin: 'unset',
  padding: 'unset',
  overflow: 'hidden',
  display: 'inline-flex',
  cursor: 'pointer',
  position: 'relative' as const,
  marginInline: '1rem',
  '&::after': {
    content: '" "',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '0.1em',
    backgroundColor: '#178097!important',
    transition: 'opacity 400ms, transform 400ms',
    opacity: 1,
    transform: 'translate3d(-100%, 0, 0)',
  },
  '&:hover::after': {
    transform: 'translate3d(0, 0, 0)',
  },
  '&:focus::after': {
    transform: 'translate3d(0, 0, 0)',
  },
};

export const LINE_CLAMP = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: '1',
  WebkitBoxOrient: 'vertical',
};

export const GET_LINE_CLAMP = (lines: number) => ({
  ...LINE_CLAMP,
  WebkitLineClamp: String(lines),
});

const PING_KEYFRAMES = keyframes`
    75%, 100% {
      transform: scale(1.05);
      opacity: 0
    };
`;

const PULSE_KEYFRAMES = keyframes`
    0%, 100% {
      opacity: 1;
    };
    50% {
      opacity: .5;
    };
`;

export const PULSE_ANIMATION = `${PULSE_KEYFRAMES} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`;

export const PING_ANIMATION = `${PING_KEYFRAMES} 1s cubic-bezier(0, 0, 0.2, 1) infinite`;
