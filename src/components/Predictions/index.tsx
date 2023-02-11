import { Badge, Box, Button, Dialog, Table, Text } from "@mantine/core";
import React from "react";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { getCurrentStopIndex } from "../../utils/getCurrentStopIndex";
import { isDesktop } from "react-device-detect";
import { isMobile } from "react-device-detect";

interface IPrediction {
  id: string;
  attributes: {
    arrival_time: string;
    departure_time: string;
    stop_sequence: number;
    platform_name: string;
    latitude: string;
    longitude: string;
  };
  relationships: {
    stop: {
      data: {
        id: string;
      };
    };
  };
}

const Time = (props: { children: string }) => {
  return (
    <>
      {new Date(props.children).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </>
  );
};

const ActiveText = (props: {
  vehicleStopId: string;
  predictionStopId: string;
  children: any;
}) => {
  return (
    <Text
      size="xs"
      weight={props.vehicleStopId === props.predictionStopId ? 800 : 400}
    >
      {props.children}
    </Text>
  );
};

export const Predictions = (props: {
  direction?: string;
  color?: string;
  onMove(event: any): void;
}) => {
  const params: {
    transit_type: string;
    route_id: string;
    transit_id: string;
    trip_id: string;
  } = useParams();

  const location: any = useLocation();

  const { data, isLoading } = useQuery(
    ["predictions", params?.trip_id],
    () =>
      fetch(`/api/predictions/${params?.route_id}/${params?.trip_id}`).then(
        (res) => {
          return res.json();
        }
      ),
    {
      enabled: !!params.route_id,
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const vehicleStopId = location?.state?.vehicle?.relationships?.stop?.data?.id;

  const [showPredictions, setShowPredictions] = React.useState(false);

  return (
    <>
      <Box
        sx={() => ({
          padding: "18px",
          position: "sticky",
          bottom: "0px",
          zIndex: 100,
          backgroundColor: "white",
          boxShadow:
            "-1px -3px 9px rgb(0 0 0 / 5%), rgb(0 0 0 / 5%) 0px 20px 25px -5px, rgb(0 0 0 / 4%) 0px 10px 10px -5px",
        })}
      >
        <Button
          fullWidth
          color="gray"
          variant="outline"
          sx={() => ({
            position: "sticky",
            bottom: "20px",
            left: "20px",
            borderColor: `#${props.color}`,
            color: `#${props.color}`,
          })}
          onClick={() => setShowPredictions(true)}
        >
          Predictions
        </Button>
      </Box>
      {showPredictions && (
        <Dialog
          position={{ bottom: 20, left: isMobile ? "10px" : "20px" }}
          style={{maxWidth: "calc(100% - 40px)"}}
          opened
          onClose={() => setShowPredictions(false)}
          size="lg"
          radius="md"
          withCloseButton
        >
          <Table highlightOnHover captionSide="bottom">
            <caption>Predicted times</caption>
            <thead>
              <tr>
                <th>Platform</th>
                <th>Arrival</th>
                {isDesktop && <th>Departure</th>}
              </tr>
            </thead>
            <tbody>
              {data?.combined?.map((prediction: IPrediction) => (
                <tr
                  key={prediction.id}
                  onClick={() =>
                    props.onMove({
                      longitude: prediction.attributes.longitude,
                      latitude: prediction.attributes.latitude,
                      zoom: 14,
                    })
                  }
                >
                  <td>
                    <ActiveText
                      predictionStopId={prediction.relationships.stop.data.id}
                      vehicleStopId={vehicleStopId}
                    >
                      {prediction.attributes.platform_name}
                    </ActiveText>
                  </td>
                  <td>
                    <ActiveText
                      predictionStopId={prediction.relationships.stop.data.id}
                      vehicleStopId={vehicleStopId}
                    >
                      <Time>{prediction.attributes.arrival_time}</Time>
                    </ActiveText>
                  </td>
                  {isDesktop && (
                    <td>
                      <ActiveText
                        predictionStopId={prediction.relationships.stop.data.id}
                        vehicleStopId={vehicleStopId}
                      >
                        <Time>{prediction.attributes.departure_time}</Time>
                      </ActiveText>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </Dialog>
      )}
    </>
  );
};
