import { Map, PageContainer, WeatherInformation, SearchBar } from "../components";
import SideNavBar from "../components/SideNavBar";

const MapPage = () => {
    return (
        <PageContainer>
            <SideNavBar />
            <Map />
        </PageContainer>
    );
};

export default MapPage;