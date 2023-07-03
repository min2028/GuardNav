import Image from '../../resources/Programming-amico.png';
import styled from 'styled-components';
import { TitleTag, DescriptionTag, LadingPageInnerContainer, LadingPageOuterContainer } from './LandingPageTags';
import { useTheme } from '@emotion/react';


const ContentContainer = styled.div`
    max-width: 900px;
`;

const MemberContainer = styled.div`
    display: flex;
    margin-top: 3rem;
    flex-wrap: wrap;
`;

const LadingPageInnerContainerNew = styled(LadingPageInnerContainer)`
    flex-flow: column;
    height: unset;
`;

const TitleTagNew = styled(TitleTag)`
    margin-bottom: 1.5rem;
`;

const ImageContainer = styled.div`
    > img {
        width: 125px;
        height: auto;
        border-radius: 50%;
        z-index: 0;
    }
`;


const CardContainer = styled.div`
   flex: 1 0 20%;
   text-align: center;
`;

const TeamMemberCards = ({ name, role, theme }) => (
    <CardContainer>
        <ImageContainer>
            <img src={Image}></img>
            <DescriptionTag theme = {theme}>
                {role}
            </DescriptionTag>
        </ImageContainer>
            <DescriptionTag theme = {theme}>
                {name}
            </DescriptionTag>
    </CardContainer>
);


const MeetTeam = () => {
    const theme = useTheme();
    
    const team = [
        {
            'name': 'Andres Lee',
            'role': 'Dev'
        },
        {
            'name': 'Dickson',
            'role': 'Dev'
        },
        {
            'name': 'Min',
            'role': 'Dev'
        },
        {
            'name': 'Aayush',
            'role': 'Dev'
        },
        {
            'name': 'Roy',
            'role': 'Dev'
        },

    ]

    return (
        <LadingPageOuterContainer>
            <LadingPageInnerContainerNew>
                <ContentContainer>
                    <TitleTagNew theme = {theme}>
                        Meet Our Team
                    </TitleTagNew>
                    <DescriptionTag theme = {theme} size = {'1.2rem'}>
                        GuardNav aims to provide users with a reliable and user-friendly navigation experience, 
                        prioritizing their safety by leveraging historic crime information.
                         With features like safe route planning, data visualization through heat maps, 
                         the app empowers users to make informed decisions while navigating Vancouver 
                         and ensures their confidence in reaching their destinations securely.
                    </DescriptionTag>
                </ContentContainer>
                <MemberContainer>
                    {team.map((member) => (
                        <TeamMemberCards key = {member.name} name = {member.name} role = {member.role} theme = {theme} />
                    ))}
                </MemberContainer>
            </LadingPageInnerContainerNew>
        </LadingPageOuterContainer>
    )
}

export default MeetTeam;