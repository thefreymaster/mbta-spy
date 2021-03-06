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
import { Route } from "../../interfaces";
import { Link, useHistory, useParams } from "react-router-dom";
import { TransitIcons } from "../Icons/index";

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
      style={{ padding: 3 }}
      sx={(theme) => ({
        boxShadow: theme.shadows.xl,
        "&:hover": {
          boxShadow: theme.shadows.lg,
        },
        ...props.containerStyle,
      })}
      onClick={props.onClick}
    >
      <MdTram color={props.color ?? "white"} style={{ ...props.style }} />
    </Box>
  );
  transitTypes.set(
    1,
    <Box
      style={{ padding: 3 }}
      sx={(theme) => ({
        hover: { boxShadow: theme.shadows.xl },
        "&:hover": {
          boxShadow: theme.shadows.lg,
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
      style={{ padding: 3 }}
      sx={(theme) => ({
        boxShadow: theme.shadows.xl,
        "&:hover": {
          boxShadow: theme.shadows.lg,
        },
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
      style={{ padding: 3 }}
      sx={(theme) => ({
        boxShadow: theme.shadows.xl,
        "&:hover": {
          boxShadow: theme.shadows.lg,
        },
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

  return <>{transitTypes.get(props.value) ?? transitTypes.get(0)}</>;
};

const LiveMarker = (props: {
  vehicle: any;
  route: Route;
  setLineRoute(s: any): void;
  onMove(event: any): void;
}) => {
  const { current: map } = useMap();
  const history = useHistory();

  const [vehicle, setVehicle] = React.useState(props.vehicle);
  const [isAnimating, setIsAnimating]: any = React.useState(false);
  const params: { transit_type: string } = useParams();

  React.useEffect(() => {
    socket.on(props.vehicle.id, ({ data }: { data: any }) => {
      const parsed = JSON.parse(data);
      if (parsed.id === props.vehicle.id) {
        setVehicle(parsed);
        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimating(false);
        }, 100);
      }
    });

    // return function cleanUp() {
    //   socket.disconnect();
    // };
  }, [params.transit_type, props.vehicle.id]);

  const memorizedMarker = useMemo(() => {
    return (
      <Marker
        longitude={vehicle.attributes.longitude}
        latitude={vehicle.attributes.latitude}
        anchor="bottom"
        style={{
          willChange: "transform",
          // @ts-ignore
          transition: isAnimating && "transform 100ms ease-in-out",
        }}
        onClick={(event: any) => {
          props.onMove({
            longitude: vehicle.attributes.longitude,
            latitude: vehicle.attributes.latitude,
            zoom: 14
          });
        }}
      >
        <Link
          to={{
            pathname: `/${props?.route?.attributes?.type}/${props?.route?.id}/${props.vehicle.id}`,
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
      </Marker>
    );
  }, [vehicle.attributes.longitude, vehicle.attributes.latitude, isAnimating]);
  return <>{memorizedMarker}</>;
};

export default LiveMarker;
