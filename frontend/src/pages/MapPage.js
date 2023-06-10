import {
  Map,
  PageContainer,
  WeatherInformation,
  HistoryCard,
} from "../components";
import SideNavBar from "../components/SideNavBar";
import SearchTrips from "../components/SearchTrips";

const MapPage = () => {
  return (
    <PageContainer>
      <SideNavBar />
      <SearchTrips />
      <Map />
    </PageContainer>
  );
};

export default MapPage;