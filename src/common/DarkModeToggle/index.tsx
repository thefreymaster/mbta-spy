import React from "react";

import { Box, useMantineColorScheme } from "@mantine/core";
import { isMobile } from "react-device-detect";
import { TbRoute, TbRouteOff } from "react-icons/tb";
import { MdDarkMode, MdOutlineBrightnessLow } from "react-icons/md";

export const DarkModeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const position = isMobile
    ? {
        bottom: 20,
        left: 20,
      }
    : { top: 410, left: 20 };

  return (
    <Box
      sx={(theme) => ({
        position: "absolute",
        zIndex: 100,
        boxShadow: theme.shadows.xl,
        backgroundColor: "#1A1B1E",
        padding: "5px",
        borderRadius: "15px 100px 100px 100px",
        ...position,
      })}
    >
      <Box
        onClick={() => toggleColorScheme()}
        sx={() => ({
          color: colorScheme === "dark" ? "#1A1B1E" : "white",
          borderRadius: "100px",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colorScheme === "dark" ? "white" : "#1A1B1E",
          transition: "background-color 250ms ease-in-out",
          "&:hover": {
            cursor: "pointer",
          },
        })}
      >
        <MdOutlineBrightnessLow />
      </Box>
      <Box
        onClick={() => toggleColorScheme()}
        sx={() => ({
          color: colorScheme === "dark" ? "white" : "#1A1B1E",
          borderRadius: "100px",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colorScheme === "dark" ? "#1A1B1E" : "white",
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
