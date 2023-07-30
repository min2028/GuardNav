import React from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  DirectionsService,
  HeatmapLayer,
} from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import PageContainer from "../basePage/PageContainer";
import WeatherInformation from "./WeatherInformation";
import { useTheme } from "@mui/material/styles";
import styleComp from "@emotion/styled";
import { css } from "@emotion/react";

import { PageSearchBar, HistoryCard, HistoryList, ProfileDropdown } from "../index";
import { setFrom, setTo } from "../../reducers/TripReducer";

const MapTopContainer = styleComp.div`
    display: flex;
    align-items: start;
    height: 100%;
    justify-content: space-between;
`;

const MapTopLeft = styleComp.div`
    display: flex;
    justify-content: flex-start;
    width: 50vw;
    height: 100%;

    transition: all 0.4s ease-in-out;
    ${({ hide }) =>
      hide &&
      css`
        transform: translateX(-47%);
      `}
`;

const MapSearch = styleComp.div`
    display: flex;
    flex-flow: column;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
    width: 60%;
    height: 100%;
    margin: ${({ theme }) =>
      `${theme.margins.values.marginSides} ${theme.margins.values.marginTopBottom}`};
`;

const MapTopRight = styleComp.div`
    z-index: 2;
    display: flex;
    justify-content: start;
    gap: 1.5rem;
    padding: ${({ theme }) =>
      `${theme.margins.values.marginSides} ${theme.margins.values.marginTopBottom}`};
`;

const Map = ({
  openRouteDrawer,
  isRouteDrawerOpen,
  directions,
  directionsServiceOptions,
  directionsCallback,
  showAllHistory,
  crimeData,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { currentPosition } = useSelector((state) => state.location);

  const { history } = useSelector((state) => state);

  const onHistoryCardClick = (from, to) => {
    dispatch(setFrom(from));
    dispatch(setTo(to));

    console.log(from, to);
  
    openRouteDrawer();
  };

  const onSearch = (to) => {
    dispatch(setTo(currentPosition));
    dispatch(setTo(to));
    openRouteDrawer();
  };

  const UserMarker = {
    path: window.google.maps.SymbolPath.CIRCLE,
    fillColor: '#4285F4',
    fillOpacity: 1,
    scale: 8,
    strokeColor: 'white',
    strokeWeight: 2,
};

const BorderMarker = {
    path: window.google.maps.SymbolPath.CIRCLE,
    fillColor: '#4285F4',
    fillOpacity: 0.3,
    scale: 16,
    strokeWeight: 0,
};

  return (
    <PageContainer style={{ flexGrow: 1 }}>
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {currentPosition && (
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "100%",
            }}
            center={currentPosition}
            zoom={15}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
              rotateControl: true,
            }}
          >
            <HeatmapLayer
              data={crimeData.map((item) => ({
                location: item.location,
                weight: item.weight,
              }))}
              options={{
                radius: 10,
              }}
            />
            <MapTopContainer>
              <MapTopLeft hide={isRouteDrawerOpen}>
                <MapSearch>
                  <PageSearchBar onSearch={onSearch} />
                  <HistoryList
                    onClick={onHistoryCardClick}
                    history={history}
                    expanded={showAllHistory}
                  />
                </MapSearch>
                <WeatherInformation />
              </MapTopLeft>
              <MapTopRight>
                <ProfileDropdown />
              </MapTopRight>
              {isRouteDrawerOpen && (
                <>
                  <DirectionsService
                    options={directionsServiceOptions}
                    callback={directionsCallback}
                  />
                  <DirectionsRenderer
                    directions={directions}
                    preserveViewport={true}
                  />
                </>
              )}
              <Marker position={currentPosition} icon={UserMarker} />
              <Marker position={currentPosition} icon={BorderMarker} />
            </MapTopContainer>
          </GoogleMap>
        )}
      </div>
    </PageContainer>
  );
};

export default Map;
