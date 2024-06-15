import React, { useRef, useState, useEffect } from "react";
import { useQuery } from "react-query";
import Map, { MapRef } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import LiveMarker from "../LiveMarker/index";
import { Center, Loader, useMantineColorScheme } from "@mantine/core";
import { LineShapes } from "../LineShapes/index";
import { LineDrawer } from "../LineDrawer";
import { VehicleTypeToggle } from "../VehicleTypeToggle";
import { useParams } from "react-router-dom";

import "./live-map.css";
import { LineStops } from "../LineStops";
import { LinesToggle } from "../LinesToggle";
import { DarkModeToggle } from "../../common/DarkModeToggle";
// import { getVehicle } from "../../utils/getVehicle";
import Coffee from "../Coffee";
import { getLiveGPSCoordinates } from "../../utils/gps";
import { LiveUserLocation } from "../LiveUserLocation";
import { CenterMapToggle } from "../../common/CenterMapToggle";
import { useQueries } from "../../hooks/useQueries";
// import StatusBar from "../../common/StatusBar";

mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_TOKEN || "";

const DEFAULT_LATITUDE = 42.35698;
const DEFAULT_LONGITUDE = -71.06388;
export const DEFAULT_TRANSIT_TYPES = "0,1,2";

const MapContent = (props: {
  onMove(event: any): void;
  linesVisible: boolean;
  setLineDrawerIsOpen(v: boolean): void;
  lineDrawerIsOpen: boolean;
  setLinesVisible(v: boolean): void;
  userLocation: {
    latitude: number;
    longitude: number;
  };
}) => {
  const params: {
    transit_type: string;
    route_id: string;
    transit_id: string;
    trip_id: string;
  } = useParams();
  const [lineRoute, setLineRoute]: any = useState();
  const [vehicleType, setVehicleType] = useState("");

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

  if (isLoading || isLoadingRoutes) {
    return (
      <Center style={{ height: "100vh", width: "100vw" }}>
        <Loader color="gray" size="xl" />
      </Center>
    );
  }
  if (isError || isErrorRoutes) {
    console.log(error);
    return <>Error</>;
  }
  let allVehicles = data?.vehicles;
  if (!params?.transit_type) {
    // allVehicles = [...data?.vehicles, ...busData?.vehicles];
    allVehicles = [...data?.vehicles];
  }
  return (
    <>
      <LineDrawer
        onMove={props.onMove}
        lineRoute={lineRoute}
        setLineRoute={setLineRoute}
        lineDrawerIsOpen={props.lineDrawerIsOpen}
        setLineDrawerIsOpen={props.setLineDrawerIsOpen}
        vehicles={data?.vehicles}
      />
      <LineShapes
        vehicleType={vehicleType}
        shapeIds={getRouteIds()}
        lineRoute={lineRoute}
        setLineRoute={setLineRoute}
        dataRoutes={dataRoutes}
        checked={props.linesVisible}
        setLinesVisible={props.setLinesVisible}
      />
      <LineStops />
      <LiveUserLocation
        latitude={props.userLocation.latitude}
        longitude={props.userLocation.longitude}
      />
      {allVehicles.map((vehicle: any) => {
        return (
          <div key={`marker-${vehicle.id}`}>
            <LiveMarker
              route={dataRoutes.routes.find(
                (r: any) => r.id === vehicle.relationships.route.data.id
              )}
              vehicle={vehicle}
              setLineRoute={setLineRoute}
              onMove={props.onMove}
            />
          </div>
        );
      })}
    </>
  );
};

export const LiveMap = () => {
  const mapRef = useRef<MapRef>(null);
  const params: {
    transit_type: string;
    route_id: string;
    transit_id: string;
    trip_id: string;
  } = useParams();

  const query = useQueries();
  const embeded = query.get("embeded");

  const { colorScheme } = useMantineColorScheme();

  const [linesVisible, setLinesVisible]: any = React.useState(true);
  const [lineDrawerIsOpen, setLineDrawerIsOpen]: any = React.useState(false);
  const [userLocation, setUserLocation] = useState({
    longitude: 0,
    latitude: 0,
  });

  useEffect(() => getLiveGPSCoordinates(setUserLocation), []);

  const onMove = (event: {
    longitude: number;
    latitude: number;
    zoom?: number;
  }) => {
    mapRef.current?.flyTo({
      center: [event.longitude, event.latitude],
      zoom: event.zoom || 14,
      duration: 2500,
    });
  };

  const handleOnMoveToCenter = () => {
    if (userLocation.longitude === 0 || userLocation.latitude === 0) {
      return null;
    }
    return onMove({
      longitude: userLocation.longitude,
      latitude: userLocation.latitude,
      zoom: 13,
    });
  };

  return (
    <div className="map-container">
      {!embeded && (
        <>
          <VehicleTypeToggle />
          <LinesToggle
            setLinesVisible={setLinesVisible}
            linesVisible={linesVisible}
          />
          <DarkModeToggle />
          <CenterMapToggle handleOnMoveToCenter={handleOnMoveToCenter} />
        </>
      )}
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: DEFAULT_LONGITUDE,
          latitude: DEFAULT_LATITUDE,
          zoom: 12,
        }}
        mapboxAccessToken={process.env.REACT_APP_MAP_BOX_TOKEN}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle={
          colorScheme === "dark"
            ? "mapbox://styles/thefreymaster/ckz4a2i2m000r16pquoggwnqp"
            : "mapbox://styles/thefreymaster/cle3mr5kl001v01muelgj6hgg"
        }
      >
        <MapContent
          setLineDrawerIsOpen={setLineDrawerIsOpen}
          lineDrawerIsOpen={lineDrawerIsOpen}
          onMove={onMove}
          linesVisible={linesVisible}
          setLinesVisible={setLinesVisible}
          userLocation={userLocation}
        />
      </Map>
      <Coffee />
      {/* <StatusBar /> */}
    </div>
  );
};
