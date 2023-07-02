import React from "react";
import styled from "styled-components";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

const NavBarContainer = styled.div`
  background-color: black;
  display: flex;
  align-items: center;
  height: 70px;
  width: 100%;
  padding: 1.5em;
  font-size: 17px;
  text-align: center;
  font-weight: bold;
`;

const LeftNav = styled.div`
  margin-left: auto;

  a {
    color: #f2f2f2;
    margin: 10px;
    text-decoration: none;
  }
`;

const MidNav = styled.div`
  margin: auto;
  align-self: center;

  a {
    letter-spacing: 0.245em;
    color: #f2f2f2;
    text-decoration: none;
  }
`;

const RightNav = styled.div`
  margin: auto;
  align-self: center;

  a {
    color: #f2f2f2;
    text-decoration: none;
  }
`;

const NavBar = (props) => {
    const scrollToRequirements = (event) => {
        scroll.scrollTo("requirements", {
            smooth: true,
            offset: -70,
        });
    };
    return (
        <NavBarContainer>
            <LeftNav>
                <a className="nav-item" href="/">
                    Home
                </a>
                <a className="nav-item" href="/Map">
                    Map
                </a>
                <ScrollLink
                    className="nav-item"
                    to="requirements"
                    smooth={true}
                    offset={-70}
                    duration={500}
                    onClick={scrollToRequirements}
                >
                    About
                </ScrollLink>
            </LeftNav>
            <MidNav>
                <a className="nav-item" href="/Map">
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
