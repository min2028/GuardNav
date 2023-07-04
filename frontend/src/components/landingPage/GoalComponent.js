import styled from "@emotion/styled";
import Image from "../../resources/GuyUsingComp.png";
import {
    TitleTag,
    DescriptionTag,
    LadingPageInnerContainer,
    LadingPageOuterContainer,
} from "./LandingPageTags";
import { useTheme } from "@emotion/react";

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    z-index: 1;
`;

const ImageContainer = styled.div`
    flex: 2;
    position: relative;
    > img {
        height: 100%;
        width: fit-content;
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 0;
    }
`;

const GoalComponent = () => {
    const theme = useTheme();
    return (
        <LadingPageOuterContainer>
            <LadingPageInnerContainer>
                <ContentContainer>
                    <TitleTag theme={theme}>Our Goal</TitleTag>
                    <DescriptionTag theme={theme} size={"1.2rem"}>
                        1. Safe Route Planning
                    </DescriptionTag>
                    <DescriptionTag theme={theme} size={"1.2rem"}>
                        2. User Friendly UI/UX design
                    </DescriptionTag>
                    <DescriptionTag theme={theme} size={"1.2rem"}>
                        3. Visualization of Safety
                    </DescriptionTag>
                    <DescriptionTag theme={theme} size={"1.2rem"}>
                        4. Utilize Real Crime Data to Achieve Above Points
                    </DescriptionTag>
                </ContentContainer>
                <ImageContainer>
                    <img src={Image} />
                </ImageContainer>
            </LadingPageInnerContainer>
        </LadingPageOuterContainer>
    );
};

export default GoalComponent;
