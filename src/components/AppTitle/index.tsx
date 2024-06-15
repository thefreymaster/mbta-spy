import { Box, Title, useMantineColorScheme } from "@mantine/core";
import { AppIcon } from "../../common/AppIcon";
import {
  BOX_SHADOW,
  BRIGHT_BACKGROUND_COLOR,
  DARK_BACKGROUND_COLOR,
} from "../../constants/styles";

export const AppTitle = () => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor:
          colorScheme === "dark"
            ? DARK_BACKGROUND_COLOR
            : BRIGHT_BACKGROUND_COLOR,
        borderRadius: "100px 20px 100px 100px",
        boxShadow: BOX_SHADOW,
        backdropFilter: "blur(10px)"
      })}
    >
      <AppIcon />
      <Title
        sx={(theme) => ({
          margin: "0px 20px 0px 10px",
          minWidth: "40px",
          color:
            colorScheme === "dark"
              ? theme.colors.gray[1]
              : theme.colors.gray[8],
        })}
        order={6}
      >
        MBTA Spy
      </Title>
    </Box>
  );
};
