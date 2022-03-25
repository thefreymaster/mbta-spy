import { decode } from "@googlemaps/polyline-codec";
import { Drawer } from "@mantine/core";
import React from "react";
import { Layer, Source } from "react-map-gl";
import { useQuery } from "react-query";

const getCoordinates = (polyline: string) => {
  const parsedPolyline = decode(polyline);
  const newParsedPolyline = parsedPolyline.map((coor: number[]) =>
    coor.reverse()
  );
  return newParsedPolyline;
};

export const LineShapes = (props: {
  lineRoute?: any;
  shapeIds: string;
  setLineRoute(s: any): void;
  vehicleType: string;
  dataRoutes: any;
}) => {
  const { isLoading, data } = useQuery(
    ["line-polyline", props.vehicleType || props.lineRoute?.route?.id],
    () =>
      fetch(`/api/shapes/${!props.vehicleType ? props.lineRoute?.route?.id : props.shapeIds}`).then((res) => {
        return res.json();
      }),
    {
      // enabled: !!props.vehicleType || !!props.lineRoute?.route?.id,
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return null;
  }
  return (
    <>
      {data?.shapes?.map((p: any) => {
        return (
          <Source
            id={`polyline-${p?.id}`}
            key={`polyline-${p?.id}`}
            type="geojson"
            data={{
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: getCoordinates(p?.attributes?.polyline),
              },
            }}
          >
            <Layer
              id={`line-${p?.id}`}
              type="line"
              paint={{
                "line-width": 2,
                "line-color": `#${props?.lineRoute?.route?.attributes?.color || 'da291c'}`,
              }}
            />
          </Source>
        );
      })}
    </>
  );
};
