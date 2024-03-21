import { SxProps, styled } from '@mui/material/styles';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { Box, Typography } from '@mui/material';

export const PercentBar = ({
  value = 0,
  textValue,
  caption,
  render = true,
  sx = {},
}: {
  value?: number;
  textValue: string | number | null;
  caption: string;
  render?: boolean;
  sx?: SxProps;
}) => {
  if (value === undefined || value === null || !render) return null;
  return (
    <Box sx={{ flexGrow: 1, position: 'relative' }}>
      <BorderLinearProgress variant='determinate' value={value} />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          sx={{
            color: ({ palette }) =>
              palette.mode === 'dark'
                ? palette.common.lightGray
                : palette.common.black,
            textAlign: 'right',
            display: 'block',
            fontWeight: 'bold',
            ...sx,
          }}
          variant={'caption'}
        >
          {textValue}
        </Typography>
        <Typography
          sx={{
            color: ({ palette }) =>
              palette.mode === 'dark'
                ? palette.common.lightGray
                : palette.common.black,
            ...sx,
          }}
          variant={'caption'}
          align={'right'}
        >
          {caption ?? 'Hard Cap'}
        </Typography>
      </Box>
    </Box>
  );
};

const BorderLinearProgress = styled(LinearProgress)(
  ({ theme: { palette } }) => ({
    height: 7,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        palette.mode === 'light'
          ? palette.common.lightGray
          : palette.common.white,
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      //@ts-expect-error wontfix
      backgroundColor: palette.accent.secondary,
    },
  })
);
