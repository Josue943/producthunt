import React from "react";
import Layout from "../components/layout/Layout";
import Error404 from "../components/layout/404";

const notFound = () => {
  return (
    <Layout>
      <Error404 message={"Not Found"} />
    </Layout>
  );
};

export default notFound;
