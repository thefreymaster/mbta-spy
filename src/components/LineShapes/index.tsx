import { decode } from "@googlemaps/polyline-codec";
import React from "react";
import { Layer, Source } from "react-map-gl";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";

const transitTypeColors = new Map();
transitTypeColors.set("0", "00843d");
transitTypeColors.set("1", "da291c");
transitTypeColors.set("2", "80276c");
transitTypeColors.set("3", "ffc72c");

const getCoordinates = (polyline: string) => {
  const parsedPolyline = decode(polyline);
  const newParsedPolyline = parsedPolyline.map((coor: number[]) =>
    coor?.reverse()
  );
  return newParsedPolyline;
};

const Line = (props: { polyline: any }) => {
  const location: any = useLocation();
  const params: { transit_type: string; route_id: string; transit_id: string } =
    useParams();
  const getShapesColors = (color: string) => {
    if (params.transit_type && params.transit_id) {
      return color;
    }
    // if (params.transit_type) {
    //   return transitTypeColors.get(params.transit_type);
    // }
    return "a5a5a5";
  };

  const rawCoordinates: any = props.polyline?.attributes?.polyline;

  const memorizedLine = React.useMemo(() => {
    return (
      <Source
        id={`polyline-${props.polyline?.id}`}
        key={`polyline-${props.polyline?.id}`}
        type="geojson"
        data={{
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            // @ts-ignore
            coordinates: rawCoordinates,
          },
        }}
      >
        <Layer
          id={`line-${props.polyline?.id}`}
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
  }, [
    location?.state?.route?.attributes?.color,
    props.polyline?.id,
    rawCoordinates,
  ]);
  return <>{memorizedLine}</>;
};

export const LineShapes = (props: {
  lineRoute?: any;
  shapeIds: string;
  setLineRoute(s: any): void;
  vehicleType: string;
  dataRoutes: any;
  checked: boolean;
  setLinesVisible(v: boolean): void;
}) => {
  const params: { transit_type: string; route_id: string; transit_id: string } =
    useParams();

  const getShapesId = () => {
    if (params.transit_type && params.transit_id) {
      return params.route_id;
    }
    if (params.transit_type) {
      return props.shapeIds;
    }
    return props.shapeIds;
  };

  const renderLines = props.checked;

  const { isLoading, data } = useQuery(
    ["line-polyline", params.transit_type + params.route_id],
    () =>
      fetch(`/api/shapes/${renderLines && getShapesId()}`).then((res) => res.json()),
    {
      enabled: renderLines,
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const parsedShapes = data?.shapes.map((shape: any) => ({
    ...shape,
    length: getCoordinates(shape.attributes.polyline)?.length,
    attributes: { polyline: getCoordinates(shape.attributes.polyline) },
  }));

  const uniqueShapes: any = [
    ...new Map(
      parsedShapes?.map((shape: any) => [shape.length, shape])
    ).values(),
  ];

  React.useLayoutEffect(() => {
    if(params.transit_type === "3"){
      return props.setLinesVisible(false);
    }
    else{
      return props.setLinesVisible(true);
    }
  }, [params.transit_type])

  const memorizedShapes = React.useMemo(() => {
    if (isLoading) {
      return null;
    }
    return (
      <>
        {uniqueShapes?.map((p: any) => {
          return <Line key={p?.id} polyline={p} />;
        })}
      </>
    );
  }, [data?.shapes?.length, params.transit_type, params.transit_id]);
  return <>{renderLines ? memorizedShapes : null}</>;
};
