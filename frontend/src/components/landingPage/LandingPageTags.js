import styled from "styled-components";

const TitleTag = styled.h1`
    color: ${(props) => props.theme.palette.secondary.main};
    font-family: ${(props) => props.theme.palette.primary.family};
    margin-top: 0px;
    font-size: 3.5rem;
    ${(props) => {
        return "";
    }}
`;

const DescriptionTag = styled.p`
    color: ${(props) => props.theme.palette.secondary.main};
    font-family: ${(props) => props.theme.palette.primary.family};
    margin-top: 0px;
    ${(props) => (props.size ? "font-size:" + props.size : "")};
`;

const LadingPageInnerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 3.5rem 3rem;
    height: 600px;
`;

const LadingPageOuterContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #1a191a;
`;

export {
    TitleTag,
    DescriptionTag,
    LadingPageInnerContainer,
    LadingPageOuterContainer,
};
