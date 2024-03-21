'use client';
import { createTheme } from '@mui/material/styles';
import {
  ACCENT_GRADIENT,
  BLACK_GRADIENT,
  PRIMARY_GRADIENT,
  SECONDARY_GRADIENT,
  overpass,
  roboto,
  sora,
} from './customizations';
import { PaletteMode } from '@mui/material';

const lightTheme = createTheme({
  typography: {
    fontFamily: [
      sora.style.fontFamily,
      overpass.style.fontFamily,
      roboto.style.fontFamily,
      'system-ui',
      'sans-serif',
    ].join(','),
  },
  palette: {
    mode: 'light' as PaletteMode,
    common: {
      blackish: 'rgba(216, 223, 233, 0.21)',
      overlay: 'rgba(0, 0, 0, 0.6)',
      gradient: BLACK_GRADIENT,
      gray: '#6E6E6E',
      tableGray: '#B0B3B7',
      lightGray: '#E6E6E6',
      disabled: 'rgb(0,0,0,0.26)',
      bg: '#F4F5F7',
      text: '#616d7e',
      white: '#fff',
      black: '#000',
      bgCard: '#fff',
      icons: '#2C3E50',
      border: '#bdbdbd',
      borderTwo: '#8b8b8b',
    },
    text: {
      primary: '#000',
    },
    primary: {
      light: '#EAF4F3',
      main: '#178097',
      dark: '#0e313e',
      gradient: PRIMARY_GRADIENT,
    },
    secondary: {
      main: '#131788',
      dark: '#1e1c4a',
      gradient: SECONDARY_GRADIENT,
    },
    accent: {
      main: '#67e1fc',
      secondary: '#6166EC',
      gradient: ACCENT_GRADIENT,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          padding: '1rem 2rem',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: sora.style.fontFamily,
          fontWeight: 600,
          letterSpacing: 1.2,
          fontSize: '.9rem',
          padding: '0.5rem 2.5rem',
          textTransform: 'capitalize' as const,
          maxHeight: '3rem',
          borderRadius: '5px',
          transition: 'all 0.3s ease-in-out',
          whiteSpace: 'nowrap' as const,
          '@media (max-width: 600px)': {
            padding: '0.5rem 1rem',
          },
          '@media (max-width: 400px)': {
            padding: '0.5rem',
          },
        },
        contained: {
          color: '#ffffff !important',
          '&:hover': {
            transform: 'scale(0.94)',
            backgroundColor: '#6166EC',
          },
        },
        outlinedSecondary: {
          color: '#fff',
          borderColor: '#fff !important',
          '&:hover': {
            transform: 'scale(0.94)',
            backgroundColor: 'unset',
          },
        },
        textSizeMedium: {
          '&:hover': {
            color: '#000',
            transform: 'scale(0.94)',
            backgroundColor: 'unset',
          },
        },
        outlinedPrimary: {
          color: '#000',
          borderColor: '#000 !important',
          backgroundColor: 'unset',
          '&:hover': {
            backgroundColor: '#E6E6E6',
            transform: 'scale(0.94)',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '1em',
          color: '#000',
          // backgroundColor: '#fff',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: sora.style.fontFamily,
          fontWeight: 500,
          letterSpacing: 1.2,
          fontSize: '1rem',
          padding: '0.5rem 0.75rem',
          color: '#000',
          alignItems: 'center',
          display: 'flex',
          transition: 'color 300ms ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(23, 128, 151, 0.04)',
            color: '#178097',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#000',
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#000',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          marginBottom: '1rem!important',
          borderRadius: '10px',
          '&:before': {
            display: 'none',
          },
          '&:first-of-type': {
            borderTopLeftRadius: '10px!important',
            borderTopRightRadius: '10px!important',
          },
          '&:last-of-type': {
            borderBottomLeftRadius: '10px!important',
            borderBottomRightRadius: '10px!important',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        content: {
          margin: '0rem!important',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label': {
            color: '#000',
          },
        },
      },
    },
  },
});

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark' as PaletteMode,
//     common: {
//       blackish: 'rgba(216, 223, 233, 0.21)',
//       overlay: 'rgba(0, 0, 0, 0.6)',
//       gradient: BLACK_GRADIENT,
//       gray: '#6E6E6E',
//       tableGray: '#B0B3B7',
//       lightGray: '#E6E6E6',
//       disabled: 'rgb(0,0,0,0.26)',
//       bg: 'rgba(255, 255, 255, 0.05)',
//       text: '#616d7e',
//       white: '#fff',
//       black: '#000',
//       bgCard: '#2E2E2E',
//       icons: '#2C3E50',
//       border: '#5a5a5a',
//       borderTwo: '#c5c5c5',
//     },
//     text: {
//       primary: '#fff',
//     },
//     primary: {
//       light: '#EAF4F3',
//       main: '#178097',
//       dark: '#0e313e',
//       gradient: PRIMARY_GRADIENT,
//     },
//     secondary: {
//       main: '#6166EC',
//       dark: '#1e1c4a',
//       gradient: SECONDARY_GRADIENT,
//     },
//     accent: {
//       main: '#67e1fc',
//       secondary: '#6166EC',
//       gradient: ACCENT_GRADIENT,
//     },
//   },
//   components: {
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           borderRadius: '10px',
//           padding: '1rem 2rem',
//         },
//       },
//     },

//     MuiButton: {
//       styleOverrides: {
//         root: {
//           fontFamily: sora.style.fontFamily,
//           fontWeight: 600,
//           letterSpacing: 1.2,
//           fontSize: '1rem',
//           padding: '0.5rem 2.5rem',
//           textTransform: 'capitalize' as const,
//           maxHeight: '3rem',
//           borderRadius: '5px',
//           transition: 'all 0.3s ease-in-out',
//           whiteSpace: 'nowrap' as const,
//           '@media (max-width: 600px)': {
//             padding: '0.5rem 1rem',
//           },
//           '@media (max-width: 400px)': {
//             padding: '0.5rem',
//           },
//         },
//         contained: {
//           color: '#ffffff !important',
//           '&:hover': {
//             transform: 'scale(0.94)',
//             backgroundColor: '#6166EC',
//           },
//         },
//         textSizeMedium: {
//           '&:hover': {
//             color: '#fff',
//             transform: 'scale(0.94)',
//             backgroundColor: 'unset',
//           },
//         },
//         outlinedPrimary: {
//           color: '#fff !important',
//           borderColor: '#fff !important',
//           backgroundColor: 'unset',
//           '&:hover': {
//             backgroundColor: '#272727',
//             transform: 'scale(0.94)',
//           },
//         },
//         outlinedSecondary: {
//           color: '#fff',
//           borderColor: '#fff !important',
//           '&:hover': {
//             transform: 'scale(0.94)',
//             backgroundColor: 'unset',
//           },
//         },
//       },
//     },
//     MuiInputLabel: {
//       styleOverrides: {
//         root: {
//           fontSize: '1em',
//           color: '#fff',
//           backgroundColor: 'transparent',
//         },
//       },
//     },
//     MuiLink: {
//       styleOverrides: {
//         root: {
//           fontFamily: sora.style.fontFamily,
//           fontWeight: 500,
//           letterSpacing: 1.2,
//           fontSize: '1rem',
//           padding: '0.5rem 0.75rem',
//           color: '#fff',
//           alignItems: 'center',
//           display: 'flex',
//           transition: 'color 300ms ease-in-out',
//           '&:hover': {
//             backgroundColor: 'rgba(23, 128, 151, 0.04)',
//             color: '#178097',
//           },
//         },
//       },
//     },
//     MuiMenuItem: {
//       styleOverrides: {
//         root: {
//           color: '#fff',
//         },
//       },
//     },

//     MuiTypography: {
//       styleOverrides: {
//         root: {
//           color: '#fff',
//         },
//       },
//     },
//     MuiAccordion: {
//       styleOverrides: {
//         root: {
//           marginBottom: '1rem!important',
//           borderRadius: '10px',
//           '&:before': {
//             display: 'none',
//           },
//           '&:first-of-type': {
//             borderTopLeftRadius: '10px!important',
//             borderTopRightRadius: '10px!important',
//           },
//           '&:last-of-type': {
//             borderBottomLeftRadius: '10px!important',
//             borderBottomRightRadius: '10px!important',
//           },
//         },
//       },
//     },
//     MuiAccordionSummary: {
//       styleOverrides: {
//         content: {
//           margin: '0rem!important',
//         },
//       },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           '& label': {
//             color: '#fff',
//           },
//         },
//       },
//     },
//     MuiAutocomplete: {
//       styleOverrides: {
//         listbox: {
//           color: '#fff',
//         },
//       },
//     },
//   },
// });

export default lightTheme;
