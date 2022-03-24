import React from "react";
import { useQuery } from "react-query";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import LiveMarker from "../LiveMarker/index";
import { Center, Loader } from "@mantine/core";
import { LineShapes } from "../LineShapes/index";
import { LineDrawer } from "../LineDrawer";

const DEFAULT_LATITUDE = 42.35698;
const DEFAULT_LONGITUDE = -71.06388;

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
      <Center style={{ height: "100vh", width: "100vw" }}>
        <Loader color="red" size="xl" />
      </Center>
    );
  }
  if (isError || isErrorRoutes) {
    console.log(error);
    return <>Error</>;
  }

  return (
    <>
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
    </>
  );
};
