import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  typography: {
    fontFamily: 'Open Sans',
  },
  backgroundColor: { 
    default: '#E6EFD1' 
  },
  palette: {
    primary: {
      main: '#E6EFD1',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
