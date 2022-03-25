import React from "react";
import { useQuery } from "react-query";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import LiveMarker from "../LiveMarker/index";
import { Center, Loader } from "@mantine/core";
import { LineShapes } from "../LineShapes/index";
import { LineDrawer } from "../LineDrawer";
import { VehicleType } from "../VehicleType/index";

const DEFAULT_LATITUDE = 42.35698;
const DEFAULT_LONGITUDE = -71.06388;

const MapContent = (props: { isDragging: boolean }) => {
  const [lineRoute, setLineRoute]: any = React.useState();
  const [vehicleType, setVehicleType] = React.useState("");

  const { isLoading, isError, error, data } = useQuery(
    ["vehicles", vehicleType],
    () =>
      fetch(`/api/vehicles/${vehicleType}`).then((res) => {
        return res.json();
      }),
    {
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const getRouteIds = () => {
    const ids = data?.vehicles?.reduce((accumulator: string, vehicle: any) => {
      accumulator += `${vehicle?.relationships?.route?.data?.id},`;
      return accumulator;
    }, "");
    return ids;
  };

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
      enabled: !!data,
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
      {/* <VehicleType vehicleType={vehicleType} setVehicleType={setVehicleType} /> */}
      <LineShapes
        vehicleType={vehicleType}
        shapeIds={getRouteIds()}
        lineRoute={lineRoute}
        setLineRoute={setLineRoute}
        dataRoutes={dataRoutes}
      />
      {data.vehicles.map((vehicle: any) => {
        // console.log(vehicle)
        return (
          <LiveMarker
            route={dataRoutes.routes.find(
              (r: any) => r.id === vehicle.relationships.route.data.id
            )}
            isDragging={props.isDragging}
            vehicle={vehicle}
            setLineRoute={setLineRoute}
          />
        );
      })}
    </>
  );
};

export const LiveMap = () => {
  const [isDragging, setIsDragging] = React.useState(false);

  return (
    <>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAP_BOX_TOKEN}
        initialViewState={{
          longitude: DEFAULT_LONGITUDE,
          latitude: DEFAULT_LATITUDE,
          zoom: 12,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        // onDragStart={() => setIsDragging(true)}
        // onDragEnd={() => setIsDragging(false)}
      >
        <MapContent isDragging={isDragging} />
      </Map>
    </>
  );
};
