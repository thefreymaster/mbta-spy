import { Box } from "@mantine/core";
import { isMobile } from "react-device-detect";
import { TbRoute, TbRouteOff } from "react-icons/tb";

export const LinesToggle = ({
  linesVisible,
  setLinesVisible,
}: {
  linesVisible: boolean;
  setLinesVisible(v: boolean): void;
}) => {
  const position = isMobile
    ? {
        bottom: 20,
        left: 20,
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
        onClick={() => setLinesVisible(true)}
        sx={() => ({
          color: linesVisible ? "black" : "white",
          borderRadius: "100px",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: linesVisible ? "white" : "black",
          transition: "background-color 250ms ease-in-out",
          "&:hover": {
            cursor: "pointer",
          },
        })}
      >
        <TbRoute />
      </Box>
      <Box
        onClick={() => setLinesVisible(false)}
        sx={() => ({
          color: linesVisible ? "white" : "black",
          borderRadius: "100px",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: linesVisible ? "black" : "white",
          transition: "background-color 250ms ease-in-out",
          "&:hover": {
            cursor: "pointer",
          },
        })}
      >
        <TbRouteOff />
      </Box>
    </Box>
  );
};
