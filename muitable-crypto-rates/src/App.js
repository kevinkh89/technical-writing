import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material';
import React from 'react';
import Table from './Table';
let theme = createTheme({
   palette: {
      mode: 'dark',
   },
});
theme = responsiveFontSizes(theme);
function App() {
   return (
      <ThemeProvider theme={theme}>
         <Table />
      </ThemeProvider>
   );
}

export default App;
