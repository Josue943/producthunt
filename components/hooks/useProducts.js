import { FirebaseContext } from "../../firebase/index";
import { useEffect, useState, useContext } from "react";

const useProducts = order => {
  const [products, setProducts] = useState([]);
  const { firebase } = useContext(FirebaseContext);
  //guardaremos los productos
  useEffect(() => {
    const getProducts = () => {
      firebase.db
        .collection("products")
        .orderBy(order, "desc")
        .onSnapshot(snapShot);
    };
    getProducts();
  }, []);
  //necesaria para traer los datos
  const snapShot = snapshot => {
    //simpremente iteramos en los productos
    const products = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      };
    });
    setProducts(products);
  };
  return {
    products
  };
};

export default useProducts;
