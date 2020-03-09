import App from "next/app";
import firebase, { FirebaseContext } from "../firebase/index";
import useAuthentication from "../components/hooks/useAuthentication";
//VIENE SIENDO COMO EL APP DE REACT-APP
//PERFECTO PARA PONER EL CONTEXT
//asi hacemos disponible todos los metodos de firebase
//ESTO NOS LO DA NEXT LOS PROPS
const MyApp = ({ Component, pageProps }) => {
  const user = useAuthentication();
  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        user
      }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
};

export default MyApp;
