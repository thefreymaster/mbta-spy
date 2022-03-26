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
  const { current: map } = useMap();
  const history = useHistory();

  const [vehicle, setVehicle] = React.useState(props.vehicle);
  const [isAnimating, setIsAnimating]: any = React.useState();
  const params: { transit_type: string } = useParams();

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
          transition:
            isAnimating && !map?.isMoving() && "transform 200ms ease-in-out",
        }}
      >
        <Link
          to={{
            pathname: `/${props?.route?.attributes?.type}/${props?.route?.id}/${props.vehicle.id}`,
            state: { route: props.route, vehicle: vehicle },
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
              padding: 2,
            }}
            onClick={() => {
              console.log({ vehicle, route: props.route });
              props.setLineRoute({ route: props.route, vehicle: vehicle });
            }}
          />
        </Link>
      </Marker>
    );
  }, [vehicle.attributes.longitude, vehicle.attributes.latitude, isAnimating]);
  return <>{memorizedMarker}</>;
};

export default LiveMarker;
