import React from "react";
import { io } from "socket.io-client";
import { Marker } from "react-map-gl";
import { MdOutlineDirectionsTransitFilled } from "react-icons/md";
import "./live-marker.css";
import { Box } from "@mantine/core";
import { isMobile } from "react-device-detect";

const socket = io(window.location.origin);

const LiveMarker = (props: {
  vehicle: any;
  isDragging: boolean;
  route: any;
  setLineRoute(s: any): void;
}) => {
  const [vehicle, setVehicle] = React.useState(props.vehicle);
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    socket.on(props.vehicle.id, ({ data }: { data: any }) => {
      const parsed = JSON.parse(data);
      if (parsed.id === props.vehicle.id) {
        setVehicle(parsed);
        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimating(false);
        }, 200);
      }
    });
  }, []);

  return (
    <Marker
      key={`marker-${vehicle.id}`}
      longitude={vehicle.attributes.longitude}
      latitude={vehicle.attributes.latitude}
      anchor="bottom"
      style={{
        willChange: "transform",
        // @ts-ignore
        transition:
          isAnimating && !props.isDragging && "transform 200ms ease-in-out",
      }}
    >
      <Box
        className="marker"
        onClick={() => {
          console.log({ vehicle, route: props.route });
          props.setLineRoute({ route: props.route, vehicle: vehicle });
        }}
        sx={(theme) => ({
          backgroundColor: `#${props.route?.attributes?.color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 100,
          opacity: 0.8,
          width: 20,
          height: 20,
          boxShadow: theme.shadows.lg,
        })}
      >
        <MdOutlineDirectionsTransitFilled color="white" />
      </Box>
    </Marker>
  );
};

export default React.memo(LiveMarker);
