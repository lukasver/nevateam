import { Box, Fade } from '@mui/material';
import { ReactNode } from 'react';

const ProjectDetailLayout: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <Fade in={true} timeout={750}>
      <Box
        component={'section'}
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '1fr 380px',
            columnGap: '2rem',
          },
          p: { xs: '1%', md: '2.5% 5%' },
        }}
      >
        {children}
      </Box>
    </Fade>
  );
};

export default ProjectDetailLayout;
