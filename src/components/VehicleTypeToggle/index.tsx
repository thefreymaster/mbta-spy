import React from "react";
import { Box, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import {
  MdTram,
  MdDirectionsSubway,
  MdDirectionsRailway,
  MdOutlineDirectionsBus,
  MdPublic,
} from "react-icons/md";
import { useHistory, useParams } from "react-router-dom";
import { isMobile } from "react-device-detect";
import {
  getBackgroundColor,
  getColor,
  getNavigationBackgroundColor,
} from "../../utils/getColors";
import MapInteractions from "../MapInteractions";

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
  const theme = useMantineTheme();

  return (
    <MapInteractions.Button
      onClick={() => {
        if (value) {
          return history.push(`/${value}`);
        }
        return history.push("/");
      }}
      color={getColor({
        theme,
        active:
          params.transit_type === value || (!!isIndex && !params.transit_type),
        colorScheme,
      })}
      backgroundColor={getBackgroundColor({
        theme,
        active:
          params.transit_type === value || (!!isIndex && !params.transit_type),
        colorScheme,
      })}
      active={
        params.transit_type === value || (!!isIndex && !params.transit_type)
      }
    >
      {icon}
    </MapInteractions.Button>
    // <Box
    // onClick={() => {
    //   if (value) {
    //     return history.push(`/${value}`);
    //   }
    //   return history.push("/");
    // }}
    //   sx={(theme) => ({
    // color: getColor({
    //   theme,
    //   active:
    //     params.transit_type === value ||
    //     (!!isIndex && !params.transit_type),
    //   colorScheme,
    // }),
    //     borderRadius: "100px",
    //     width: "40px",
    //     height: "40px",
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    // backgroundColor: getBackgroundColor({
    //   theme,
    //   active:
    //     params.transit_type === value ||
    //     (!!isIndex && !params.transit_type),
    //   colorScheme,
    // }),
    //     transition: "background-color 250ms ease-in-out",
    //     "&:hover": {
    //       cursor: "pointer",
    //     },
    //   })}
    // >
    //   {icon}
    // </Box>
  );
};

export const VehicleTypeToggle = () => {
  const position = isMobile
    ? {
        bottom: 20,
        left:"calc(50% - 110px)",
        zIndex: 100,
        display: 'flex'
      }
    : { top: 75, left: 20, zIndex: 100 };
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <MapInteractions.Container
      position={position}
      backgroundColor={getNavigationBackgroundColor({
        colorScheme,
        colors: theme.colors,
      })}
    >
      <NavIcon value="" icon={<MdPublic />} isIndex />
      {data.map((type) => (
        <NavIcon key={type.value} value={type.value} icon={type.icon} />
      ))}
    </MapInteractions.Container>
  );
};
