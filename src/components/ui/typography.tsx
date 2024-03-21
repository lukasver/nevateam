import { sora } from '@/theme/customizations';
import { Typography, TypographyProps } from '@mui/material';

export const Title = ({
  children,
  sx = {},
  align = 'center',
  ...props
}: TypographyProps<'h5'>) => {
  return (
    <Typography
      component={'h3'}
      sx={{
        fontSize: 'clamp(1.25rem, 1.5vw + 1rem, 1.5rem)',
        textAlign: { xs: 'center', md: 'left' },
        fontWeight: 'bold',
        fontFamily: sora.style.fontFamily,
        ...sx,
      }}
      align={align}
      {...props}
    >
      {children}
    </Typography>
  );
};

export const Subtitle = ({
  children,
  sx = {},
  align = 'center',
  ...props
}: TypographyProps) => {
  return (
    <Typography
      variant={'subtitle1'}
      align={align}
      sx={{
        fontSize: 'clamp(1rem, 1vw + 1rem, 1.15rem)',
        textAlign: 'left',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

export const Paragraph = ({ children, sx = {}, ...props }: TypographyProps) => {
  return (
    <Typography
      variant={'body1'}
      sx={{
        fontSize: 'clamp(0.75rem, 0.5vw + 1rem, 1rem)',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

export const SubNotContent = ({
  children,
  sx = {},
  align = 'left',
  ...props
}: TypographyProps) => {
  return (
    <Typography
      variant='body2'
      sx={{ fontSize: '16px', ...sx }}
      align={align}
      {...props}
    >
      {children}
    </Typography>
  );
};
