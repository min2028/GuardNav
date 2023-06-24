import React from "react";
import { useDispatch } from "react-redux";
import { Card, CardContent, Typography } from "@mui/material";
import { selectTrip } from "../reducers/TripsReducer";

const Trip = ({ trip }) => {
  const dispatch = useDispatch();

  const handleTripClick = () => {
    dispatch(selectTrip(trip));
  };

  return (
    <Card
      style={{ background: "rgba(255, 255, 255, 0.4)" }}
      onClick={handleTripClick}
    >
      <CardContent>
        <Typography variant="h5">{trip.name}</Typography>
        <Typography variant="body1" color="textSecondary">
          {trip.date}
        </Typography>
        <Typography variant="body1">From: {trip.from}</Typography>
        <Typography variant="body1">To: {trip.to}</Typography>
      </CardContent>
    </Card>
  );
};

export default Trip;
