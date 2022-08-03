import React from "react";
import {
  Avatar,
  Badge,
  Box,
  Center,
  Dialog,
  Drawer,
  Loader,
  Space,
  Text,
  Timeline,
  Title,
} from "@mantine/core";
import { isDesktop } from "react-device-detect";
import { TransitIcon } from "../LiveMarker";
import { useQuery } from "react-query";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Pulse from "../../common/Pulse";
import { VehicleInformationDialog } from "../VehicleInformation/index";

const socket = io(window.location.origin);

export const TransitTitle = (props: {
  type: number;
  color: string;
  label: string;
  description?: string;
}) => {
  return (
    <Box
      sx={() => ({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: `#${props?.color}`,
        color: "white",
        borderRadius: "100px 20px 100px 100px",
        padding: "0px 20px 0px 0px",
      })}
    >
      <Avatar radius="xl" style={{ border: `3px solid #${props.color}` }}>
        <TransitIcon
          value={props.type}
          color={props.color}
          style={{ display: "flex" }}
        />
      </Avatar>
      <Title
        sx={() => ({
          marginLeft: 5,
          minWidth: "40px",
        })}
        order={6}
      >
        {props.label}
      </Title>
      <Title
        sx={() => ({
          marginLeft: 5,
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
          maxWidth: "160px",
        })}
        order={6}
      >
        {props.description}
      </Title>
    </Box>
  );
};

const getCurrentStopIndex = (currentStopId: string, stops: any[]) => {
  if (!stops) {
    return -1;
  }
  let index;
  stops?.map((stop: any, stopIndex: number) =>
    stop?.relationships?.child_stops?.data?.map((childStop: any) => {
      if (childStop?.id === currentStopId) {
        index = stopIndex;
      }
    })
  );
  return index;
};

export const LineDrawer = (props: {
  lineRoute?: any;
  setLineRoute(s: any): void;
  onMove(event: any): void;
}) => {
  const history: any = useHistory();
  const location: any = useLocation();
  // const [vehicle, setVehicle]: any = React.useState();

  const params: { transit_type: string; route_id: string; transit_id: string } =
    useParams();

  // React.useEffect(() => {
  //   socket.on(params.transit_id, ({ data }: { data: any }) => {
  //     const parsed = JSON.parse(data);
  //     setVehicle(parsed);
  //   });

  //   return function cleanUp() {
  //     socket.disconnect();
  //   };
  // }, [params.transit_id]);

  const { isLoading, data } = useQuery(
    ["stops", params.route_id],
    () =>
      fetch(`/api/stops/${params?.route_id}`).then((res) => {
        return res.json();
      }),
    {
      enabled: !!params.route_id,
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const stops = data?.stops;
  const direction = location?.state?.vehicle.attributes?.direction_id;

  const currentStopIndex =
    getCurrentStopIndex(
      location?.state?.vehicle?.relationships?.stop?.data?.id,
      data?.stops
    ) ?? 0;

  return (
    <Drawer
      opened={!!params.transit_id && isDesktop}
      onClose={() => {
        props.onMove({
          longitude: location?.state?.vehicle.attributes.longitude,
          latitude: location?.state?.vehicle.attributes.latitude,
          zoom: 13,
        });
        history.push("/");
      }}
      title={
        <TransitTitle
          color={location?.state?.route?.attributes?.color}
          label={location?.state?.vehicle?.attributes?.label}
          type={location?.state?.route?.attributes?.type}
          description={
            location?.state?.route?.attributes?.short_name === ""
              ? location?.state?.route?.attributes?.long_name
              : location?.state?.route?.attributes?.short_name
          }
        />
      }
      padding="xl"
      size="lg"
      position="right"
      withOverlay={false}
      sx={() => ({ overflow: "scroll" })}
      styles={() => ({
        drawer: {
          borderRadius: "20px",
          margin: "20px",
        },
        header: {
          padding: "18px",
          position: "sticky",
          top: "0px",
          zIndex: 100,
          backgroundColor: "white",
          boxShadow:
            "0 1px 3px rgb(0 0 0 / 5%), rgb(0 0 0 / 5%) 0px 20px 25px -5px, rgb(0 0 0 / 4%) 0px 10px 10px -5px",
        },
      })}
      className="drawer"
    >
      {isLoading ? (
        <Center sx={() => ({ minHeight: "100%" })}>
          <Loader color="gray" />
        </Center>
      ) : (
        <>
          <Space h="md" />
          <Timeline
            reverseActive={direction === 1}
            active={
              direction === 0
                ? currentStopIndex
                : stops?.length - currentStopIndex - 1
            }
            bulletSize={24}
            lineWidth={2}
            sx={() => ({
              padding: "0px 32px 32px 32px",
            })}
          >
            {data?.stops?.map((stop: any, index: number) => {
              return (
                <Timeline.Item
                  lineVariant={index === currentStopIndex ? "dashed" : "solid"}
                  color="gray"
                  bullet={
                    <Box>
                      {currentStopIndex === index && (
                        <Pulse
                          color={location?.state?.route?.attributes?.color}
                        />
                      )}
                      <TransitIcon
                        value={location?.state?.route?.attributes?.type}
                        style={{ display: "flex" }}
                        onClick={() =>
                          props.onMove({
                            longitude: stop.attributes.longitude,
                            latitude: stop.attributes.latitude,
                            zoom: 14,
                          })
                        }
                      />
                    </Box>
                  }
                  title={stop?.attributes?.name}
                >
                  <Text size="xs" color="dimmed">
                    {stop?.attributes?.address}
                  </Text>
                </Timeline.Item>
              );
            })}
          </Timeline>
        </>
      )}
      {/* <VehicleInformationDialog /> */}
    </Drawer>
  );
};

// compare vehicle stop ID to stops ID
