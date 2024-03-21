import { Box, Button } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

export const ShowTeaserButton: React.FC<{
  show?: boolean;
  onClick?: () => void;
  isMobile?: boolean;
}> = ({ show, onClick, isMobile }) => {
  if (isMobile) {
    return (
      <Box sx={{ margin: '0.5rem auto' }}>
        <Button
          variant={'contained'}
          color={'primary'}
          sx={{ display: 'flex', gap: '.5rem' }}
          fullWidth
          onClick={onClick}
        >
          <DescriptionOutlinedIcon />
          Show teaser
        </Button>
      </Box>
    );
  }

  return (
    <Box
      onClick={onClick}
      sx={{
        height: '3rem',
        position: 'absolute',
        right: '2rem',
        bottom: '2rem',
      }}
    >
      <Box
        sx={{
          display: 'inline-flex',
          visibility: show ? 'initial' : 'hidden',
          opacity: show ? 1 : 0,
          transition: 'visibility 0s, opacity 0.5s',
          color: 'primary.main',
          marginTop: '-10px !important',
        }}
      >
        <Button
          variant={'contained'}
          color={'primary'}
          sx={{ display: 'flex', gap: '.5rem' }}
        >
          <DescriptionOutlinedIcon />
          Show teaser
        </Button>
      </Box>
    </Box>
  );
};
