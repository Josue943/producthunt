import React from "react";
import { css } from "@emotion/core";

const Error404 = ({ message }) => {
  return (
    <div
      css={css`
        width: 95%;
        max-width: 1200px;
        margin: auto;
      `}
    >
      <h1
        css={css`
          padding-top: 50px;
          font-size: 4rem;
          margin-top: 10px;
          text-align: center;
        `}
      >
        {message}
      </h1>
    </div>
  );
};

export default Error404;
