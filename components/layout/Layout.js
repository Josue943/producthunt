import React from "react";
import Header from "./Header";
import { Global, css } from "@emotion/core";
import Head from "next/head";
//routing viene incluido
//asi se pone css global
//ese fontsize se puso para hacerlo responsive
//head es igual al head que tenemos en el html normal
//abajo vemos como se linkea una hoja de estilos
const Layout = ({ children }) => {
  return (
    <>
      <Global
        styles={css`
          :root {
            --gray: #3d3d3d;
            --gray2: #6f6f6f;
            --orange: #da552f;
          }
          * {
            margin: 0;
            padding: 0;
          }
          html {
            font-size: 62.5%;
            box-sizing: border-box;
          }
          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }
          body {
            font-size: 1.6rem;
            line-height: 1.5;
            font-family: "PT Sans", sans-serif;
          }
          h1,
          h2,
          h3 {
            margin: 0 0 2rem 0;
            line-height: 1.5;
          }
          h1,
          h2 {
            font-family: "Roboto Slab", serif;
            font-weight: 700;
          }
          h3 {
            font-family: "PT Sans", sans-serif;
          }
          a {
            text-decoration: none;
          }
          ul: {
            list-style: none;
            margin: 0;
            padding: 0;
          }
        `}
      />
      <Head>
        <title>Product Hunt Firebase and Next</title>
        <link
          href="https://fonts.googleapis.com/css?family=PT+Sans:400,700|Roboto+Slab:400,700&display=swap"
          rel="stylesheet"
        />
        <link href="/static/css/app.css" rel="stylesheet" />
      </Head>
      <Header />

      <main>{children}</main>
    </>
  );
};

//solo con ponerlo asi devuelve un  fragment <>
export default Layout;
