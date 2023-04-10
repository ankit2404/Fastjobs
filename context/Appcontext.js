import { createContext, useState, useEffect } from "react";
// import axios from "axios";
import { useRouter } from "next/router";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const data = await fetch(
          `https://frontendtestapi.staging.fastjobs.io/auth/me`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const d = await data.json();
        console.log(data.status);
        if (data.status === 200) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    checkStatus();
  }, []);
  // useEffect(() => {
  //   if (isLoggedIn === true) {
  //     router.push("/");
  //   }
  // }, [isLoggedIn]);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setLoggedIn,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
