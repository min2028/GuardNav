import styled from 'styled-components';
import Image from "../../resources/GuyUsingComp.png";
import {
    TitleTag,
    DescriptionTag,
    LadingPageInnerContainer,
    LadingPageOuterContainer,
} from "./LandingPageTags";
import { useTheme } from "@emotion/react";

const GoalTitle = styled(TitleTag)`
    background-color: rgba(26,25,26,0.8);
    padding: 15px;
`;

const GoalDesc = styled(DescriptionTag)`
    background-color: rgba(26,25,26,0.8);
    padding: 15px;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    z-index: 1;
`;

const ImageContainer = styled.div`
    flex: 1.5;
    position: relative;
    > img {
        height: 100%;
        width: fit-content;
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 0;
    }
    ${(props) => `
    @media (max-width: ${props.theme.breakpoints.values.md}px) {
        display: none;
    }
`}
`;

const GoalComponent = () => {
    const theme = useTheme();
    return (
        <LadingPageOuterContainer>
            <LadingPageInnerContainer>
                <ContentContainer>
                    <GoalTitle theme={theme}>Our Goal</GoalTitle>
                    <GoalDesc theme={theme} size={"1.2rem"}>
                        1. Safe Route Planning
                    </GoalDesc>
                    <GoalDesc theme={theme} size={"1.2rem"}>
                        2. User Friendly UI/UX design
                    </GoalDesc>
                    <GoalDesc theme={theme} size={"1.2rem"}>
                        3. Visualization of Safety
                    </GoalDesc>
                    <GoalDesc theme={theme} size={"1.2rem"}>
                        4. Utilize Real Crime Data to Achieve Above Points
                    </GoalDesc>
                </ContentContainer>
                <ImageContainer theme = {theme}>
                    <img src={Image} alt={"Guy using computer"} />
                </ImageContainer>
            </LadingPageInnerContainer>
        </LadingPageOuterContainer>
    );
};

export default GoalComponent;
