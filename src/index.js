// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// //Importaciones del proveedor de autenticacion MSAL
// import { MsalProvider } from '@azure/msal-react';
// import { msalInstance } from './auth/msalConfig';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <MsalProvider instance={msalInstance}>
//       <App />
//     </MsalProvider>
//   </React.StrictMode>
// );


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./auth/msalConfig";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MsalProvider>
  </React.StrictMode>
);
