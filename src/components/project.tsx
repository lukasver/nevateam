'use client';
import { Project as ProjectSchema } from '@/types/projects';
import { Box, Stack, SxProps, useMediaQuery, useTheme } from '@mui/material';
import { useRef, useState } from 'react';
import { Subtitle, Title } from './ui/typography';
import { ShareProjectButton } from './ui/share-button';
import { getPlaceholderImage } from '@/lib/client/utils';
import ImageWithFallback from './image-with-fallback';
import {
  ContactInfo,
  Documents,
  FundInvestmentInfo,
  FundKeyPerformanceIndicators,
  FundStrategy,
  FundingInfo,
  GeneralInfo,
  ProjectDetailsActionsSection,
} from './project/sections';
import Image from 'next/image';
import TeaserModal from './document-viewer';
import InvestComponent from './project/invest';

interface ProjectProps {
  project: ProjectSchema;
}

const Project = (props: ProjectProps) => {
  const project = props.project.masterProject;

  const [openModal, setOpenModal] = useState<string | null>(null);

  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('md'));

  if (!project) return null;

  const details = project.fundProject;

  const handleViewDocument = (doc: typeof openModal) => {
    if (doc) {
      let url = doc?.split('/public/')[1] ?? doc;
      console.debug('🚀 ~ url:', url);
      setOpenModal(url);
    }
  };

  return (
    <>
      <Stack spacing={2} id={'project-data-column'}>
        <Stack spacing={2}>
          {isMobile ? <PoweredBy /> : null}
          <Box>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Title color={'primary'} sx={{ fontWeight: 'bold' }}>
                  {project?.projectName}
                </Title>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    fontWeight: '600',
                    fontSize: '.9rem',
                    width: '100%',
                    maxWidth: ' 28rem',
                  }}
                >
                  <Subtitle
                    sx={{
                      fontWeight: '600',
                      fontSize: { sm: '0.8rem', md: '.9rem', xl: '1rem' },
                      alignSelf: 'center',
                      mr: '0.8rem',
                    }}
                  >
                    ISIN{' '}
                  </Subtitle>
                  <Subtitle
                    sx={{
                      fontSize: { sm: '0.8rem', md: '.9rem', xl: '1rem' },
                    }}
                  >
                    {project.isinNumber}
                  </Subtitle>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                <ShareProjectButton project={project} />
              </Box>
            </Box>
          </Box>
          <Box>
            <Box
              component={'figure'}
              id={'project-image-container'}
              sx={{
                position: 'relative',
                boxShadow: 2,
                '& > span': {
                  borderRadius: '10px',
                },
              }}
            >
              <ImageWithFallback
                priority
                placeholder={'blur'}
                blurDataURL={getPlaceholderImage('100%', '100%')}
                sizes='100vw'
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                width={500}
                height={300}
                src={
                  project.projectSupportingDocument.projectPicture
                    .projectPicture
                }
                alt='profile'
              />
            </Box>
          </Box>
        </Stack>
        {isMobile ? (
          <ProjectDetailsActionsSection
            project={project}
            details={details}
            handleViewDocument={handleViewDocument}
          />
        ) : null}

        <div>
          <GeneralInfo project={project} details={details} />
          <FundStrategy project={project} details={details} />
          <FundKeyPerformanceIndicators project={project} details={details} />
          <FundInvestmentInfo project={project} details={details} />
          <FundingInfo project={project} />
          <Documents project={project} onViewDocument={handleViewDocument} />
          <ContactInfo project={project} />
        </div>
      </Stack>
      <Box
        component={'aside'}
        id={'project-overview-column'}
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          minWidth: '300px',
          alignItems: 'flex-end',
          '& > *': { width: '100%' },
        }}
      >
        <Stack
          spacing={2}
          sx={{ position: 'sticky', top: '2rem', maxHeight: 'fit-content' }}
        >
          {!isMobile ? (
            <>
              <PoweredBy />

              <ProjectDetailsActionsSection
                project={project}
                details={details}
                handleViewDocument={handleViewDocument}
              />
            </>
          ) : (
            <InvestComponent
              project={project}
              details={details}
              handleViewDocument={() => {}}
            />
          )}
        </Stack>
      </Box>
      <TeaserModal
        id={openModal}
        open={!!openModal}
        onClose={() => setOpenModal(null)}
      />
    </>
  );
};

const PoweredBy = ({ sx }: { sx?: SxProps }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '64px',
        width: '100%',
        ...sx,
      }}
    >
      <Image
        className='rounded-xl'
        alt={'Smat logo'}
        src={require('/public/assets/poweredby.png')}
        style={{
          objectFit: 'cover', // cover, contain, none
        }}
        fill
      />
    </Box>
  );
};

export default Project;
