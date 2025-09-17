import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_CLIENTID,
    authority: process.env.REACT_APP_AUTHORITY,
    redirectUri: process.env.REACT_APP_REDIRECTURI,
    postLogoutRedirectUri: process.env.REACT_APP_POST_LOGOUT_REDIRECTURI || window.location.origin + "/login"
  },
  cache: {
    cacheLocation: "sessionStorage", 
    storeAuthStateInCookie: false
  }
};

export const msalInstance = new PublicClientApplication(msalConfig);
export const msalInit = msalInstance.initialize();
