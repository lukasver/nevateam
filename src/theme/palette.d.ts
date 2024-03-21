declare module '@mui/material/styles/createPalette' {
  interface Palette {
    accent: PaletteColorOptions;
    common: CommonColors;
  }

  interface CommonColors {
    blackish: string;
    overlay: string;
    gradient: string;
    gray: string;
    tableGray: string;
    lightGray: string;
    disabled: string;
    bg: string;
    text: string;
    white: string;
    black: string;
    bgCard: string;
    icons: string;
    border: string;
    borderTwo: string;
  }
  interface SimplePaletteColorOptions {
    gradient: string;
    secondary?: string;
  }

  interface PaletteOptions {
    accent: PaletteColorOptions;
    common: CommonColors;
  }
}

export default function createPalette(palette: PaletteOptions): Palette;
