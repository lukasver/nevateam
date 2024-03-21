'use client';
import { Project as ProjectSchema } from '@/types/projects';
import { Box, Button, Stack, useMediaQuery, useTheme } from '@mui/material';
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

interface ProjectProps {
  project: ProjectSchema;
}

const Project = (props: ProjectProps) => {
  const project = props.project.masterProject;

  const investRef = useRef<HTMLDivElement>();

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
            {isMobile && (
              <Box sx={{ margin: '0.5rem auto' }}>
                <Button
                  variant={'contained'}
                  color={'primary'}
                  sx={{ display: 'flex', gap: '.5rem' }}
                  fullWidth
                  onClick={() =>
                    investRef?.current?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'center',
                    })
                  }
                >
                  Invest in this project
                </Button>
              </Box>
            )}
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
          <Box
            sx={{
              position: 'relative',
              height: '64px',
              width: '100%',
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
          {!isMobile ? (
            <ProjectDetailsActionsSection
              project={project}
              details={details}
              handleViewDocument={handleViewDocument}
            />
          ) : null}
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

export default Project;
