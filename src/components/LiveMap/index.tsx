import React, { useRef, useState } from "react";
import { useQuery } from "react-query";
import Map, { MapRef } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import LiveMarker from "../LiveMarker/index";
import { Center, Loader, Switch } from "@mantine/core";
import { LineShapes } from "../LineShapes/index";
import { LineDrawer } from "../LineDrawer";
import { VehicleType } from "../VehicleType/index";
import { useParams } from "react-router-dom";

import "./live-map.css";
import { LineStops } from "../LineStops";
import { LinesToggle } from "../LinesToggle";
import { LinesDrawerToggle } from "../LineDrawerToggle";

mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_TOKEN || "";

const DEFAULT_LATITUDE = 42.35698;
const DEFAULT_LONGITUDE = -71.06388;
export const DEFAULT_TRANSIT_TYPES = "0,1,2";

const MapContent = (props: {
  onMove(event: any): void;
  linesVisible: boolean;
}) => {
  const params: { transit_type: string; route_id: string; transit_id: string } =
    useParams();
  const [lineRoute, setLineRoute]: any = React.useState();
  const [lineDrawerIsOpen, setLineDrawerIsOpen]: any = React.useState(false);
  const [vehicleType, setVehicleType] = React.useState("");

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
    // allVehicles = [...data?.vehicles, ...busData?.vehicles];
    allVehicles = [...data?.vehicles];
  }
  return (
    <>
      <LineDrawer
        onMove={props.onMove}
        lineRoute={lineRoute}
        setLineRoute={setLineRoute}
        lineDrawerIsOpen={lineDrawerIsOpen}
        setLineDrawerIsOpen={setLineDrawerIsOpen}
      />
      {(params?.transit_type && params?.route_id && params?.transit_id) && (
        <LinesDrawerToggle setLineDrawerIsOpen={setLineDrawerIsOpen} />
      )}
      <LineShapes
        vehicleType={vehicleType}
        shapeIds={getRouteIds()}
        lineRoute={lineRoute}
        setLineRoute={setLineRoute}
        dataRoutes={dataRoutes}
        checked={props.linesVisible}
      />
      <LineStops />
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
  const params: { transit_type: string } = useParams();

  const [linesVisible, setLinesVisible]: any = React.useState(true);

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

  return (
    <div
      // ref={mapContainerRef}
      className="map-container"
      // style={{ width: "100vw", height: "100vh" }}
    >
      <VehicleType />
      <LinesToggle
        setLinesVisible={setLinesVisible}
        linesVisible={linesVisible}
      />
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: DEFAULT_LONGITUDE,
          latitude: DEFAULT_LATITUDE,
          zoom: 12,
        }}
        reuseMaps
        mapboxAccessToken={process.env.REACT_APP_MAP_BOX_TOKEN}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/thefreymaster/ckrgryqok3xbu17okr3jnftem?optimize=true"
      >
        <MapContent onMove={onMove} linesVisible={linesVisible} />
      </Map>
    </div>
  );
};
