import { Box, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { isMobile } from "react-device-detect";
import { MdDarkMode, MdGpsFixed } from "react-icons/md";
import {
  getBackgroundColor,
  getColor,
  getNavigationBackgroundColor,
} from "../../utils/getColors";
import MapInteractions from "../../components/MapInteractions";

export const CenterMapToggle = ({
  handleOnMoveToCenter,
}: {
  handleOnMoveToCenter(): void;
}) => {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const position = isMobile
    ? {
        bottom: 130,
        right: 20,
      }
    : { top: 540, left: 20 };

  return (
    <MapInteractions.Container
      position={position}
      backgroundColor={getNavigationBackgroundColor({
        colorScheme,
        colors: theme.colors,
      })}
    >
      <MapInteractions.Button
        onClick={handleOnMoveToCenter}
        color={getColor({
          theme,
          active: true,
          colorScheme,
        })}
        backgroundColor={getBackgroundColor({
          theme,
          active: true,
          colorScheme,
        })}
        active
      >
        <MdGpsFixed />
      </MapInteractions.Button>
    </MapInteractions.Container>
  );
};
