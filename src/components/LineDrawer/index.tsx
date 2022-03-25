import { Badge, Box, Drawer, Space, Stepper, Title } from "@mantine/core";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { isDesktop } from "react-device-detect";
import { TransitIcon } from "../LiveMarker";

const DrawerTitle = (props: { type: number; title: string; color: string }) => {
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
        <Title sx={() => ({ color: `#${props.color}` })} order={6}>
          {props.title}
        </Title>
      </Box>
    </Box>
  );
};

export const LineDrawer = (props: {
  lineRoute?: any;
  setLineRoute(s: any): void;
}) => {
  if (!props.lineRoute) {
    return null;
  }
  const { route, vehicle } = props.lineRoute;
  const [start, end] = route?.attributes?.direction_destinations;
  const [outbound, inbound] = route?.attributes?.direction_names;

  console.log({ route, vehicle });
  return (
    <Drawer
      opened={!!props.lineRoute && isDesktop}
      onClose={() => props.setLineRoute(false)}
      title={
        <DrawerTitle
          color={route?.attributes?.color}
          title={props?.lineRoute?.route?.attributes?.long_name}
          type={route?.attributes?.type}
        />
      }
      padding="xl"
      size="lg"
      position="right"
      withOverlay={false}
    >
      <Badge
        fullWidth
        style={{
          backgroundColor: `#${route.attributes.color}`,
          color: "white",
        }}
      >
        {route.attributes.description}
      </Badge>
      <Space h="md" />
      <Stepper active={-1} breakpoint="sm" orientation="vertical">
        <Stepper.Step
          icon={<BsChevronUp />}
          label={end}
          description={inbound}
        ></Stepper.Step>
        <Stepper.Step
          icon={<BsChevronDown />}
          label={start}
          description={outbound}
        ></Stepper.Step>
      </Stepper>
    </Drawer>
  );
};
