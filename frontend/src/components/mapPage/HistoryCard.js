import RestoreIcon from "@mui/icons-material/Restore";
import styled from "@emotion/styled";
import EastIcon from "@mui/icons-material/East";
import StarIcon from '@mui/icons-material/Star';

import { formatTime } from "../../utility/TimeUtil";

const HistoryCardContainer = styled.div`
    grid-template-areas: "logo content";
    grid-template-columns: 100px 1fr;
    background-color: ${(props) => props.theme.palette.risk[props.risk]};
    opacity: 0.9;
    width: 100%;
    border-radius: 12px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    margin: 0.5rem 0px;
    z-index: 4;
    cursor: pointer;
    transition: 0.1s;
    display: grid;
    white-space: nowrap;

    &:hover {
        opacity: 1;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.5);
    }

`;

const LogoContainer = styled.div`
    grid-area: logo;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    & > svg {
        color: black;
        font-size: 2rem;
        transition: 0.1s;

        &:hover {
            color: white;
        }
    }
`;

const ContentContainer = styled.div`
    grid-area: content;
    padding: 10px 0px;
`;

const ContentTitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px 0px;
    padding-right: 1.5rem;
    justify-content: space-between;
    gap: 30px;
`;

const ContentTitle = styled.h3`
    font-size: 1.5rem;
    margin: 0px;
    font-weight: 600;
    color: ${(props) => props.theme.palette.primary.main};
`;

const ContentDesciptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px 0px;
    padding-right: 1.5rem;
    justify-content: space-between;
`;

const ContentDesciption = styled.p`
    font-size: 0.75rem;
    margin: 0px;
    font-weight: 500;
    color: ${(props) => props.theme.palette.primary.main};
    width: 40%;
`;

const riskMap = {
    low: "Safest",
    mid: "Balanced",
    high: "Fastest",
    veryhigh: "Very High",
    extreme: "Extreme",
};


const HistoryCard = (props) => {
    const { risk = 0, time, from, to, onClick, favourite, onFavouriteClick} = props;

    return (
        <HistoryCardContainer risk={risk} onClick={onClick}>
            <LogoContainer onClick={
                (e) => {
                    e.stopPropagation();
                    onFavouriteClick();
                }
            }>
                {favourite ? (
                    <StarIcon />
                ) : (
                    <RestoreIcon />
                )}
            </LogoContainer>
            <ContentContainer>
                <ContentTitleContainer>
                    <ContentTitle> {riskMap[risk]} </ContentTitle>
                    <ContentTitle> {formatTime(time)} </ContentTitle>
                </ContentTitleContainer>
                <ContentDesciptionContainer>
                    <ContentDesciption>
                        {from?.formatted_address?.split(",")[0]}
                    </ContentDesciption>
                    <EastIcon
                        style={{
                            color: "black",
                            width: "0.75rem",
                            height: "0.75rem",
                        }}
                    />
                    <ContentDesciption style={{textAlign: 'end'}}>
                        {to?.formatted_address?.split(",")[0]}
                    </ContentDesciption>
                </ContentDesciptionContainer>
            </ContentContainer>
        </HistoryCardContainer>
    );
};

export default HistoryCard;
