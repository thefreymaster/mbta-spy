import React from "react";
import { useQuery } from "react-query";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import LiveMarker from "../LiveMarker/index";
import { Center, Loader } from "@mantine/core";
import { LineShapes } from "../LineShapes/index";
import { LineDrawer } from "../LineDrawer";
import { VehicleType } from "../VehicleType/index";
import { useParams } from "react-router-dom";

const DEFAULT_LATITUDE = 42.35698;
const DEFAULT_LONGITUDE = -71.06388;
export const DEFAULT_TRANSIT_TYPES = "0,1,2";

const MapContent = (props: { isDragging: boolean }) => {
  const [lineRoute, setLineRoute]: any = React.useState();
  const [vehicleType, setVehicleType] = React.useState("");
  const params: { transit_type: string } = useParams();

  const { isLoading, isError, error, data } = useQuery(
    ["vehicles", params?.transit_type],
    () =>
      fetch(
        `/api/vehicles/${params?.transit_type ?? DEFAULT_TRANSIT_TYPES}`
      ).then((res) => {
        return res.json();
      }),
    {
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const { isLoading: isLoadingBus, data: busData } = useQuery(
    ["vehicles", "bus"],
    () =>
      fetch(`/api/vehicles/3`).then((res) => {
        return res.json();
      }),
    {
      enabled: !!params.transit_type,
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const getRouteIds = () => {
    const ids = data?.vehicles?.reduce((accumulator: string, vehicle: any) => {
      if (accumulator.indexOf(vehicle?.relationships?.route?.data?.id) === -1) {
        accumulator += `${vehicle?.relationships?.route?.data?.id},`;
      }
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

  if (isLoading || isLoadingRoutes || isLoadingBus) {
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
  let allVehicles;
  if (params.transit_type) {
    allVehicles = data.vehicles;
  } else {
    allVehicles = [...data.vehicles, ...busData.vehicles];
  }
  return (
    <>
      <LineDrawer lineRoute={lineRoute} setLineRoute={setLineRoute} />
      <VehicleType vehicleType={vehicleType} setVehicleType={setVehicleType} />
      <LineShapes
        vehicleType={vehicleType}
        shapeIds={getRouteIds()}
        lineRoute={lineRoute}
        setLineRoute={setLineRoute}
        dataRoutes={dataRoutes}
      />
      {allVehicles.map((vehicle: any) => {
        // console.log(vehicle)
        return (
          <div key={`marker-${vehicle.id}`}>
            <LiveMarker
              route={dataRoutes.routes.find(
                (r: any) => r.id === vehicle.relationships.route.data.id
              )}
              isDragging={props.isDragging}
              vehicle={vehicle}
              setLineRoute={setLineRoute}
            />
          </div>
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
        reuseMaps
        mapboxAccessToken={process.env.REACT_APP_MAP_BOX_TOKEN}
        initialViewState={{
          longitude: DEFAULT_LONGITUDE,
          latitude: DEFAULT_LATITUDE,
          zoom: 12,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/thefreymaster/cl1aym2s4001514pkc1o3i37v"
      >
        <MapContent isDragging={isDragging} />
      </Map>
    </>
  );
};
