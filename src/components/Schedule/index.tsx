import {
  Badge,
  Box,
  Button,
  Dialog,
  Table,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import React from "react";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { isMobile } from "react-device-detect";
import Pulse from "../../common/Pulse";

interface ISchedule {
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
  name: "station" | "time";
  children: any;
}) => {
  // const location: any = useLocation();

  return (
    <Text
      size="xs"
      weight={props.vehicleStopId === props.predictionStopId ? 800 : 400}
    >
      {props.children}
      {/* {props.vehicleStopId === props.predictionStopId && props.name === "time" && (
        <Pulse color={location?.state?.route?.attributes?.color} />
      )} */}
    </Text>
  );
};

export const Schedule = (props: {
  direction?: string;
  color?: string;
  onMove(event: any): void;
  stops: Array<object>;
}) => {
  const params: {
    transit_type: string;
    route_id: string;
    transit_id: string;
    trip_id: string;
  } = useParams();

  const location: any = useLocation();
  const { colorScheme } = useMantineColorScheme();

  const { data } = useQuery(
    ["schedule", params?.trip_id],
    () =>
      fetch(`/api/schedules/${params?.trip_id}`).then((res) => {
        return res.json();
      }),
    {
      enabled: !!params.trip_id,
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  console.log({data})

  const vehicleStopId = location?.state?.vehicle?.relationships?.stop?.data?.id;

  const [showPredictions, setShowPredictions] = React.useState(false);

  const handleShowPredictions = () => {
    if (showPredictions) {
      return setShowPredictions(false);
    }
    return setShowPredictions(true);
  };

  return (
    <>
      <Box
        sx={(theme) => ({
          padding: "18px",
          position: "sticky",
          bottom: "0px",
          zIndex: 100,
          backgroundColor:
            colorScheme === "dark" ? theme.colors.gray[8] : "white",
          boxShadow:
            "-1px -3px 9px rgb(0 0 0 / 5%), rgb(0 0 0 / 5%) 0px 20px 25px -5px, rgb(0 0 0 / 4%) 0px 10px 10px -5px",
        })}
      >
        <Button
          fullWidth
          // color="gray"
          variant="outline"
          sx={() => ({
            position: "sticky",
            bottom: "20px",
            left: "20px",
            borderColor: `#${props.color}`,
            color: colorScheme === "dark" ? "white" : `#${props.color}`,
            borderWidth: "2px",
          })}
          onClick={handleShowPredictions}
        >
          {showPredictions ? "Close" : "Scheduled Times"}
        </Button>
      </Box>
      <Dialog
        position={{ bottom: 20, left: isMobile ? "10px" : "20px" }}
        style={{ maxWidth: "calc(100% - 40px)" }}
        opened={showPredictions}
        onClose={() => setShowPredictions(false)}
        size="lg"
        radius="md"
        withCloseButton
      >
        <Table highlightOnHover captionSide="bottom">
          <caption>Scheduled times</caption>
          <thead>
            <tr>
              <th>Station</th>
              <th>Scheduled Arrival</th>
            </tr>
          </thead>
          <tbody>
            {data?.combined?.reverse().map((schedule: ISchedule) => {
              console.log({schedule})
              return (
                <tr
                  key={schedule.id}
                  onClick={() =>
                    props.onMove({
                      longitude: schedule.attributes.longitude,
                      latitude: schedule.attributes.latitude,
                      zoom: 14,
                    })
                  }
                >
                  <td>
                    <ActiveText
                      predictionStopId={schedule.relationships.stop.data.id}
                      vehicleStopId={vehicleStopId}
                      name="station"
                    >
                      {schedule.attributes.platform_name}
                    </ActiveText>
                  </td>
                  <td>
                    {schedule.attributes.arrival_time && (
                      <ActiveText
                        predictionStopId={schedule.relationships.stop.data.id}
                        vehicleStopId={vehicleStopId}
                        name="time"
                      >
                        <Time>{schedule.attributes.arrival_time}</Time>
                      </ActiveText>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Dialog>
    </>
  );
};
