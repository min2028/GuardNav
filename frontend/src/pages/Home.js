import React, {useState, useEffect} from "react";
import styled from "@emotion/styled";
import Image from "../resources/walk-in-city.png";
import {
    TitleTag,
    LadingPageInnerContainer,
    LadingPageOuterContainer,
} from "../components/landingPage/LandingPageTags";
import {useTheme} from "@emotion/react";
import PlanTripButton from "../components/landingPage/PlanTripButton";
import AuthButton from "../components/landingPage/AuthButton";
import SignInButton from "../components/landingPage/SignInButton";
import NavBar from "../components/basePage/NavBar";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 90px;
  flex: 1;
  z-index: 1;
`;

const ImageContainer = styled.div`
  flex: 2;
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

    return (
        <>
            <NavBar />
            <LadingPageOuterContainer>
                <LadingPageInnerContainer>
                    <ContentContainer>
                        <TitleTag theme={theme}>
                            Plan a safe trip in Vancouver
                        </TitleTag>
                        <PlanTripButton/>
                        <SignInButton />
                    </ContentContainer>
                    <ImageContainer>
                        <img src={Image}/>
                    </ImageContainer>
                </LadingPageInnerContainer>
            </LadingPageOuterContainer>
        </>
    );
};

export default Home;
