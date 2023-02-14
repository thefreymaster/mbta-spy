import { Box, useMantineColorScheme } from "@mantine/core";
import { isMobile } from "react-device-detect";
import { TbRoute, TbRouteOff } from "react-icons/tb";
import {
  getBackgroundColor,
  getColor,
  getNavigationBackgroundColor,
} from "../../utils/getColors";

export const LinesToggle = ({
  linesVisible,
  setLinesVisible,
}: {
  linesVisible: boolean;
  setLinesVisible(v: boolean): void;
}) => {
  const { colorScheme } = useMantineColorScheme();
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
        onClick={() => setLinesVisible(true)}
        sx={(theme) => ({
          color: getColor({
            theme,
            active: linesVisible === true,
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
            active: linesVisible === true,
            colorScheme,
          }),
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
        sx={(theme) => ({
          color: getColor({
            theme,
            active: linesVisible === false,
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
            active: linesVisible === false,
            colorScheme,
          }),
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
