import React from "react";
import {
  Box,
  Center,
  Drawer,
  Loader,
  Space,
  Text,
  ThemeIcon,
  Timeline,
  useMantineColorScheme,
} from "@mantine/core";
import { isDesktop, isMobile } from "react-device-detect";
import { useQuery, useQueryClient } from "react-query";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Pulse from "../../common/Pulse";
import { getCurrentStopIndex } from "../../utils/getCurrentStopIndex";
import { Time } from "../../common/Time";
import { DrawerTitle } from "./DrawerTitle";
import { getBackgroundColor } from "../../utils/getColors";
import { LineAttributes } from "../LineAttributes";
import { getVehicle } from "../../utils/getVehicle";
import { Schedule } from "../Schedule";

const StopTitle = ({
  name,
  predictions,
}: {
  name: string;
  predictions: any;
}) => {
  const [stop] = predictions?.filter((prediction: any) => {
    return (
      prediction?.attributes?.platform_name?.toLowerCase() ===
      name?.toLowerCase()
    );
  });
  const { colorScheme } = useMantineColorScheme();

  return (
    <Box display="flex">
      <Text
        sx={(theme) => ({
          color:
            colorScheme === "dark"
              ? theme.colors.gray[5]
              : theme.colors.gray[9],
        })}
        size="xs"
        fw={700}
      >
        {name}
      </Text>
      {stop?.attributes?.arrival_time && (
        <>
          <Box
            sx={(theme) => ({
              flex: 1,
              margin: "0px 10px 8px 10px",
              borderBottom:
                colorScheme === "dark"
                  ? `2px dashed ${theme.colors.gray[7]}`
                  : `2px dashed ${theme.colors.gray[4]}`,
            })}
          />
          <Text
            sx={(theme) => ({
              color:
                colorScheme === "dark"
                  ? theme.colors.gray[5]
                  : theme.colors.gray[9],
            })}
            size="xs"
            fw={700}
          >
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
  vehicles: any[];
}) => {
  const { colorScheme } = useMantineColorScheme();
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
  const [fullHeight, setFullHeight] = React.useState(false);

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
  const vehicle = getVehicle(props.vehicles, params?.transit_id);
  const direction_id = vehicle?.attributes?.direction_id;

  const currentStopIndex =
    getCurrentStopIndex(vehicle?.relationships?.stop?.data?.id, data?.stops) ??
    0;

  const handleClickHeader = () =>
    props.onMove({
      longitude: vehicle?.attributes.longitude,
      latitude: vehicle?.attributes.latitude,
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

  const getSize = () => {
    if (isDesktop) {
      return "40vh";
    }
    if (fullHeight) {
      return "90vh";
    }
    return "28vh";
  };

  const getIsStopActive = (index: number) => {
    if (params.route_id === "Red") {
      return direction_id === 1
        ? index > currentStopIndex
        : index < currentStopIndex;
    }
    return direction_id === 0
      ? index > currentStopIndex
      : index < currentStopIndex;
  };

  return (
    <Drawer
      align="right"
      opened={!!params.transit_id}
      withCloseButton={false}
      title={
        <DrawerTitle
          handleClickHeader={handleClickHeader}
          fullHeight={fullHeight}
          setFullHeight={setFullHeight}
          onClose={() => {
            if (isDesktop) {
              props.onMove({
                longitude: vehicle?.attributes.longitude,
                latitude: vehicle?.attributes.latitude,
                zoom: 12,
              });
            }
            history.push(`/`);
            props.setLineDrawerIsOpen(false);
          }}
        />
      }
      // @ts-ignore
      padding={isMobile ? "xl" : "none"}
      size={getSize()}
      position={isMobile ? "bottom" : "right"}
      withOverlay={false}
      sx={() => ({ overflow: "scroll" })}
      styles={(theme) => ({
        drawer: {
          borderRadius: isMobile ? "0px" : "20px",
          margin: isMobile ? "0px" : "20px",
          backgroundColor:
            colorScheme === "dark"
              ? theme.colors.gray[9]
              : theme.colors.gray[2],
        },
        header: {
          padding: "18px",
          position: "sticky",
          top: "0px",
          zIndex: 100,
          backgroundColor: getBackgroundColor({
            theme,
            active: true,
            colorScheme,
          }),
          boxShadow:
            "0 1px 3px rgb(0 0 0 / 5%), rgb(0 0 0 / 5%) 0px 20px 25px -5px, rgb(0 0 0 / 4%) 0px 10px 10px -5px",
        },
        title: {
          marginRight: "0px",
          minWidth: "100%",
        },
        body: {
          backgroundColor:
            colorScheme === "dark"
              ? theme.colors.gray[9]
              : theme.colors.gray[2],
        },
        overlay: {
          backgroundColor:
            colorScheme === "dark"
              ? theme.colors.gray[9]
              : theme.colors.gray[2],
        },
        closeButton: {
          color: "red",
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
          <LineAttributes
            speed={vehicle?.attributes?.speed}
            bearing={vehicle?.attributes?.bearing}
          />
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
            align="right"
          >
            {data?.stops?.map((stop: any, index: number) => (
              <Timeline.Item
                lineVariant={
                  index + 1 === currentStopIndex ? "dashed" : "solid"
                }
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
                bullet={
                  <ThemeIcon
                    size={16}
                    sx={(theme) => ({
                      backgroundColor: getIsStopActive(index)
                        ? `#${location?.state?.route?.attributes?.color}`
                        : theme.colors.gray[2],
                      borderRadius: 1000,
                      border: "2px solid",
                      borderColor: "black",
                    })}
                  >
                    {" "}
                  </ThemeIcon>
                }
              >
                {currentStopIndex === index && (
                  <Pulse color={location?.state?.route?.attributes?.color} />
                )}
                <Box display="flex">
                  <Text size="xs" color="dimmed">
                    {stop?.attributes?.address}
                  </Text>
                </Box>
              </Timeline.Item>
            ))}
          </Timeline>
        </>
      )}
      <Schedule
        color={location?.state?.route?.attributes?.color}
        direction={route?.attributes?.direction_names[direction_id]}
        onMove={props.onMove}
      />
    </Drawer>
  );
};
