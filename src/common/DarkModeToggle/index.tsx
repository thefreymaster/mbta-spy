import React from "react";

import { Box, useMantineColorScheme } from "@mantine/core";
import { isMobile } from "react-device-detect";
import { TbRoute, TbRouteOff } from "react-icons/tb";
import { MdDarkMode, MdOutlineBrightnessLow } from "react-icons/md";
import { getBackgroundColor, getColor, getNavigationBackgroundColor } from "../../utils/getColors";

export const DarkModeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const position = isMobile
    ? {
        bottom: 20,
        right: 20,
      }
    : { top: 410, left: 20 };

  return (
    <Box
      sx={(theme) => ({
        position: "absolute",
        zIndex: 100,
        boxShadow: theme.shadows.xl,
        backgroundColor: getNavigationBackgroundColor({
          colorScheme,
          colors: theme.colors,
        }),
        padding: "5px",
        borderRadius: "15px 100px 100px 100px",
        ...position,
      })}
    >
      <Box
        onClick={() => toggleColorScheme("light")}
        sx={(theme) => ({
          color: getColor({
            theme,
            active: colorScheme === "light",
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
            active: colorScheme === "light",
            colorScheme,
          }),
          transition: "background-color 250ms ease-in-out",
          "&:hover": {
            cursor: "pointer",
          },
        })}
      >
        <MdOutlineBrightnessLow />
      </Box>
      <Box
        onClick={() => toggleColorScheme("dark")}
        sx={(theme) => ({
          color: getColor({
            theme,
            active: colorScheme === "dark",
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
            active: colorScheme === "dark",
            colorScheme,
          }),
          transition: "background-color 250ms ease-in-out",
          "&:hover": {
            cursor: "pointer",
          },
        })}
      >
        <MdDarkMode />
      </Box>
    </Box>
  );
};
