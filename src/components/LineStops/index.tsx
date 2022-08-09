import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Layer, Source } from "react-map-gl";
import { useQuery } from "react-query";

export const Stop = (props: { id: string; stop: any }) => {
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

  const memorizedStop = React.useMemo(() => {
    return (
      <Source
        id={`polyline-${props.id}`}
        key={`polyline-${props.id}`}
        type="geojson"
        data={{
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            // @ts-ignore
            coordinates: [
              props.stop.attributes.longitude,
              props.stop.attributes.latitude,
            ],
          },
        }}
      >
        <Layer
          id={`line-${props.id}`}
          type="circle"
          paint={{
            "circle-color": `#${getShapesColors(
              location?.state?.route?.attributes?.color
            )}`,
            "circle-radius": 6,
          }}
        />
      </Source>
    );
  }, [location?.state?.route?.attributes?.color, props.id]);
  return <>{memorizedStop}</>;
};

export const LineStops = () => {
  const params: { transit_type: string; route_id: string; transit_id: string } =
    useParams();
  const { data }: any = useQuery(["stops", params.route_id]);

  if (data?.stops?.length > 0) {
    return (
      <>
        {data?.stops.map((stop: any) => {
          return <Stop stop={stop} id={stop.id} />;
        })}
      </>
    );
  }
  return null;
};
