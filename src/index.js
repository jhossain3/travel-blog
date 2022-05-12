import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './homePage';
import reportWebVitals from './reportWebVitals';
import { GlobalStyles } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Footer from './footer';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
      <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  }}
  >
    <GlobalStyles
      styles={{
        body: { backgroundColor: "#E6EFD1" },
          }}
          />
  <React.StrictMode>
  <Container component="main" disableGutters maxWidth={false}>
    <Home />
    <Footer/>
    </Container>
  </React.StrictMode>
  </Box>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
