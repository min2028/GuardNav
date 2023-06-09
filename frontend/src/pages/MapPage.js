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
} from "../components";
import { setCurrentPosition, resetLocation } from "../reducers/LocationReducer";
import { setFrom, setTo } from "../reducers/TripReducer";
import { csv } from "d3";
import { filterCrimeData } from "../utilities/RouteSafePointsProvider";
import { calculateWeight } from "../utilities/DangerScoreCalculator";
import proj4 from "proj4";
import styled from "styled-components";

const Content = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
`;

const MapPage = () => {
  const dispatch = useDispatch();
  const [libraries] = useState(["places", "routes", "visualization"]);
  const { isLoaded, google } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries,
  });

  const from = useSelector((state) => state.trip.from);
  const to = useSelector((state) => state.trip.to);

    const [routeDrawerOpen, setRouteDrawerOpen] = useState(false);
    const [option, setOption] = useState("safest");
    const [successOpen, setSuccessOpen] = useState(false);
    const [crimeData, setCrimeData] = useState([]);
    const [showAllHistory, setShowAllHistory] = useState(false);

  const [directions, setDirections] = useState(null);
  let count = React.useRef(0);

  const [filteredCrimeData, setFilteredCrimeData] = useState([]);
  const weightLimit = 6.0;
  useEffect(() => {
    if (from && to && weightLimit < 10.0 && crimeData.length > 0) {
      const newFilteredData = filterCrimeData(from, to, weightLimit, crimeData);
      console.log(newFilteredData);
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
    waypoints: filteredCrimeData.map((item) => ({ location: item.location })),
    optimizeWaypoints: true,
  };

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === "OK" && count.current < 2) {
        count.current++;
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
        // data = data.filter(
        //   (row) => !(parseFloat(row.X) === 0.0 || parseFloat(row.Y) === 0.0)
        // );
        // let minWeight = Infinity;
        // let maxWeight = -Infinity;
        let newData = data.map((row) => {
          // let x = parseFloat(row.X);
          // let y = parseFloat(row.Y);
          // if (isFinite(x) && isFinite(y)) {
          //   let weight = calculateWeight(row);
          //   if (weight < minWeight) {
          //     minWeight = weight;
          //   }
          //   if (weight > maxWeight) {
          //     maxWeight = weight;
          //   }
          //   // This lat/lon conversion logic is from chatGPT
          //   const utmZone10 =
          //     "+proj=utm +zone=10 +ellps=WGS84 +datum=WGS84 +units=m +no_defs";
          //   let [lng, lat] = proj4(utmZone10).inverse([x, y]);
          //   return {
          //     location: new window.google.maps.LatLng(lat, lng),
          //     weight: weight,
          //   };
          // }
          // return null;
          return {
            location: new window.google.maps.LatLng(
              parseFloat(row.latitude),
              parseFloat(row.longitude)
            ),
            weight: parseFloat(row.weight),
          };
        });

        newData = newData.filter((item) => item !== null);

        // newData = newData.map((item) => {
        //   return {
        //     ...item,
        //     weight:
        //       ((item.weight - minWeight) / (maxWeight - minWeight)) * 10 + 1,
        //   };
        // });
        setCrimeData(newData);
      });
    }
  }, [isLoaded, google]);

  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessOpen(false);
  };

    return (
        <PageContainer>
            {!isLoaded || !currentPosition ? (
                <LoadingSpinner />
            ) : (
                <>
                    <SideNavBar 
                        setShowAllHistory={(value) => {
                            setShowAllHistory(value)

                            const historyList = document.getElementsByClassName("history-list");
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
                            }}
                            option={option}
                            setOption={setOption}
                            isLoaded={isLoaded}
                            directions={directions}
                            openSuccessMessage={() => setSuccessOpen(true)}
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
                    Route saved successfully! Only the 50 most recent routes are saved.
                </Alert>
            </Snackbar>
        </PageContainer>
    );
};

export default MapPage;
