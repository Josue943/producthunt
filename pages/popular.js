import React from "react";
import Layout from "../components/layout/Layout";
import useProducts from "../components/hooks/useProducts";
import ProductDetails from "../components/layout/ProductDetails";

const Popular = () => {
  const { products } = useProducts("votes");
  return (
    <Layout>
      <div className="list-products">
        <div className="container">
          <ul>
            {products.map(product => (
              <ProductDetails key={product.id} product={product} />
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Popular;
