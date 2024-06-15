import { Box, useMantineColorScheme } from "@mantine/core";
import React from "react";
import { isMobile } from "react-device-detect";
import { BOX_SHADOW } from "../../constants/styles";


const Container = ({
  children,
  backgroundColor,
  position,
}: {
  children: React.ReactNode;
  backgroundColor: string;
  position: {
    left?: number | string;
    right?: number;
    top?: number;
    bottom?: number;
  };
}) => {
  return (
    <Box
      sx={(theme) => ({
        position: "absolute",
        zIndex: 100,
        boxShadow: BOX_SHADOW,
        backgroundColor,
        backdropFilter: "blur(4px)",
        padding: "5px",
        borderRadius: "15px 100px 100px 100px",
        ...position,
      })}
    >
      {children}
    </Box>
  );
};

const Button = ({
  children,
  backgroundColor,
  color,
  onClick,
  active,
}: {
  children: React.ReactNode;
  backgroundColor: string;
  color: string;
  onClick(v: any): any;
  active: boolean;
}) => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Box
      onClick={onClick}
      sx={() => ({
        color,
        borderRadius: "100px",
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor,
        transition:
          "background-color 150ms ease-in-out, box-shadow 150ms ease-in-out",
        "&:hover": {
          cursor: "pointer",
        },
        boxShadow: active ? BOX_SHADOW : "",
        "&:active": {
          backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
          boxShadow: "0px 0px 2px 0px inset",
        },
        "&:not(:last-child)": {
            marginBottom: 3,
            marginRight: isMobile ? 2 : 0
        },
      })}
    >
      {children}
    </Box>
  );
};

const MapInteractions = {
  Container,
  Button,
};

export default MapInteractions;
