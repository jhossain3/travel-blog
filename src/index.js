import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './homePage';
import reportWebVitals from './reportWebVitals';
import { GlobalStyles } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Footer from './footer';
import Discover from './discoverPlaces';
import Japan from './japan'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles
      styles={{
        body: { backgroundColor: "#E6EFD1" },
          }}
          />
  <React.StrictMode>
  <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Home />}>
        
        </Route>
        <Route path="/discover" element={<Discover />}>

        </Route>
        <Route path="/japan" element={<Japan />}>

</Route>
      </Routes>
    </BrowserRouter>
    <Footer/>
  </React.StrictMode>

  </ThemeProvider>
);
