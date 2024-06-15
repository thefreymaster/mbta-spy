import React, { useMemo } from "react";
import { io } from "socket.io-client";
import { Marker, useMap } from "react-map-gl";
import {
  MdTram,
  MdDirectionsSubway,
  MdDirectionsRailway,
  MdOutlineDirectionsBus,
} from "react-icons/md";
import "./live-marker.css";
import { Box } from "@mantine/core";
import { Route, Vehicle } from "../../interfaces";
import { Link, useParams } from "react-router-dom";
import { TransitIcons } from "../Icons/index";
import { IoTrain } from "react-icons/io5";

const socket = io(window.location.origin);

export const TransitIcon = (props: {
  value: number;
  color?: string;
  style?: any;
  containerStyle?: any;
  onClick?: any;
}) => {
  const transitTypes = new Map();
  transitTypes.set(
    0,
    <Box
      sx={() => ({
        ...props.containerStyle,
      })}
      className="marker"
      onClick={props.onClick}
    >
      <MdTram color={props.color ?? "white"} style={{ ...props.style }} />
    </Box>
  );
  transitTypes.set(
    1,
    <Box
      sx={() => ({
        "&:hover": {
          backgroundColor: props?.containerStyle?.backgroundColor,
        },
        ...props.containerStyle,
      })}
      onClick={props.onClick}
    >
      <MdDirectionsSubway
        className="marker"
        color={props.color ?? "white"}
        style={{ ...props.style }}
      />
    </Box>
  );
  transitTypes.set(
    2,
    <Box
      sx={() => ({
        ...props.containerStyle,
      })}
      onClick={props.onClick}
    >
      <MdDirectionsRailway
        className="marker"
        style={{ ...props.style }}
        color={props.color ?? "white"}
      />
    </Box>
  );
  transitTypes.set(
    3,
    <Box
      sx={() => ({
        ...props.containerStyle,
      })}
      onClick={props.onClick}
    >
      <MdOutlineDirectionsBus
        className="marker"
        style={{ ...props.style }}
        color={props.color ?? "white"}
      />
    </Box>
  );
  transitTypes.set(
    4,
    <Box
      sx={() => ({
        ...props.containerStyle,
      })}
      onClick={props.onClick}
    >
      <IoTrain
        className="marker"
        style={{ ...props.style }}
        color={props.color ?? "white"}
      />
    </Box>
  );

  return <>{transitTypes.get(props.value) ?? transitTypes.get(0)}</>;
};

const LiveMarker = (props: {
  vehicle: Vehicle;
  route: Route;
  setLineRoute(s: Route): void;
  onMove(event: any): void;
}) => {
  const [vehicle, setVehicle] = React.useState(props.vehicle);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const params: { transit_type: string } = useParams();

  React.useEffect(() => {
    let animation: any;
    socket.on(props.vehicle.id, ({ data }: { data: string }) => {
      const parsed = JSON.parse(data);
      if (parsed.id === props.vehicle.id) {
        animation = window.requestAnimationFrame(() => setVehicle(parsed));
        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimating(false);
        }, 250);
      }
    });

    return () => window.cancelAnimationFrame(animation);
  }, [params.transit_type, props.vehicle.id]);

  const handleMove = () =>
    props.onMove({
      longitude: vehicle.attributes.longitude,
      latitude: vehicle.attributes.latitude,
      zoom: 14,
    });

  // const memorizedMarker = useMemo(() => {
  return (
    <Marker
      longitude={vehicle.attributes.longitude}
      latitude={vehicle.attributes.latitude}
      anchor="bottom"
      onClick={handleMove}
      // rotation={props.vehicle?.attributes?.bearing + 45}
      pitchAlignment="viewport"
    >
      <div className="marker-parent">
        <Link
          to={{
            pathname: `/${props?.route?.attributes?.type}/${props?.route?.id}/${props.vehicle.id}/${props.vehicle?.relationships?.trip?.data?.id}`,
            state: { route: props.route, vehicle: vehicle },
          }}
        >
          <TransitIcons
            type={props.route?.attributes?.type}
            backgroundColor={props.route?.attributes?.color}
            transform={`rotate(${props.vehicle?.attributes?.bearing + 45}deg)`}
            svgTransform={`rotate(${
              (props.vehicle?.attributes?.bearing + 45) * -1
            }deg)`}
          />
        </Link>
      </div>
    </Marker>
  );
  // }, [vehicle.attributes.longitude, vehicle.attributes.latitude, isAnimating]);
  // return <>{memorizedMarker}</>;
};

export default LiveMarker;
