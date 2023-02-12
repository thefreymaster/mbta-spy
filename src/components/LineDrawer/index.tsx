import React from "react";
import {
  Box,
  Center,
  Drawer,
  Loader,
  Space,
  Text,
  Timeline,
  Tooltip,
} from "@mantine/core";
import { isDesktop } from "react-device-detect";
import { useQuery, useQueryClient } from "react-query";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Pulse from "../../common/Pulse";
import { TransitTitle } from "../../common/TransitTitle";
import { getCurrentStopIndex } from "../../utils/getCurrentStopIndex";
import { Time } from "../../common/Time";
import { GrWheelchair } from "react-icons/gr";

const socket = io(window.location.origin);

const StopTitle = ({
  name,
  predictions,
}: {
  name: string;
  predictions: any;
}) => {
  const [stop] = predictions.filter((prediction: any) => {
    return (
      prediction?.attributes?.platform_name?.toLowerCase() ===
      name?.toLowerCase()
    );
  });
  return (
    <Box display="flex">
      <Box>{name}</Box>

      {stop?.attributes?.arrival_time && (
        <>
          <Box
            sx={{
              flex: 1,
              margin: "0px 10px 8px 10px",
              borderBottom: "2px dashed silver",
            }}
          />
          <Text size="xs" fw={700}>
            <Time>{stop?.attributes?.arrival_time}</Time>
          </Text>
        </>
      )}
    </Box>
  );
};

export const LineDrawer = (props: {
  lineRoute?: any;
  setLineRoute(s: any): void;
  onMove(event: any): void;
  setLineDrawerIsOpen(event: boolean): void;
  lineDrawerIsOpen: boolean;
}) => {
  const history: any = useHistory();
  const location: any = useLocation();
  const params: {
    transit_type: string;
    route_id: string;
    transit_id: string;
    trip_id: string;
  } = useParams();

  const queryClient = useQueryClient();
  const { routes }: any = queryClient.getQueryData("routes");
  const [route] = routes.filter(
    (_route: { id: string }) => _route?.id === params?.route_id
  );

  const { data: predictionsData, isLoading: predictionsIsLoading } = useQuery(
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
  const direction_id = location?.state?.vehicle.attributes?.direction_id;

  const currentStopIndex =
    getCurrentStopIndex(
      location?.state?.vehicle?.relationships?.stop?.data?.id,
      data?.stops
    ) ?? 0;

  const handleClickHeader = () =>
    props.onMove({
      longitude: location?.state?.vehicle.attributes.longitude,
      latitude: location?.state?.vehicle.attributes.latitude,
      zoom: 14,
    });

  const getReverseActiveState = (): boolean => {
    if (params.route_id === "Red") {
      if (direction_id === 0) {
        return false;
      }
      return true;
    } else if (direction_id === 0) {
      return true;
    }
    return false;
  };

  const getActiveState = () => {
    if (params.route_id === "Red") {
      return direction_id === 1
        ? stops?.length - currentStopIndex - 1
        : currentStopIndex;
    }
    return direction_id === 0
      ? stops?.length - currentStopIndex - 1
      : currentStopIndex;
  };

  return (
    <Drawer
      opened={(!!params.transit_id && isDesktop) || props.lineDrawerIsOpen}
      onClose={() => {
        if (isDesktop) {
          props.onMove({
            longitude: location?.state?.vehicle.attributes.longitude,
            latitude: location?.state?.vehicle.attributes.latitude,
            zoom: 13,
          });
          history.push(`/${params.transit_type}`);
        }
        props.setLineDrawerIsOpen(false);
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
          onClick={handleClickHeader}
          minWidth="85%"
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
          boxShadow:
            "0 1px 3px rgb(0 0 0 / 5%), rgb(0 0 0 / 5%) 0px 20px 25px -5px, rgb(0 0 0 / 4%) 0px 10px 10px -5px",
        },
      })}
      className="drawer"
    >
      {isLoading || predictionsIsLoading ? (
        <Center sx={() => ({ minHeight: "100%" })}>
          <Loader color="gray" />
        </Center>
      ) : (
        <>
          <Space h="md" />
          <Timeline
            reverseActive={getReverseActiveState()}
            active={getActiveState()}
            bulletSize={16}
            lineWidth={2}
            sx={() => ({
              padding: "0px 32px 32px 32px",
              "&:hover": {
                cursor: "pointer",
              },
            })}
          >
            {data?.stops?.map((stop: any, index: number) => {
              return (
                <Timeline.Item
                  lineVariant={index === currentStopIndex ? "dashed" : "solid"}
                  onClick={() =>
                    props.onMove({
                      longitude: stop.attributes.longitude,
                      latitude: stop.attributes.latitude,
                      zoom: 14,
                    })
                  }
                  color="gray"
                  title={
                    <StopTitle
                      name={stop?.attributes?.name}
                      predictions={predictionsData?.combined}
                    />
                  }
                >
                  {currentStopIndex === index && (
                    <Pulse color={location?.state?.route?.attributes?.color} />
                  )}
                  <Box display="flex">
                    <Text size="xs" color="dimmed">
                      {stop?.attributes?.address}
                    </Text>
                    {/* {stop?.attributes?.wheelchair_boarding === 1 && (
                      <>
                        <Box
                          sx={{
                            flex: 1,
                          }}
                        />
                        <Box
                          sx={{
                            minWidth: 30,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <GrWheelchair
                            style={{
                              padding: "5px",
                              border: "1px solid silver",
                              borderRadius: "100px",
                              fontSize: "12px",
                            }}
                          />
                        </Box>
                      </>
                    )} */}
                  </Box>
                </Timeline.Item>
              );
            })}
          </Timeline>
        </>
      )}
    </Drawer>
  );
};
