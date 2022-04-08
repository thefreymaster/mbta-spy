import { decode } from "@googlemaps/polyline-codec";
import React from "react";
import { Layer, Source } from "react-map-gl";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { DEFAULT_TRANSIT_TYPES } from "../LiveMap/index";

const transitTypeColors = new Map();
transitTypeColors.set("0", "00843d");
transitTypeColors.set("1", "da291c");
transitTypeColors.set("2", "80276c");
transitTypeColors.set("3", "ffc72c");

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
  const location: any = useLocation();
  const params: { transit_type: string; route_id: string; transit_id: string } =
    useParams();

  const getShapesId = () => {
    if (params.transit_type && params.transit_id) {
      return params.route_id;
    }
    if (params.transit_type) {
      return props.shapeIds;
    }
    return null;
  };

  const getShapesColors = (color: string) => {
    if (params.transit_type && params.transit_id) {
      return color;
    }
    // if (params.transit_type) {
    //   return transitTypeColors.get(params.transit_type);
    // }
    return "a5a5a5";
  };


  const { isLoading, data } = useQuery(
    ["line-polyline", params.transit_type + params.route_id],
    () =>
      fetch(`/api/shapes/${getShapesId()}`).then((res) => {
        return res.json();
      }),
    {
      // enabled: !!params.transit_type || !!params.transit_id,
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const memorizedShapes = React.useMemo(() => {
    console.log('render')
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
                  "line-color": `#${getShapesColors(
                    location?.state?.route?.attributes?.color
                  )}`,
                }}
              />
            </Source>
          );
        })}
      </>
    );
  }, [data?.shapes?.length, params.transit_type, params.transit_id]);
  return <>{memorizedShapes}</>;
};
