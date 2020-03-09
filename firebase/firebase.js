import app from "firebase/app";
import "firebase/auth"; //c0on esto podemos usar lo de auth
import "firebase/firestore"; //insertar products
import "firebase/storage"; //guardar imagenes

import firebaseConfig from "./config";
//CON ESTO INICIALIZAMOS Y PONERMOS LA CONFIG
class Firebase {
  constructor() {
    //posiblemente da error sin esto si esta creada le dicimos qu eno cree otra
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    //con esto podemos usar las funciones de auth
    this.auth = app.auth();
    this.db = app.firestore(); //con esto podemos meter productos
    this.storage = app.storage(); //guardar imagenes
  }
  async register(name, email, password) {
    //creamos el usuario
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    //con esto creamos el nombre dl usuario
    return await newUser.user.updateProfile({
      displayName: name
    });
  }

  async login(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }

  async logOut() {
    await this.auth.signOut();
  }
}

const firebase = new Firebase();
export default firebase;
