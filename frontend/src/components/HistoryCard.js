import RestoreIcon from '@mui/icons-material/Restore';
import styled from '@emotion/styled';
import EastIcon from '@mui/icons-material/East';

const HistoryCardContainer = styled.div`
    display: grid;
    grid-template-areas: 'logo content';
    grid-template-columns: 100px 1fr;
    background-color: ${(props) => props.risk === 0 ? "#FFE8E8" : "#FF7878"};
    opacity: 0.8;
    width: 50%;
    border-radius: 5px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    margin: 1rem 0px;
    z-index: 4;
`;

const LogoContainer = styled.div`
    grid-area: logo;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
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
`;

const ContentTitle = styled.h3`
    font-size: 1.5rem;
    margin: 0px;
    font-weight: 600;
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
`;

const HistoryCard = (props) => {
    const { risk = 0, duration, origin, destination } = props;

    return (
        <HistoryCardContainer risk = {risk}>
            <LogoContainer>
                <RestoreIcon style={{ color: 'black', width: "2rem", height: "2rem" }}  />
            </LogoContainer>
            <ContentContainer>
                <ContentTitleContainer>
                    <ContentTitle> { risk === 0 ? "Low Risk" : "High Risk"} </ContentTitle>
                    <ContentTitle> 15 minutes </ContentTitle>
                </ContentTitleContainer>
                <ContentDesciptionContainer>
                    <ContentDesciption>
                        Home
                    </ContentDesciption>
                    <EastIcon style={{ color: 'black', width: "0.75rem", height: "0.75rem" }}/>
                    <ContentDesciption>
                        Downtown
                    </ContentDesciption>
                </ContentDesciptionContainer>
            </ContentContainer>
        </HistoryCardContainer>
    )
}

export default HistoryCard;