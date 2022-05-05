import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material';
import React from 'react';
import Table from './CoinTable';
let theme = createTheme({
  palette: {
    mode: 'dark',
  },
});
// let fontResponsive = responsiveFontSizes(theme);
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Table />
    </ThemeProvider>
  );
}

export default App;
