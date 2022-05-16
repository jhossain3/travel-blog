import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './homePage';
import reportWebVitals from './reportWebVitals';
import { GlobalStyles } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Footer from './footer';


const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles
      styles={{
        body: { backgroundColor: "#E6EFD1" },
          }}
          />
  <React.StrictMode>
    <Home/>
    <Footer/>
  </React.StrictMode>

  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
