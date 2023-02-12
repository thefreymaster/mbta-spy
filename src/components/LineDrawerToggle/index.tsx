import { Box } from "@mantine/core";
import React from "react";
import { isMobile } from "react-device-detect";
import { MdAccessTime } from "react-icons/md";

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
        backgroundColor: "#1A1B1E",
        padding: "5px",
        borderRadius: "15px 100px 100px 100px",
        ...position,
      })}
    >
      <Box
        onClick={() => setLineDrawerIsOpen(true)}
        sx={() => ({
          color: "#1A1B1E",
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
        <MdAccessTime />
      </Box>
    </Box>
  );
};
