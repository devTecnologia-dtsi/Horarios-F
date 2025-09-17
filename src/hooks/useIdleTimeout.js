import { useEffect, useRef, useCallback } from "react";
import { useMsal } from "@azure/msal-react";

const useIdleTimeout = (timeout = 5 * 60 * 1000) => { 
  const { instance } = useMsal();
  const timerRef = useRef(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      localStorage.removeItem("isAuthenticated");
      instance.logoutRedirect({
        postLogoutRedirectUri: window.location.origin + "/login",
      });
    }, timeout);
  }, [timeout, instance]);

  useEffect(() => {
    const events = ["mousemove", "keydown", "scroll", "click"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [resetTimer]);
};

export default useIdleTimeout;
