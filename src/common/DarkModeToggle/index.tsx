import React from "react";

import { Box, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { isMobile } from "react-device-detect";
import { MdDarkMode, MdOutlineBrightnessLow } from "react-icons/md";
import {
  getBackgroundColor,
  getColor,
  getNavigationBackgroundColor,
} from "../../utils/getColors";
import MapInteractions from "../../components/MapInteractions";
import { IoMoonSharp, IoSunnyOutline } from "react-icons/io5";

export const DarkModeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const position = isMobile
    ? {
        bottom: 20,
        right: 20,
      }
    : { top: 420, left: 20 };

  return (
    <MapInteractions.Container
      position={position}
      backgroundColor={getNavigationBackgroundColor({
        colorScheme,
        colors: theme.colors,
      })}
    >
      <MapInteractions.Button
        onClick={() => toggleColorScheme("light")}
        color={getColor({
          theme,
          active: colorScheme === "light",
          colorScheme,
        })}
        backgroundColor={getBackgroundColor({
          theme,
          active: colorScheme === "light",
          colorScheme,
        })}
        active={colorScheme === "light"}
      >
        <IoSunnyOutline />
      </MapInteractions.Button>
      <Box mb="xs" />
      <MapInteractions.Button
        onClick={() => toggleColorScheme("dark")}
        color={getColor({
          theme,
          active: colorScheme === "dark",
          colorScheme,
        })}
        backgroundColor={getBackgroundColor({
          theme,
          active: colorScheme === "dark",
          colorScheme,
        })}
        active={colorScheme === "dark"}
      >
        <IoMoonSharp />
      </MapInteractions.Button>
    </MapInteractions.Container>
  );
};
