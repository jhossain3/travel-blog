import React from "react";
import Home from "./homePage";
import { GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Footer from "./footer";
import Discover from "./discoverPlaces";
import Japan from "./japan";
import About from "./about";
import TravelPost from "./travelpost";
import Update from "./update";
import Create from "./create";
import Signup from './signUp';
import { Routes, Route } from "react-router-dom";
import Header from "./header.jsx";
import Login from "./login";
import { RequireAuth } from 'react-auth-kit'

const App = () => {
  console.log('here;', document.cookie);
  return (
  
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          body: { backgroundColor: "#FFFFFF" },
        }}
      />
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/discover" element={<Discover />}></Route>
          <Route path="/japan" element={<Japan />}></Route>
          <Route path="/posts/:id" element={<TravelPost />}></Route>
          <Route path="/posts/:id/edit" element={<Update />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/about" element={<RequireAuth loginPath ="/login"><About /></RequireAuth>}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login"  element={<Login />}></Route>

        </Routes>
        <Footer />
    </ThemeProvider>
  );
};
export default App;
