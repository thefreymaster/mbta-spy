import React from "react";
import {
  Badge,
  Box,
  Center,
  Drawer,
  Loader,
  Space,
  Text,
  Timeline,
  Title,
} from "@mantine/core";
import { useQueryClient } from "react-query";
import { isDesktop } from "react-device-detect";
import { TransitIcon } from "../LiveMarker";
import { useQuery } from "react-query";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { Route } from "../../interfaces";

const socket = io(window.location.origin);

const DrawerTitle = (props: {
  type: number;
  title: string;
  color: string;
  label: string;
}) => {
  return (
    <Box
      sx={() => ({
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      })}
    >
      <Box
        sx={() => ({
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        })}
      >
        <TransitIcon
          value={props?.type}
          color={props.color}
          style={{
            border: "3px solid",
            borderRadius: "100px",
            padding: "5px",
          }}
        />
      </Box>
      <Space w={5} />
      <Box
        sx={() => ({
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        })}
      >
        <Title
          sx={() => ({
            color: `#${props.color}`,
            marginRight: "4px",
            paddingRight: "4px",
            borderRight: `2px solid #${props.color}`,
          })}
          order={6}
        >
          {props.label}
        </Title>
        <Title sx={() => ({ color: `#${props.color}` })} order={6}>
          {props.title}
        </Title>
      </Box>
    </Box>
  );
};

const getCurrentStopIndex = (currentStopId: string, stops: any[]) => {
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
}) => {
  const history: any = useHistory();
  const location: any = useLocation();
  const [vehicle, setVehicle]: any = React.useState(location?.state?.vehicle);
  const params: { transit_type: string; route_id: string; transit_id: string } =
    useParams();

  React.useEffect(() => {
    socket.on(params.transit_id, ({ data }: { data: any }) => {
      const parsed = JSON.parse(data);
      setVehicle(parsed);
      console.log(parsed);
      // if (parsed.id === params.transit_id) {
      //   setVehicle(parsed);
      // }
    });

    return function cleanUp() {
      socket.disconnect();
    };
  }, [params.transit_id]);

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

  const currentStopIndex =
    getCurrentStopIndex(
      location?.state?.vehicle?.relationships?.stop?.data?.id,
      data?.stops
    ) ?? 0;

  //add socket listener to know when stop changes

  return (
    <Drawer
      opened={!!params.transit_id && isDesktop}
      onClose={() => history.push("/")}
      title={
        <DrawerTitle
          color={location?.state?.route?.attributes?.color}
          title={props?.lineRoute?.route?.attributes?.long_name}
          label={location?.state?.vehicle?.attributes?.label}
          type={location?.state?.route?.attributes?.type}
        />
      }
      padding="xl"
      size="lg"
      position="right"
      withOverlay={false}
      sx={() => ({ overflow: "scroll" })}
      className="drawer"
    >
      {isLoading ? (
        <Center sx={() => ({ minHeight: "100%" })}>
          <Loader color="gray" />
        </Center>
      ) : (
        <>
          <Badge
            fullWidth
            style={{
              backgroundColor: `#${location?.state?.route?.attributes?.color}`,
              color: "white",
            }}
          >
            {location?.state?.route.attributes.description}
          </Badge>
          <Space h="md" />
          <Timeline active={currentStopIndex} bulletSize={24} lineWidth={2}>
            {data?.stops?.map((stop: any, index: number) => {
              return (
                <Timeline.Item
                  lineVariant={index === currentStopIndex ? "dashed" : "solid"}
                  color="gray"
                  bullet={
                    <TransitIcon
                      value={location?.state?.route?.attributes?.type}
                    />
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
    </Drawer>
  );
};

// compare vehicle stop ID to stops ID
