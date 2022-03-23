import React from "react";
import { io } from "socket.io-client";
import { Marker } from "react-map-gl";
import { MdOutlineDirectionsTransitFilled } from "react-icons/md";
import "./live-marker.css";

const socket = io("http://localhost:5500");

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
  cursor: "pointer",
  fill: "#d00",
  stroke: "none",
};

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
      <div
        className="marker"
        onClick={() => {
          console.log({ vehicle, route: props.route });
          props.setLineRoute({ route: props.route, vehicle: vehicle });
        }}
        style={{
          backgroundColor: `#${props.route?.attributes?.color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 100,
          width: 15,
          height: 15,
        }}
      >
        <MdOutlineDirectionsTransitFilled color="white" />
      </div>
    </Marker>
  );
};

export default React.memo(LiveMarker);
