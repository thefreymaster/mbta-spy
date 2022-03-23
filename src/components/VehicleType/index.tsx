import React from "react";
import { forwardRef } from "react";
import { Group, Text, Select } from "@mantine/core";
import {
  MdTram,
  MdDirectionsSubway,
  MdDirectionsRailway,
  MdOutlineDirectionsBus,
} from "react-icons/md";

const data = [
  {
    image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
    label: "Lite Rail",
    value: "0",
    icon: <MdTram />,
  },

  {
    image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
    label: "Subway",
    value: "1",
    icon: <MdDirectionsSubway />,
  },
  {
    image: "https://img.icons8.com/clouds/256/000000/homer-simpson.png",
    label: "Commuter Rail",
    value: "2",
    icon: <MdDirectionsRailway />,
  },
  {
    image: "https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png",
    label: "Bus",
    value: "3",
    icon: <MdOutlineDirectionsBus />,
  },
];

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
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
  ({ image, label, description, ...others }: ItemProps, ref) => {
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

export const VehicleType = () => {
  return (
    <Select
      sx={{ position: "absolute", top: 20, left: 20, zIndex: 100 }}
      placeholder="Vehicle Type"
      itemComponent={SelectItem}
      data={data}
      searchable
      maxDropdownHeight={400}
      nothingFound="Nobody here"
      filter={(value, item: any) =>
        item.label.toLowerCase().includes(value.toLowerCase().trim())
      }
    />
  );
};
