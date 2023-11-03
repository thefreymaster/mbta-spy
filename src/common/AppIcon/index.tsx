import { Box, ThemeIcon, useMantineColorScheme } from "@mantine/core";
import { IoTrain } from "react-icons/io5";

export const AppIcon = () => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <ThemeIcon
      sx={(theme) => ({
        borderRadius: 100,
        padding: 3,
        margin: 5,
        backgroundColor:
          colorScheme === "dark" ? theme.colors.gray[9] : theme.colors.gray[1],
        color:
          colorScheme === "dark" ? theme.colors.gray[1] : theme.colors.gray[9],
      })}
      size="lg"
    >
      <IoTrain size={20} />
    </ThemeIcon>
  );
};
