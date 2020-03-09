import { useState, useEffect } from "react";
import firebase from "../../firebase/index";

const useAuthentication = () => {
  //funcion que se encarga de saber si esta autentificado o no
  //desde que inicia

  const [auth, setAuth] = useState(null);
  useEffect(() => {
    const unsuscribe = firebase.auth.onAuthStateChanged(user => {
      if (user) {
        setAuth(user);
      } else {
        setAuth(null);
      }
    });
    return () => unsuscribe();
  }, []);
  return auth;
};

export default useAuthentication;
