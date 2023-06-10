import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function TripList() {
  const trips = useSelector((state) => state.trips);
    //<Link to={`/trip/${trip.id}`}>Details</Link>
  return (
    <div className="dropdown">
      <button className="dropbutton">Trip List</button>
      <div className="dropdown-content">
        {trips.map((trip) => (
          <div key={trip.id}>
            <h3>{trip.name}</h3>
            <p>From: {trip.startLocation}</p>
            <p>To: {trip.endLocation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TripList;
