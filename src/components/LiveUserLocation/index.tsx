import React from "react";
import { Marker } from "react-map-gl";
import "./live-user-location.css";

export const LiveUserLocation = (props: {
  longitude: number;
  latitude: number;
}) => {
  if (props.longitude === 0 || props.latitude === 0) {
    return null;
  }
  return (
    <Marker
      style={{ zIndex: 2 }}
      longitude={props.longitude}
      latitude={props.latitude}
    >
      <div
        //   style={{ borderColor: colorMode === "light" ? "white" : "black" }}
        className="you"
      />
    </Marker>
  );
};
