import React from "react";
import { forwardRef } from "react";
import { Group, Text, Select } from "@mantine/core";
import {
  MdTram,
  MdDirectionsSubway,
  MdDirectionsRailway,
  MdOutlineDirectionsBus,
} from "react-icons/md";
import { useHistory, useParams } from "react-router-dom";

const transitTypes = new Map();
transitTypes.set("0", "lite-rail");
transitTypes.set("1", "subway");
transitTypes.set("2", "commuter-rail");
transitTypes.set("3", "bus");

const data = [
  {
    label: "Lite Rail",
    value: "0",
    route: "lite-rail",
    icon: <MdTram />,
  },

  {
    label: "Subway",
    value: "1",
    route: "subway",
    icon: <MdDirectionsSubway />,
  },
  {
    label: "Commuter Rail",
    value: "2",
    route: "commuter-rail",
    icon: <MdDirectionsRailway />,
  },
  {
    label: "Bus",
    value: "3",
    route: "bus",
    icon: <MdOutlineDirectionsBus />,
  },
];

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
  description: string;
  icon: React.ReactNode;
  value: number;
}

const getTransitType = (value: number) => {
  const transitTypes = new Map();
  transitTypes.set(0, <MdTram />);
  return transitTypes.get(value) ?? transitTypes.get(0);
};

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, description, ...others }: ItemProps, ref) => {
    return (
      <div ref={ref} {...others}>
        <Group noWrap>
          {others.icon}

          <div>
            <Text size="sm">{label}</Text>
          </div>
        </Group>
      </div>
    );
  }
);

export const VehicleType = (props: {
  setVehicleType: any;
  vehicleType: string;
}) => {
  const history = useHistory();
  const params: { transit_type: string } = useParams();
  return (
    <Select
      clearable
      allowDeselect
      sx={{ position: "absolute", top: 75, left: 20, zIndex: 100 }}
      placeholder="Line Type"
      itemComponent={SelectItem}
      value={params?.transit_type}
      onChange={(value: any) => {
        // props.setVehicleType();
        if (value) {
          history.push(`/${value}`);
        } else {
          history.push("/");
        }
      }}
      data={data}
      searchable={false}
      maxDropdownHeight={400}
      nothingFound="Nobody here"
      filter={(value, item: any) =>
        item.label.toLowerCase().includes(value.toLowerCase().trim())
      }
    />
  );
};
