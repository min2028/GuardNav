import React from "react";
import { useSelector } from "react-redux";
import { Box, List, Typography } from "@mui/material";
import Trip from "./Trip";

const TripsList = () => {
  const trips = useSelector((state) => state.trips.trips);

  return (
    <Box p={2}>
      <Typography variant="h4" mb={2}>
        Trips
      </Typography>
      <List>
        {trips.map((trip) => (
          <Trip
            key={trip.id}
            trip={trip}
          />
        ))}
      </List>
    </Box>
  );
};

export default TripsList;
