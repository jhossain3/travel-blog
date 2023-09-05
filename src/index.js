import React from 'react';
import App from './app.jsx';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {AuthProvider} from "react-auth-kit";
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider 
    authType={"cookie"}
    authName={"_auth"}
    cookieDomain='window.location.hostname'
    cookieSecure={false}>
      <BrowserRouter>
    <App />
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('app')
);
reportWebVitals();