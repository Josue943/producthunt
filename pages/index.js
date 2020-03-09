import Layout from "../components/layout/Layout";
import ProductDetails from "../components/layout/ProductDetails";
import useProducts from "../components/hooks/useProducts";

const Home = () => {
  const { products } = useProducts("created");
  return (
    <div>
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
    </div>
  );
};

export default Home;
