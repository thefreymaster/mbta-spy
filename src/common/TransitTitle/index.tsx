import { Box, Divider, Title, useMantineColorScheme } from "@mantine/core";
import { TransitIcon } from "../../components/LiveMarker";

export const TransitTitle = (props: {
  type: number;
  color: string;
  label: string;
  description?: string;
  onClick?(): void;
  minWidth?: string;
  backgroundColor?: string;
}) => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <>
      <Box
        sx={() => ({
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: props.backgroundColor ?? `#${props?.color}`,
          color: "white",
          borderRadius: "100px 20px 100px 100px",
          padding: "3px 5px 3px 3px",
          minWidth: props.minWidth,
        })}
      >
        <Box
          sx={(theme) => ({
            backgroundColor:
              colorScheme === "dark"
                ? theme.colors.gray[9]
                : theme.colors.gray[0],
            borderRadius: 100,
            padding: 10,
          })}
        >
          <TransitIcon
            value={props.type}
            color={`#${props?.color}`}
            style={{ display: "flex" }}
            onClick={props.onClick}
          />
        </Box>
        <Box sx={{ flex: 1 }} />
        <Title
          sx={() => ({
            marginLeft: 5,
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            maxWidth: "160px",
          })}
          order={6}
        >
          {props.description}
        </Title>
        <Box sx={{ flex: 1 }} />
        <Title
          sx={(theme) => ({
            minWidth: "40px",
            background:
              colorScheme === "dark"
                ? theme.colors.gray[9]
                : theme.colors.gray[0],
            color: `#${props?.color}`,
            borderRadius: "50px 5px 50px 50px",
            padding: "5px",
            marginLeft: "5px",
          })}
          order={6}
        >
          {props.label}
        </Title>
      </Box>
    </>
  );
};
