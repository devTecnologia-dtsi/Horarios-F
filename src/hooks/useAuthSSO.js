import { useMsal } from "@azure/msal-react";

const useAuthSSO = () => {
  const { instance, accounts } = useMsal();

  const login = async () => {
    try {
      // Intentar silent login
      if (accounts.length > 0) {
        const response = await instance.acquireTokenSilent({
          scopes: ["User.Read", "email", "profile"],
          account: accounts[0]
        });
        return response.idToken;
      }

      // Si no hay cuenta activa, intentar popup
      const response = await instance.loginPopup({
        scopes: ["User.Read", "email", "profile"]
      });

      return response.idToken;

    } catch (error) {
      console.warn("Silent/popup login falló, probando con redirect:", error);

      // Último recurso: redirect
      await instance.loginRedirect({ 
        scopes: ["User.Read", "email", "profile"] 
      });
    }
  };

  const getToken = async () => {
    if (accounts.length === 0) return null;
    try {
      const response = await instance.acquireTokenSilent({
        scopes: ["User.Read", "email", "profile"],
        account: accounts[0]
      });
      return response.idToken;
    } catch (error) {
      console.error("Error al renovar token:", error);
      return null;
    }
  };

  const logout = () => {
    // Limpiar los datos locales
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');

    // Cerrar sesión con redirect
    instance.logoutRedirect({
      postLogoutRedirectUri: window.location.origin + "/login"
    });
  };

  return { login, getToken, logout, accounts };
};

export default useAuthSSO;
