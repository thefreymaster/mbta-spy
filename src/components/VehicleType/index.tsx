import React from "react";
import { Box, useMantineColorScheme } from "@mantine/core";
import {
  MdTram,
  MdDirectionsSubway,
  MdDirectionsRailway,
  MdOutlineDirectionsBus,
  MdPublic,
} from "react-icons/md";
import { useHistory, useParams } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { getBackgroundColor, getColor, getNavigationBackgroundColor } from "../../utils/getColors";

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

const NavIcon = ({
  value,
  icon,
  isIndex,
}: {
  value: string;
  icon: React.ReactNode;
  isIndex?: boolean;
}) => {
  const history = useHistory();
  const params: { transit_type: string } = useParams();
  const { colorScheme } = useMantineColorScheme();

  return (
    <Box
      onClick={() => {
        if (value) {
          return history.push(`/${value}`);
        }
        return history.push("/");
      }}
      sx={(theme) => ({
        color: getColor({
          theme,
          active: params.transit_type === value || (!!isIndex && !params.transit_type),
          colorScheme,
        }),
        borderRadius: "100px",
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: getBackgroundColor({
          theme,
          active: params.transit_type === value || (!!isIndex && !params.transit_type),
          colorScheme,
        }),
        transition: "background-color 250ms ease-in-out",
        "&:hover": {
          cursor: "pointer",
        },
      })}
    >
      {icon}
    </Box>
  );
};

export const VehicleType = () => {
  const position = isMobile
    ? {
        bottom: 20,
        left: "calc(50% - 100px)",
        zIndex: 100,
        display: "flex",
      }
    : { top: 75, left: 20, zIndex: 100 };
  const { colorScheme } = useMantineColorScheme();

  return (
    <Box
      sx={(theme) => ({
        position: "absolute",
        boxShadow: theme.shadows.xl,
        backgroundColor: getNavigationBackgroundColor({
          colorScheme,
          colors: theme.colors,
        }),
        padding: "5px",
        borderRadius: "15px 100px 100px 100px",
        flexDirection: isMobile ? "row" : "column",
        ...position,
      })}
    >
      <NavIcon value="" icon={<MdPublic />} isIndex />
      {data.map((type) => (
        <NavIcon key={type.value} value={type.value} icon={type.icon} />
      ))}
    </Box>
  );
};
