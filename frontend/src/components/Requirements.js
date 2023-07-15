import styled from '@emotion/styled';
import { DescriptionTag, LadingPageInnerContainer, LadingPageOuterContainer } from './landingPage/LandingPageTags';
import { useTheme } from '@emotion/react';


const LadingPageInnerContainerNew = styled(LadingPageInnerContainer)`
    height: unset;
`;

const ContentCard = styled.div`
    flex: 1;
    ${(props) => props.even ? 'border-left: 1px #747474 solid;' : ''}
    ${(props) => props.even ? 'border-right: 1px #747474 solid;' : ''}
    padding: 0rem 2rem;
    ${(props) => props.first ? 'padding-left: 0px;' : ''}
`;

const List = styled.ul`
    color: ${props => props.theme.palette.secondary.main}; 
`;



const Requirements = () => {
    const theme = useTheme();
    return (
        <LadingPageOuterContainer>
            <LadingPageInnerContainerNew>
                <ContentCard first = {true}>
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
                <ContentCard even = {true}>
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
                <ContentCard>
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
            </LadingPageInnerContainerNew>
        </LadingPageOuterContainer>
    )
}

export default Requirements;