import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {}

const Navbar: React.FC<Props> = () => {
  return (
    <StyledNavbar>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
      </ul>
    </StyledNavbar>
  );
};

const StyledNavbar = styled.nav`
  width: 100%;
  padding: 2em;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .nav-links {
    display: flex;
    gap: 1em;

    li {
      padding: 1em 1.25em;
      background-color: #dddddd;
      border-radius: 10em;
      width: 8em;
      text-align: center;

      a {
        color: #000;
      }
    }
  }
`;

export default Navbar;
