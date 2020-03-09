import styled from "@emotion/styled";

const Button = styled.a`
  font-weight: 700;
  display: block;
  text-align: center;
  text-transform: uppercase;
  border: 1px solid #d1d1d1;
  padding: 0.6rem 2rem;
  margin-left: 1rem;
  font-family: "Roboto Slab", sans-serif;
  margin-right: 1rem;
  background-color: ${props => (props.bgColor ? "#da552f" : "white")};
  color: ${props => (props.bgColor ? "white" : "#000")};
  &:last-of-type {
    /*  margin-right: 0; */
  }
  &:hover {
    cursor: pointer;
  }
`;

export default Button;
