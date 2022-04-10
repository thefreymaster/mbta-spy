import React, { useRef, useState } from "react";
import { useQuery } from "react-query";
import Map from "react-map-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import LiveMarker from "../LiveMarker/index";
import { Center, Loader } from "@mantine/core";
import { LineShapes } from "../LineShapes/index";
import { LineDrawer } from "../LineDrawer";
import { VehicleType } from "../VehicleType/index";
import { useParams } from "react-router-dom";

import "./live-map.css";

mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_TOKEN || "";

const DEFAULT_LATITUDE = 42.35698;
const DEFAULT_LONGITUDE = -71.06388;
export const DEFAULT_TRANSIT_TYPES = "0,1,2";

const MapContent = () => {
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
      enabled: !params.transit_type,
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
  let allVehicles = data?.vehicles;
  if (!params?.transit_type) {
    allVehicles = [...data?.vehicles, ...busData?.vehicles];
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
  // const mapContainerRef = useRef(null);
  // const [lng, setLng] = useState(DEFAULT_LONGITUDE);
  // const [lat, setLat] = useState(DEFAULT_LATITUDE);
  // const [zoom, setZoom] = useState(12);

  // // Initialize map when component mounts
  // React.useEffect(() => {
  //   const map: any = new mapboxgl.Map({
  //     // @ts-ignore
  //     container: mapContainerRef.current,
  //     style: "mapbox://styles/thefreymaster/ckrgryqok3xbu17okr3jnftem",
  //     center: [lng, lat],
  //     zoom: zoom,
  //   });

  //   // Add navigation control (the +/- zoom buttons)
  //   // map.addControl(new mapboxgl.NavigationControl(), "top-right");

  //   map.on("move", () => {
  //     setLng(map.getCenter().lng.toFixed(4));
  //     setLat(map.getCenter().lat.toFixed(4));
  //     setZoom(map.getZoom().toFixed(2));
  //   });

  //   // Clean up on unmount
  //   return () => map.remove();
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      // ref={mapContainerRef}
      className="map-container"
      // style={{ width: "100vw", height: "100vh" }}
    >
      <Map
        reuseMaps
        mapboxAccessToken={process.env.REACT_APP_MAP_BOX_TOKEN}
        initialViewState={{
          longitude: DEFAULT_LONGITUDE,
          latitude: DEFAULT_LATITUDE,
          zoom: 12,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/thefreymaster/ckrgryqok3xbu17okr3jnftem"
      >
        <MapContent />
      </Map>
    </div>
  );
};
