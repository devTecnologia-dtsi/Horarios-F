import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";

const GRAPH_ENDPOINT = "https://graph.microsoft.com/v1.0/me";
const PHOTO_ENDPOINT = "https://graph.microsoft.com/v1.0/me/photo/$value";

export default function useUserProfile() {
  const { instance, accounts } = useMsal();
  const [user, setUser] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (accounts.length === 0) {
        setLoading(false);
        return;
      }

      try {
        // Obtener token con permisos correctos
        const response = await instance.acquireTokenSilent({
          scopes: ["User.Read", "email", "profile"],
          account: accounts[0]
        });

        const token = response.accessToken;

        // Obtener info básica del usuario
        const userResponse = await fetch(GRAPH_ENDPOINT, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!userResponse.ok) throw new Error("Error al obtener datos del usuario");
        const userData = await userResponse.json();
        setUser(userData);

        // Obtener foto del usuario
        const photoResponse = await fetch(PHOTO_ENDPOINT, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (photoResponse.ok) {
          const blob = await photoResponse.blob();
          setPhotoUrl(URL.createObjectURL(blob));
        } else {
          setPhotoUrl(null);
        }

      } catch (err) {
        console.error("Error cargando perfil:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [accounts, instance]);

  return { user, photoUrl, loading };
}
