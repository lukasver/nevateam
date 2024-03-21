import { copyProjectShareableLink } from '@/lib/client/utils';
import { MasterProject } from '@/types/projects';
import { IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { memo } from 'react';
import ShareIcon from '@mui/icons-material/Share';

export const ShareProjectButton = memo(function ShareProjectButton({
  project,
}: {
  project: MasterProject;
}) {
  const matchesSM = useMediaQuery('(max-width:600px)');

  return (
    <Tooltip title="Share the project's link" placement={'top'}>
      <IconButton
        color={'primary'}
        sx={{ boxShadow: 2, bgcolor: 'common.white' }}
        onClick={async () => await copyProjectShareableLink(project, matchesSM)}
      >
        <ShareIcon height={28} width={28} />
      </IconButton>
    </Tooltip>
  );
});
