import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    if (window.localStorage && router.isReady) {
      const token = window.localStorage.getItem("token");
      if (!token) {
        if (!router.pathname.includes("auth")) {
          router.replace("/auth/login");
        }
      } else {
        setIsAuth(true);
      }
      setIsloading(false);
    }
  }, [router.isReady]);
  return !isLoading ? <Component {...pageProps} isAuth={isAuth} /> : <></>;
}

export default MyApp;
