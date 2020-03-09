import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { useState } from "react";
import Router from "next/router";

const SearchForm = props => {
  const [query, setQuery] = useState("");
  const onSubmit = e => {
    e.preventDefault();
    //validation
    if (query.trim() === "") return;
    //redireccionamos
    //con esto podemos modificar la url
    Router.push({
      pathname: "/search",
      query: { q: query }
    });
  };
  return (
    <form
      onSubmit={onSubmit}
      css={css`
        position: relative;
      `}
    >
      <Input
        placeholder="Search Products..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <InputSubmit>Search</InputSubmit>
    </form>
  );
};
const Input = styled.input`
  min-width: 260px;
  padding: 0.6rem;
  border: 1px solid var(--gray2);
`;

const InputSubmit = styled.button`
  height: 2.6rem;
  width: 3rem;
  background-size: 3rem;
  background-image: url("../static/img/buscar.png");
  background-repeat: no-repeat;
  display: block;
  position: absolute;
  right: 0.1rem;
  top: 1px;
  background-color: white;
  border: none;
  /*quitamos el text*/
  text-indent: -99999px;
  &:hover {
    cursor: pointer;
  }
`;

export default SearchForm;
