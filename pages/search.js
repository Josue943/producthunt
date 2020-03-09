import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";
import useProducts from "../components/hooks/useProducts";
import ProductDetails from "../components/layout/ProductDetails";

const Search = () => {
  const router = useRouter();
  //asi lo recibimos
  const {
    query: { q }
  } = router;

  const [filteredProducts, setFilteredProducts] = useState([]);

  const { products } = useProducts("created");

  useEffect(() => {
    if (!q) return;
    const search = q.toLowerCase();
    const filtered = products.filter(p => {
      return p.name.toLowerCase().startsWith(search);
    });
    setFilteredProducts(filtered);
  }, [q, products]);
  return (
    <Layout>
      <div className="list-products">
        <div className="container">
          <ul>
            {filteredProducts.map(product => (
              <ProductDetails key={product.id} product={product} />
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
