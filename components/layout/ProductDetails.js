import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Link from "next/link";

const ProductDetails = ({ product }) => {
  const {
    id,
    comments,
    company,
    created,
    description,
    name,
    url,
    urlImage,
    votes
  } = product;
  return (
    <Item>
      <div
        css={css`
          height: 100px;
          width: 200px;
          margin-right: 20px;
        `}
      >
        <img
          src={urlImage}
          css={css`
            width: 100%;
            height: 100%;
            object-fit: cover;
          `}
        />
      </div>
      <div
        css={css`
          flex: 1;
          display: flex;
          flex-flow: wrap column;
        `}
      >
        {/*  asi hacemos la navegacion */}
        {/* lo primero es la ruta digamos que es lo que tenemos que crear una carpeta y el archivo*/}
        {/*el as es la redireccion aparte le pasamos el id*/}
        <Link href="products/[id]" as={`/products/${id}`}>
          <a
            css={css`
              font-weight: 700;
              font-size: 2rem;
              cursor: pointer;
              font-family: "Roboto Slab", sans-serif;
            `}
          >
            {name}
          </a>
        </Link>
        <p
          css={css`
            color: var(--gray2);
          `}
        >
          {description}
        </p>
        <div
          css={css`
            align-items: center;
            padding: 1rem 0;
          `}
        >
          <img
            src="/static/img/comentario.png"
            css={css`
              width: 1.3rem;
              margin-right: 10px;
            `}
          />
          <span
            css={css`
              font-weight: 700;
              font-size: 1.5rem;
            `}
          >
            {comments.length} Comments
          </span>
        </div>

        <span>Posted {formatDistanceToNow(new Date(created))} ago</span>
      </div>
      <div
        css={css`
          flex-basis: 30px;
          align-self: center;
          text-align: center;
        `}
      >
        <div>&#9650;</div>
        {votes}
      </div>
    </Item>
  );
};

const Item = styled.li`
  display: flex;
  flex-flow: row column;
  border: 1px solid #e1e1e1;
  padding: 2rem;
  margin-bottom: 20px;
`;

export default ProductDetails;
