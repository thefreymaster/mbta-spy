import { Badge, Drawer, Space, Stepper } from "@mantine/core";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

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

  console.log(vehicle);
  return (
    <Drawer
      opened={!!props.lineRoute}
      onClose={() => props.setLineRoute(false)}
      title={`${props?.lineRoute?.route?.attributes?.long_name}`}
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
      <Stepper
        active={-1}
        breakpoint="sm"
        orientation="vertical"
      >
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
