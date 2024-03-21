'use client';
import Link from 'next/link';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { CSS_TEXT, CSS_TITLE, overpass } from '@/theme/customizations';
import { Fade, SxProps, Theme } from '@mui/material';

import { IS_PRODUCTION } from '@/lib/constants';
import Image from 'next/image';
import { getAssets } from '@/lib/utils';
import { TwitterIcon } from './icons';
import { SmatLogo } from './smat-logo';

const FooterHomePage = () => {
  const year = new Date().getFullYear();

  return (
    <Box
      sx={{
        bgcolor: ({ palette }) =>
          palette.mode === 'dark' ? '#121212' : palette.common.white,
        borderTop: '1px solid',
        borderColor: 'primary.main',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Container sx={styles.mainDivV2}>
        <Container maxWidth={'xl'} sx={styles.gridMainContainers}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
            <SmatLogo
              black={true}
              sx={{
                height: '48px',
                width: '160px',
                cursor: 'pointer',
                display: { xs: 'initial', lg: 'initial' },
                marginRight: '2rem',
              }}
            />

            <Typography sx={styles.titleV2}>
              {'The Alternative Investment Network'}
            </Typography>
          </Box>
          <Grid container>
            <Grid
              container
              item
              xs={12}
              sm={7}
              justifyContent={'space-between'}
            >
              {getFooterLinks().map(({ title, content }, index) => (
                <Grid
                  item
                  key={title + index}
                  sx={{ padding: { xs: '1rem', md: 'unset' } }}
                >
                  <Typography align='left' sx={styles.linksTitleV2}>
                    {title}
                  </Typography>
                  <List dense>
                    {content?.map(({ title, url /* absolute */ }, i) => (
                      <Link href={url} passHref key={title + i}>
                        <ListItem disableGutters>
                          <ListItemText sx={styles.linksV2} primary={title} />
                        </ListItem>
                      </Link>
                    ))}
                  </List>
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12} sm={5} sx={styles.logosGrid}>
              <SocialNetworks />
              <MobileAppLinks />
            </Grid>
          </Grid>
          <Box>
            <Typography sx={styles.rights}>
              {`Smat © ${year}. All rights reserved. By using our website you agree to the use of cookies in accordance with our cookies policy.`}
            </Typography>
          </Box>
        </Container>
      </Container>
    </Box>
  );
};

function SocialNetworks() {
  return (
    <Box display='flex' flexDirection='column' width='100%'>
      <Box sx={styles.iconsContainer}>
        {SOCIAL_NETWORKS.map(({ name, icon, url, ariaLabel }, index) => (
          <a
            key={name + index}
            target='_blank'
            rel='noopener noreferrer nofollow'
            href={url || undefined}
            style={{ margin: '0px 2.5px' }}
            aria-label={ariaLabel}
          >
            <Tooltip title={!!url ? '' : 'Coming soon'} placement={'top'} arrow>
              <span>
                <IconButton
                  disabled={!url}
                  sx={styles.roundedButtonsV2}
                  size='large'
                  aria-label={ariaLabel}
                >
                  {icon}
                </IconButton>
              </span>
            </Tooltip>
          </a>
        ))}
      </Box>
    </Box>
  );
}

const SOCIAL_NETWORKS = [
  {
    name: 'Twitter',
    icon: <TwitterIcon />,
    url: 'https://twitter.com/smat_io',
    ariaLabel: 'Open Twitter',
  },
  {
    name: 'LinkedIn',
    icon: <LinkedInIcon />,
    url: 'https://www.linkedin.com/company/smat-s-a/',
    ariaLabel: 'Open LinkedIn',
  },
  {
    name: 'Instagram',
    icon: <InstagramIcon />,
    url: 'https://www.instagram.com/smat.io/',
    ariaLabel: 'Open Instagram',
  },
  {
    name: 'Youtube',
    icon: <YouTubeIcon />,
    url: 'https://www.youtube.com/channel/UCpXll_K2Bo30JfRKEpw4VCQ/featured',
    ariaLabel: 'Open Youtube',
  },
];

const getFooterLinks = () => [
  {
    title: 'Smat',
    content: [
      {
        title: 'What we do',
        url: 'https://smat.io/#about',
        hashlink: false,
      },
      {
        title: 'Contact us',
        url: 'https://token.smat.io/contactus',
        hashlink: false,
      },
    ],
  },
  {
    title: 'Our services',
    content: [
      { title: 'Invest', url: 'https://token.smat.io/invest', hashlink: false },
      {
        title: 'Distribute',
        url: 'https://token.smat.io/distribute',
        hashlink: false,
      },
      {
        title: 'Smat app',
        url: process?.env.NEXT_PUBLIC_SMAT_APP_URL || 'https://app.smat.io',
        hashlink: false,
        absolute: true,
      },
      { title: 'Smat token', url: 'https://token.smat.io', hashlink: false },
    ],
  },
  {
    title: 'Legal info',
    content: [
      {
        title: 'Privacy policy',
        url: 'https://smat.io/technology',
        hashlink: false,
      },
      {
        title: 'Terms & conditions',
        url: 'https://smat.io/terms-and-conditions',
        hashlink: false,
      },
    ],
  },
];

function MobileAppLinks({ sx = {} }: { sx?: SxProps }) {
  const universalLink = IS_PRODUCTION
    ? 'https://smatapp.app.link/app'
    : 'https://smatapp.test-app.link/app';
  return (
    <Box
      sx={{
        gap: '1rem',
        justifyContent: { xs: 'center', md: 'flex-end' },
        display: 'flex',
        width: '100%',
        ...sx,
      }}
    >
      <Tooltip placement='top' arrow title={'Download on Apple store'}>
        <a
          href={universalLink}
          rel={'noopener noreferrer nofollow'}
          target={'_blank'}
        >
          <Fade in timeout={2500}>
            <span>
              <Image
                src={getAssets('app_store.webp')}
                alt={'APP Store'}
                layout='fixed'
                height='40'
                width='120'
              />
            </span>
          </Fade>
        </a>
      </Tooltip>
      <Tooltip placement='top' arrow title={'Download on Google store'}>
        <a
          href={universalLink}
          rel={'noopener noreferrer nofollow'}
          target={'_blank'}
        >
          <Fade in timeout={2500}>
            <span>
              <Image
                src={getAssets('google_play.webp')}
                alt={'Google Play'}
                layout='fixed'
                height='40'
                width='120'
              />
            </span>
          </Fade>
        </a>
      </Tooltip>
    </Box>
  );
}

const styles = {
  mainDiv: {
    bgcolor: ({ palette }: Theme) => palette.secondary.main,
    minWidth: '100vw',
    minHeight: '23rem',
    paddingTop: '3rem',
    paddingBottom: { xs: '3rem', sm: '1rem', lg: '3rem' },
  },
  mainDivV2: {
    paddingTop: '3rem',
    paddingBottom: { xs: '6rem', sm: '1rem', lg: '3rem' },
    minHeight: '23rem',
  },
  gridMainContainers: {
    display: 'grid',
    gap: { xs: '2rem', sm: '1rem' },
    gridTemplateRows: { xs: '0.6fr 2fr', sm: '1fr 2fr' },
    gridTemplateColumns: 'auto',
  },
  title: {
    color: ({ palette }: Theme) => palette.common.white,
    fontWeight: 500,
    fontFamily: overpass.style.fontFamily,
    paddingTop: { xs: 1, lg: 0 },
    fontSize: { xs: '0.7rem', lg: 'initial' },
  },
  titleV2: {
    ...CSS_TITLE,
    paddingTop: { xs: 1, lg: 0 },
    fontSize: { xs: '0.7rem', lg: 'initial' },
  },
  linksTitle: {
    fontSize: { xs: '1rem', sm: '1.429rem' },
    fontFamily: overpass.style.fontFamily,
    fontWeight: 700,
    cursor: 'context-menu',
    color: ({ palette }: Theme) => palette.common.white,
  },
  linksTitleV2: {
    fontSize: { xs: '1rem', sm: '1.429rem' },
    cursor: 'context-menu',
    ...CSS_TITLE,
  },
  links: {
    '& > *': {
      fontSize: { xs: '0.75', sm: '1rem' },
      fontFamily: overpass.style.fontFamily,
      fontWeight: 500,
      cursor: 'pointer',
      textTransform: 'capitalize',
      color: ({ palette }: Theme) => palette.common.white,
      ':hover': {
        color: ({ palette }: Theme) => palette.primary.main,
      },
    },
  },
  linksV2: {
    '& > *': {
      ...CSS_TEXT,
      cursor: 'pointer',
      fontWeight: 400,
      textTransform: 'capitalize',
      fontSize: { xs: '0.75', sm: '1rem' },
      ':hover': {
        color: ({ palette }: Theme) => palette.primary.main,
      },
    },
  },
  rights: {
    fontSize: '12px',
    color: ({ palette }: Theme) => palette.text.primary,
    fontWeight: 300,
    fontFamily: overpass.style.fontFamily,
  },
  roundedButtons: {
    bgcolor: ({ palette }: Theme) => palette.common.white,
    color: ({ palette }: Theme) => palette.secondary.main,
    '& .MuiSvgIcon-root': {
      fontSize: { xs: '1.5rem', sm: '2rem' },
      ':hover': {
        bgcolor: ({ palette }: Theme) => palette.primary.main,
      },
    },
  },
  roundedButtonsV2: {
    bgcolor: 'transparent',
    color: 'tertiary.main',
    transition: ({ transitions }: Theme) =>
      transitions.create('all', {
        duration: transitions.duration.shortest,
        easing: transitions.easing.easeIn,
      }),
    ':hover': {
      color: 'primary.main',
    },
    '& .MuiSvgIcon-root': {
      fontSize: { xs: '1.714rem', sm: '2.286rem' },
    },
  },
  iconsContainer: {
    textAlign: { xs: 'center', sm: 'right' },
    margin: { xs: 1, sm: 0 },
    gap: '.5rem',
    display: 'flex',
    justifyContent: { xs: 'center', sm: 'flex-end' },
  },
  logosGrid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: { xs: '1.5rem', sm: 'unset' },
  },
};

export default FooterHomePage;
