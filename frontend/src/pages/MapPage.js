import React, { useState, useEffect, useMemo } from "react";
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
import { calculateWeight } from "../utilities/DangerScoreCalculator";
import proj4 from "proj4";

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

  const [directions, setDirections] = useState(null);
  let count = React.useRef(0);

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
            dispatch(setCurrentPosition({ lat: latitude, lng: longitude }));

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
      csv("/data/crimedata_csv_AllNeighbourhoods_AllYears.csv").then((data) => {
        data = data.filter(
          (row) => !(parseFloat(row.X) === 0.0 || parseFloat(row.Y) === 0.0)
        );
        let minWeight = Infinity;
        let maxWeight = -Infinity;
        let newData = data.map((row) => {
          let x = parseFloat(row.X);
          let y = parseFloat(row.Y);
          if (isFinite(x) && isFinite(y)) {
            let weight = calculateWeight(row);
            if (weight < minWeight) {
              minWeight = weight;
            }
            if (weight > maxWeight) {
              maxWeight = weight;
            }
            // This lat/lon conversion logic is from chatGPT
            const utmZone10 =
              "+proj=utm +zone=10 +ellps=WGS84 +datum=WGS84 +units=m +no_defs";
            let [lng, lat] = proj4(utmZone10).inverse([x, y]);
            return {
              location: new window.google.maps.LatLng(lat, lng),
              weight: weight,
            };
          }
          return null;
        });

        newData = newData.filter((item) => item !== null);

        newData = newData.map((item) => {
          return {
            ...item,
            weight:
              ((item.weight - minWeight) / (maxWeight - minWeight)) * 10 + 1,
          };
        });
        //let weights = newData.map((item) => item.weight);
        // let nullWeightsCount = weights.filter((w) => isNaN(w)).length;
        // let nullObjectsCount = newData.filter((item) => item === null).length;

        // console.log("Null Weights Count:", nullWeightsCount);
        // console.log("Null Objects Count:", nullObjectsCount);
        // console.log(weights);
        // console.log("blehhhh");
        // console.log(newData);
        // console.log("blehhhh");
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
          <SideNavBar />
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
          />
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
          Your route has been saved!
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default MapPage;
