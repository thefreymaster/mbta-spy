import {
  Drawer,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import MapInteractions from "../MapInteractions";
import {
  getBackgroundColor,
  getColor,
  getNavigationBackgroundColor,
} from "../../utils/getColors";
import { IoSettings } from "react-icons/io5";
import StatusBar from "../../common/StatusBar";

export const SettingsDrawer = () => {
  const [opened, setOpened] = useState(false);

  const position = { top: 15, right: 20, zIndex: 100 };
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Settings"
        padding="xl"
        size="md"
        overlayOpacity={0.55}
        overlayBlur={3}
        position="right"
      >
        {/* Drawer content */}
        <StatusBar />
      </Drawer>

      <MapInteractions.Container
        position={position}
        backgroundColor={getNavigationBackgroundColor({
          colorScheme,
          colors: theme.colors,
        })}
      >
        <MapInteractions.Button
          onClick={() => setOpened(true)}
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
          <IoSettings />
        </MapInteractions.Button>
      </MapInteractions.Container>
    </>
  );
};
