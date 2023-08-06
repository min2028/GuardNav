import styled from '@emotion/styled';
import { DescriptionTag, LadingPageInnerContainer, LadingPageOuterContainer } from './landingPage/LandingPageTags';
import { useTheme } from '@emotion/react';


const LadingPageInnerContainerNew = styled(LadingPageInnerContainer)`
    height:100%;
    ${(props) => `
        @media (max-width: ${props.theme.breakpoints.values['md']}px) {
            display: block;
        }
    `}
`;

const ContentCard = styled.div`
    flex: 1;
    ${(props) => props.even ? 'border-left: 1px #747474 solid;' : ''}
    ${(props) => props.even ? 'border-right: 1px #747474 solid;' : ''}
    padding: 0rem 2rem;
    ${(props) => props.first ? 'padding-left: 0px;' : ''}

    ${(props) => `
        @media (max-width: ${props.theme.breakpoints.values.md}px) {
            border: unset;
            padding: 1.5rem 0rem;
        }
    `}
`;

const List = styled.ul`
    color: ${props => props.theme.palette.secondary.main}; 
`;



const Requirements = () => {
    const theme = useTheme();
    console.log(theme.breakpoints.values.md);
    return (
        <LadingPageOuterContainer>
            <LadingPageInnerContainerNew theme = {theme}>
                <ContentCard theme = {theme} first = {true}>
                    <DescriptionTag theme = {theme}>
                        Minimum Requirements
                    </DescriptionTag>
                    <List>
                        <li>
                            <DescriptionTag theme = {theme}>
                                Create a simple CRUD (Create, Read, Update, Delete) functionality to enable users to manage trips.
                            </DescriptionTag>
                        </li>
                        <List>
                            <li>
                                <DescriptionTag theme = {theme}>
                                    Users should be able to add trips by specifying a pair of source and destination locations.
                                </DescriptionTag>
                            </li>
                            <li>
                                <DescriptionTag theme = {theme}>
                                    Each trip should include the suggested routes, the primary route selected by the user, and the name of the route.
                                </DescriptionTag>
                            </li>
                            <li>
                                <DescriptionTag theme = {theme}>
                                    Users should be able to update the primary route and the name of the trip, similar to the timeline functionality in Google Maps.
                                </DescriptionTag>
                            </li>
                            <li>
                                <DescriptionTag theme = {theme}>
                                Users should be able to delete trips from their history.
                                </DescriptionTag>
                            </li>
                        </ List>
                        <li>
                            <DescriptionTag theme = {theme}>
                                Utilize historic crime data to create the initial dataset for generating a heatmap.
                            </DescriptionTag>
                        </li>
                        <List>
                            <li>
                                <DescriptionTag theme = {theme}>
                                    The heatmap should display risk levels across Vancouver based on the crime data.
                                </DescriptionTag>
                            </li>
                        </ List>
                        <li>
                            <DescriptionTag theme = {theme}>
                                Implement a grid system to validate hazard reports.
                            </DescriptionTag>
                        </li>
                        <List>
                            <li>
                                <DescriptionTag theme = {theme}>
                                    The hazard reports entered by users should be validated against a grid system.
                                </DescriptionTag>
                            </li>
                        </ List>
                        <li>
                            <DescriptionTag theme = {theme}>
                                Develop a basic user interface (UI) that includes a map displaying the generated heatmap and allows users to enter hazard reports.
                            </DescriptionTag>
                        </li>
                    </ List>
                </ContentCard>
                <ContentCard theme = {theme} even = {true}>
                    <DescriptionTag theme = {theme}>
                        Standard Goals
                    </DescriptionTag>
                    <List>
                        <li>
                            <DescriptionTag theme = {theme}>
                                Integrate route planning that avoids high risk areas.
                            </DescriptionTag>
                        </li>
                        <li>
                            <DescriptionTag theme = {theme}>
                                Multiple route suggestions with varying levels of risk.
                            </DescriptionTag>
                        </li>
                        <li>
                            <DescriptionTag theme = {theme}>
                                Risk categorization. [intensity weighted]
                            </DescriptionTag>
                        </li>
                    </ List>
                </ContentCard>
                <ContentCard theme = {theme}>
                    <DescriptionTag theme = {theme}>
                        Stretch Goals
                    </DescriptionTag>
                    <List>
                        <li>
                            <DescriptionTag theme={theme}>
                            Implement a grid representation to validate hazard reports.
                            </DescriptionTag>
                        </li>
                        <li>
                            <DescriptionTag theme={theme}>
                            Use aggregated number of reports in the area for the validation.
                            </DescriptionTag>
                        </li>
                        <li>
                            <DescriptionTag theme={theme}>
                            User authentication and user profiles.
                            </DescriptionTag>
                        </li>
                        <li>
                            <DescriptionTag theme={theme}>
                            User preferences for risk levels and categories.
                            </DescriptionTag>
                        </li>
                        <li>
                            <DescriptionTag theme={theme}>
                            Alert system if off-route.
                            </DescriptionTag>
                        </li>
                        <li>
                            <DescriptionTag theme={theme}>
                            CRUD to enable users to add, update, and delete their own reports of hazards and risks to be added to the database.
                            </DescriptionTag>
                        </li>
                        <li>
                            <DescriptionTag theme={theme}>
                            Enhance manual crime entry functionality with entry validation.
                            </DescriptionTag>
                        </li>
                        <li>
                            <DescriptionTag theme={theme}>
                            Real-time alerts of new hazards along the route.
                            </DescriptionTag>
                        </li>
                        <li>
                            <DescriptionTag theme={theme}>
                            Send directions to user via SMS.
                            </DescriptionTag>
                        </li>
                        <li>
                            <DescriptionTag theme={theme}>
                                Friendly design for mobile users
                            </DescriptionTag>
                        </li>
                        </List>
                </ContentCard>
            </LadingPageInnerContainerNew>
        </LadingPageOuterContainer>
    )
}

export default Requirements;