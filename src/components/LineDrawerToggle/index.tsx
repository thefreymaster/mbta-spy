import { Box } from "@mantine/core";
import React from "react";
import { isMobile } from "react-device-detect";
import { TbInfoCircle } from "react-icons/tb";

export const LinesDrawerToggle = ({
  setLineDrawerIsOpen,
}: {
  setLineDrawerIsOpen(v: boolean): void;
}) => {
  const position = isMobile
    ? {
        bottom: 20,
        right: 20,
      }
    : { top: 300, left: 20 };

  return (
    <Box
      sx={(theme) => ({
        position: "absolute",
        zIndex: 100,
        boxShadow: theme.shadows.xl,
        backgroundColor: "black",
        padding: "5px",
        borderRadius: "15px 100px 100px 100px",
        ...position,
      })}
    >
      <Box
        onClick={() => setLineDrawerIsOpen(true)}
        sx={() => ({
          color: "black",
          borderRadius: "100px",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          transition: "background-color 250ms ease-in-out",
          "&:hover": {
            cursor: "pointer",
          },
        })}
      >
        <TbInfoCircle />
      </Box>
    </Box>
  );
};
