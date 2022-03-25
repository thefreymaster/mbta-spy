import React from "react";
import { io } from "socket.io-client";
import { Marker } from "react-map-gl";
import {
  MdOutlineDirectionsTransitFilled,
  MdTram,
  MdDirectionsSubway,
  MdDirectionsRailway,
  MdOutlineDirectionsBus,
} from "react-icons/md";
import "./live-marker.css";
import { Box } from "@mantine/core";
import { Route } from "../../interfaces";

const socket = io(window.location.origin);

export const TransitIcon = (props: {
  value: number;
  color?: string;
  style?: any;
  onClick?: any;
}) => {
  const transitTypes = new Map();
  transitTypes.set(
    0,
    <MdTram
      className="marker"
      onClick={props.onClick}
      color={props.color ?? "white"}
      style={{ ...props.style }}
    />
  );
  transitTypes.set(
    1,
    <MdDirectionsSubway
      className="marker"
      onClick={props.onClick}
      color={props.color ?? "white"}
      style={{ ...props.style }}
    />
  );
  transitTypes.set(
    2,
    <MdDirectionsRailway
      className="marker"
      onClick={props.onClick}
      color={props.color ?? "white"}
      style={{ ...props.style }}
    />
  );
  transitTypes.set(
    3,
    <MdOutlineDirectionsBus
      className="marker"
      onClick={props.onClick}
      color={props.color ?? "white"}
      style={{ ...props.style }}
    />
  );

  return <>{transitTypes.get(props.value) ?? transitTypes.get(0)}</>;
};

const LiveMarker = (props: {
  vehicle: any;
  isDragging: boolean;
  route: Route;
  setLineRoute(s: any): void;
}) => {
  const [vehicle, setVehicle] = React.useState(props.vehicle);
  const [isAnimating, setIsAnimating]: any = React.useState();

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
      <TransitIcon
        value={props.route?.attributes?.type}
        style={{
          backgroundColor: `#${props.route?.attributes?.color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 100,
          width: 15,
          height: 15,
          padding: 2
        }}
        onClick={() => {
          console.log({ vehicle, route: props.route });
          props.setLineRoute({ route: props.route, vehicle: vehicle });
        }}
      />
    </Marker>
  );
};

export default React.memo(LiveMarker);
