import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

const TripDetail = () => {
    const selectedTrip = useSelector((state) => state.trips.selectedTrip);

    if (!selectedTrip) {
        return <Typography variant="h4">Please select a trip</Typography>;
    }

    return (
        <Box p={2}>
            <Typography variant="h4" mb={2}>
                Trip Detail
            </Typography>
            <Typography variant="h5" mb={1}>
                {selectedTrip.name}
            </Typography>
            <Typography variant="subtitle1" mb={1}>
                From: {selectedTrip.fromLocation}
            </Typography>
            <Typography variant="subtitle1" mb={1}>
                Destination: {selectedTrip.destination}
            </Typography>
            <Typography variant="body1" mb={2}>
                Description:{" "}
                {selectedTrip.description || "No description provided"}
            </Typography>
        </Box>
    );
};

export default TripDetail;
