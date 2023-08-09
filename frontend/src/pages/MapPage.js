import React, { useState, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import {
  Map,
  PageContainer,
  SideNavBar,
  RouteDrawer,
  LoadingSpinner,
  TermsOfService,
} from "../components";
import { setCurrentPosition, resetLocation } from "../reducers/LocationReducer";
import { setFrom, setTo } from "../reducers/TripReducer";
import { csv } from "d3";
import { filterCrimeData } from "../utilities/RouteSafePointsProvider";
import { calculateWeight } from "../utilities/DangerScoreCalculator";
import proj4 from "proj4";
import styled from "styled-components";
import { formatTime } from "../utility/TimeUtil";
import { setHistory } from "../reducers/HistoryReducer";
import { setSavedLocation } from "../reducers/SavedLocationReducer";

const Content = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
`;

const MapPage = ({ isLoaded, google }) => {
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);

  const saved_locations = setSavedLocation(useSelector((state) => state.user));
  const addresses = saved_locations.payload.saved_location;

  const from = useSelector((state) => state.trip.from);
  const to = useSelector((state) => state.trip.to);

  const [routeDrawerOpen, setRouteDrawerOpen] = useState(false);
  const [option, setOption] = useState("safest");
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [crimeData, setCrimeData] = useState([]);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [hasAgreedToS, setHasAgreedToS] = useState(false);

  const [directions, setDirections] = useState(null);
  let count = React.useRef(0);

  const [filteredCrimeData, setFilteredCrimeData] = useState([]);
  const [weightLimit, setWeightLimit] = useState(6.0);
  useEffect(() => {
    if (from && to && weightLimit < 10.0 && crimeData.length > 0) {
      const newFilteredData = filterCrimeData(from, to, weightLimit, crimeData);
      setFilteredCrimeData(newFilteredData);
    }
  }, [from, to, weightLimit, crimeData]);

  const directionsServiceOptions = {
    destination: {
      lat: to?.lat || 0,
      lng: to?.lng || 0,
    },
    origin: {
      lat: from?.lat,
      lng: from?.lng,
    },
    travelMode: "WALKING",
    optimizeWaypoints: true,
  };

  if (weightLimit < 10.0) {
    directionsServiceOptions.waypoints = filteredCrimeData.map((item) => ({
      location: item.location,
    }));
  }

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === "OK" && count.current < 2) {
        count.current++;

        // combine the legs of the route
        if (response) {
          const route = response.routes[0];
          const legs = route.legs;
          let combinedLegs = [];
          let totalDistance = 0;
          let totalDuration = 0;
          legs.forEach((leg) => {
            combinedLegs = combinedLegs.concat(leg.steps);
            totalDistance += leg.distance.value;
            totalDuration += leg.duration.value;
          });
          const newRoute = {
            ...route,
            legs: [
              {
                ...legs[0],
                steps: combinedLegs,
                end_address: legs[legs.length - 1].end_address,
                end_location: legs[legs.length - 1].end_location,
                distance: {
                  text: (totalDistance / 1000).toFixed(2) + " km",
                  value: totalDistance,
                },
                duration: {
                  text: formatTime(totalDuration),
                  value: totalDuration,
                },
              },
            ],
          };
          response.routes[0] = newRoute;
        }

        // remove the "Destination will be on the left/right" text except for the last step
        const newSteps = response.routes[0].legs[0].steps.filter(
          (step, index) => {
            if (index === response.routes[0].legs[0].steps.length - 1) {
              return true;
            }
            return !step.instructions.includes("Destination will be");
          }
        );

        response.routes[0].legs[0].steps = newSteps;

        setDirections(response);
      } else {
        count.current = 0;
      }
    }
  };

  useEffect(() => {
    const getCurrentPosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            dispatch(
              setCurrentPosition({
                lat: latitude,
                lng: longitude,
              })
            );

            dispatch(setFrom({ lat: latitude, lng: longitude }));
          },
          (error) => {
            console.log(error);
            dispatch(resetLocation());
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
        dispatch(resetLocation());
      }
    };

    getCurrentPosition();
  }, [dispatch]);

  const openRouteDrawer = () => {
    setRouteDrawerOpen(true);
  };
  const { currentPosition } = useSelector((state) => state.location);

  useEffect(() => {
    if (isLoaded) {
      csv("/data/temp_data3.csv").then((data) => {
        let newData = data.map((row) => {
          return {
            location: new window.google.maps.LatLng(
              parseFloat(row.latitude),
              parseFloat(row.longitude)
            ),
            weight: parseFloat(row.weight),
          };
        });

        newData = newData.filter((item) => item !== null);

        setCrimeData(newData);
      });
    }
  }, [isLoaded, google]);

  useEffect(() => {
    if (userState) {
      dispatch(setHistory(userState.history || []));
    }
  }, [userState]);

  const handleOptionChange = (option) => {
    if (option === "safest") {
      setWeightLimit(3.0);
    } else if (option === "balanced") {
      setWeightLimit(6.0);
    } else if (option === "fastest") {
      setWeightLimit(10.0);
    }
  };

  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessOpen(false);
  };

  const handleAgreement = () => {
    setHasAgreedToS(true);
  };

  if (!hasAgreedToS) {
    return <TermsOfService onAgree={handleAgreement} />;
  }

  return (
    <PageContainer>
      {!isLoaded || !currentPosition ? (
        <LoadingSpinner />
      ) : (
        <>
          <SideNavBar
            setShowAllHistory={(value) => {
              setShowAllHistory(value);

              const historyList =
                document.getElementsByClassName("history-list");
              if (historyList.length > 0) {
                historyList[0].scrollTop = 0;
              }
            }}
            showAllHistory={showAllHistory}
          />
          <Content>
            <RouteDrawer
              open={routeDrawerOpen}
              onClose={() => {
                setTo(null);
                setRouteDrawerOpen(false);

                setTimeout(() => {
                  setOption("safest");
                }, 500);
              }}
              option={option}
              setOption={setOption}
              isLoaded={isLoaded}
              directions={directions}
              openSuccessMessage={() => setSuccessOpen(true)}
              setSuccessMessage={setSuccessMessage}
              handleOptionChange={handleOptionChange}
            />
            <Map
              openRouteDrawer={openRouteDrawer}
              isLoaded={isLoaded}
              isRouteDrawerOpen={routeDrawerOpen}
              directions={directions}
              directionsServiceOptions={directionsServiceOptions}
              directionsCallback={directionsCallback}
              crimeData={crimeData}
              showAllHistory={showAllHistory}
              setOption={setOption}
            />
          </Content>
        </>
      )}
      <Snackbar
        open={successOpen}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleSuccessClose}
      >
        <Alert
          onClose={handleSuccessClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default MapPage;
