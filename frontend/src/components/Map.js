import React, { useEffect, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  HeatmapLayer,
} from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPosition, resetLocation } from "../reducers/LocationReducer";
import PageContainer from "./PageContainer";
import LoadingSpinner from "./LoadingSpinner";
import WeatherInformation from "./WeatherInformation";
import { styled, useTheme } from "@mui/material/styles";
import styleComp from "@emotion/styled";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import SearchIcon from "@mui/icons-material/Search";
import { Fab } from "@mui/material";
import SideNavBar from "./SideNavBar";
import SearchBar from "./SearchBar";
import HistoryCard from "./HistoryCard";
import { csv } from "d3";
import { calculateWeight } from "../utilities/DangerScoreCalculator";
import proj4 from "proj4";

const drawerWidth = 240;

// This lat/lon conversion logic is from chatGPT
const utmZone10 =
  "+proj=utm +zone=10 +ellps=WGS84 +datum=WGS84 +units=m +no_defs";

const MapTopContainer = styleComp.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
    padding: ${({ theme }) =>
      `${theme.margins.values.marginSides} ${theme.margins.values.marginTopBottom}`};
`;

const MapTopLeft = styleComp.div`
    display: flex;
    justify-content: start;
    width: 50%;
`;

const MapSearch = styleComp.div`
    display: flex;
    flex-flow: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    margin-left: ${({ theme }) => `${theme.margins.values.marginSides}`};
    width: 60%;
`;

const MapTopRight = styleComp.div`
    display: flex;
    justify-content: start;
`;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Map = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [crimeData, setCrimeData] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const { isLoaded, google } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries: ["places", "visualization"],
  });

  const { currentPosition } = useSelector((state) => state.location);

  console.log(isLoaded, currentPosition);

  useEffect(() => {
    const getCurrentPosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            dispatch(setCurrentPosition({ lat: latitude, lng: longitude }));
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
            let [lng, lat] = proj4(utmZone10).inverse([x, y]);
            return {
              location: new window.google.maps.LatLng(lat, lng),
              weight: weight,
            };
          }
          return null;
        });
        newData = newData.filter((item) => item !== null);

        // Normalize the weights
        newData = newData.map((item) => {
          return {
            ...item,
            weight:
              ((item.weight - minWeight) / (maxWeight - minWeight)) * 10 + 1,
          };
        });
        let weights = newData.map((item) => item.weight);

        let nullWeightsCount = weights.filter((w) => isNaN(w)).length;

        // count null objects
        let nullObjectsCount = newData.filter((item) => item === null).length;

        console.log("Null Weights Count:", nullWeightsCount);
        console.log("Null Objects Count:", nullObjectsCount);
        console.log(weights);
        console.log("blehhhh");
        console.log(newData);
        console.log("blehhhh");
        setCrimeData(newData);
      });
    }
  }, [isLoaded, google]);

  return (
    <PageContainer>
      {isLoaded && currentPosition ? (
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
              zoom={16}
              center={currentPosition}
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
                  radius: 50,
                }}
              />

              <MapTopContainer>
                <MapTopLeft>
                  <SideNavBar />
                  <MapSearch>
                    <SearchBar />
                    <HistoryCard />
                    <HistoryCard />
                    <HistoryCard />
                  </MapSearch>
                </MapTopLeft>
                <MapTopRight>
                  <WeatherInformation />
                </MapTopRight>
                <Marker position={currentPosition} />
              </MapTopContainer>
            </GoogleMap>
          )}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </PageContainer>
  );
};

export default Map;
