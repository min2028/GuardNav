import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import Image from "../resources/walk-in-city.png";
import {
  TitleTag,
  LadingPageInnerContainer,
  LadingPageOuterContainer,
} from "../components/landingPage/LandingPageTags";
import { useTheme } from "@emotion/react";
import PlanTripButton from "../components/landingPage/PlanTripButton";
import SignInButton from "../components/landingPage/SignInButton";
import NavBar from "../components/basePage/NavBar";
import useMediaQuery from '@mui/material/useMediaQuery';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 90px;
  flex: 1;
  z-index: 1;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const LandingPageOuterContainer = styled(LadingPageOuterContainer)`
  height: 100vh; /* Set height to 100% of viewport height */
`;

const LandingPageInnerContainer = styled(LadingPageInnerContainer)`
    background-color: rgba(26, 25, 26)
`;

const HomeTitle = styled(TitleTag)`
  background-color: rgba(26, 25, 26, 0.8);
  padding: 15px;
`;

const ImageContainer = styled.div`
  flex: 1.5;
  position: relative;

  > img {
    height: 120%;
    width: fit-content;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 0;
  }
`;

const TimeComponent = styled.div`
  color: white;
`;

const Home = () => {
  const theme = useTheme();

  const isMobileScreen = useMediaQuery((theme) => {
    return theme.breakpoints.down('md');
  });

  return (
    <>
      <NavBar />
      <LandingPageOuterContainer>
        <LandingPageInnerContainer>
          <ContentContainer>
            <HomeTitle theme={theme}>
              Plan a safe trip in Vancouver
            </HomeTitle>
            <PlanTripButton />
            <SignInButton />
          </ContentContainer>
          {!isMobileScreen &&
            <ImageContainer>
              <img src={Image} />
            </ImageContainer>
          }
        </LandingPageInnerContainer>
        <ImageContainer>
          <img src={Image} />
        </ImageContainer>
      </LandingPageOuterContainer>
    </>
  );
};

export default Home;