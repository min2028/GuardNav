import { useState } from "react";
import { Autocomplete, TextField, Box } from "@mui/material";
import TripsList from "./TripsList";
import TripDetail from "./TripDetails";

const SearchTrips = () => {
  const [showTripsList, setShowTripsList] = useState(false);

  return (
    <Box
      position="absolute"
      top={10}
      left={30}
      zIndex={1}
      style={{ background: "rgba(255, 255, 255, 0.3)" }}
    >
      <Autocomplete
        freeSolo
        disableClearable
        options={[]}
        renderInput={(params) => (
          <TextField
            {...params}
            onFocus={() => setShowTripsList(true)}
            onBlur={() => setShowTripsList(false)}
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: "search" }}
          />
        )}
      />
      {showTripsList && <TripsList />}
      <TripDetail />
    </Box>
  );
};

export default SearchTrips;
