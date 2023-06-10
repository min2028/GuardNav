import React from "react";
import styled from "styled-components";

const NavBarContainer = styled.div`
    background-color: #333;
    overflow: hidden;
    display: flex;
    align-items: center;
    height: 70px;
`;

const LeftNav = styled.div`
  margin-left: auto;

  a {
    color: #f2f2f2;
    font-family: "Rubik";
    text-align: center;
    text-decoration: none;
    font-size: 17px;
    margin: 10px;
  }
`;

const MidNav = styled.div`
  margin: auto;
  align-self: center;

  a {
    font-family: "Anek Tamil";
    letter-spacing: 0.245em;
    color: #f2f2f2;
    text-align: center;
    text-decoration: none;
    font-size: 17px;
  }
`;

const RightNav = styled.div`
  margin: auto;
  align-self: center;

  a {
    color: #f2f2f2;
    text-align: center;
    text-decoration: none;
    font-size: 17px;
  }
`;

const NavBar = (props) => {
  return (
    <NavBarContainer>
      <LeftNav>
        <a className="nav-item" href="../pages/index.js">
          Home
        </a>
        <a className="nav-item" href="../pages/MapPage.js">
          Map
        </a>
        <a className="nav-item" href="../pages/about.js">
          About
        </a>
      </LeftNav>
      <MidNav>
        <a className="nav-item" href="../pages/MapPage.js">
          GuardNav
        </a>
      </MidNav>
      <RightNav>
        <a className="nav-item" href="../index.html">
          Help
        </a>
      </RightNav>
    </NavBarContainer>
  );
};

export default NavBar;
