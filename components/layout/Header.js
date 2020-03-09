import Search from "../ui/SearchForm";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import Link from "next/link";
import Button from "../ui/Button";
import { FirebaseContext } from "../../firebase/index";
import { useContext } from "react";
const Header = () => {
  const { user, firebase } = useContext(FirebaseContext);
  return (
    <header
      css={css`
        border-bottom: 2px solid #e1e1e1;
        padding: 1rem 0;
      `}
    >
      <HeaderContainer>
        <div
          className="main-nav"
          css={css`
            display: flex;
            align-items: center;
            flex-flow: wrap row;
          `}
        >
          <Link href="/">
            <Brand>P</Brand>
          </Link>

          <Search />
          <Nav>
            <Link href="/">
              <a>Home</a>
            </Link>

            <Link href="/popular">
              <a>Popular</a>
            </Link>
            {user && (
              <Link href="/newproduct">
                <a>New Product</a>
              </Link>
            )}
          </Nav>
        </div>
        <div
          className="user-nav"
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {user ? (
            <>
              <p>Hello : {user.displayName}</p>
              <Button
                bgColor="true"
                onClick={() => {
                  firebase.logOut();
                }}
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button bgColor="true">Login</Button>
              </Link>
              <Link href="/register">
                <Button bgColor="true">Sign in</Button>
              </Link>
            </>
          )}
        </div>
      </HeaderContainer>
    </header>
  );
};

const HeaderContainer = styled.header`
  width: 95%;
  margin: auto;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Brand = styled.p`
  color: var(--orange);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: "Roboto Slab", sans-serif;
  margin-right: 2rem;
  &:hover {
    cursor: pointer;
  }
`;

const Nav = styled.nav`
  a {
    margin-left: 1.5rem;
    font-size: 1.6rem;
    color: var(--gray);
    font-family: "PT Sans", sans-serif;
  }
`;

export default Header;
