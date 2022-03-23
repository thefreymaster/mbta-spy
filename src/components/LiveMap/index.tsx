import React from "react";
import { useQuery } from "react-query";
import Map, { Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { decode } from "@googlemaps/polyline-codec";

import LiveMarker from "../LiveMarker/index";
import Pin from "../Pin";
import { Center, Loader } from "@mantine/core";
import { VehicleType } from "../VehicleType";
import { LineShapes } from '../LineShapes/index';
import { LineDrawer } from "../LineDrawer";

const DAY_MAP = "mapbox://styles/thefreymaster/ckke447ga0wla19k1cqupmrrz";
const DEFAULT_LATITUDE = 42.35698;
const DEFAULT_LONGITUDE = -71.06388;
const DEFAULT_ZOOM = 12;

const MAP_BOX_TOKEN =
  "pk.eyJ1IjoidGhlZnJleW1hc3RlciIsImEiOiJjbDB2Ymc4cm4xNXZyM2txcGlxandlOTMwIn0.NrtktYJTk0sRUCJdsbhVdg";

export const LiveMap = () => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [lineRoute, setLineRoute]: any = React.useState();

  const {
    isLoading: isLoadingRoutes,
    isError: isErrorRoutes,
    data: dataRoutes,
  } = useQuery(
    "routes",
    () =>
      fetch("/api/routes").then((res) => {
        return res.json();
      }),
    {
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const { isLoading, isError, error, data } = useQuery(
    "vehicles",
    () =>
      fetch("/api/vehicles").then((res) => {
        return res.json();
      }),
    {
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading || isLoadingRoutes) {
    return (
      <Center style={{ width: "100vh", height: "100vw" }}>
        <Loader color="red" size="xl" />
      </Center>
    );
  }
  if (isError || isErrorRoutes) {
    console.log(error);
    return <>Error</>;
  }

  return (
    <div>
      <LineDrawer lineRoute={lineRoute} setLineRoute={setLineRoute} />
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAP_BOX_TOKEN}
        initialViewState={{
          longitude: DEFAULT_LONGITUDE,
          latitude: DEFAULT_LATITUDE,
          zoom: 12,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      >
        <LineShapes lineRoute={lineRoute} setLineRoute={setLineRoute} />
        {data.vehicles.map((vehicle: any) => (
          <LiveMarker
            route={dataRoutes.routes.find(
              (r: any) => r.id === vehicle.relationships.route.data.id
            )}
            isDragging={isDragging}
            vehicle={vehicle}
            setLineRoute={setLineRoute}
          />
        ))}
      </Map>
    </div>
  );
};
