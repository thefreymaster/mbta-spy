import { Box, Tooltip, Text, useMantineColorScheme } from "@mantine/core";
import React from "react";
import { getDirection } from "../../utils/getDirection";

const Speed = ({ mph }: { mph: number }) => {
  const { colorScheme } = useMantineColorScheme();

  if (!mph) {
    return null;
  }
  return (
    <Tooltip label="Current MPH">
      <Box
        sx={{
          padding: "0px 15px",
          borderRadius: "100px 20px 100px 100px",
          //   height: "50px",
          //   width: "50px",
          border: "2px solid",
          display: "flex",
          alignItems: "center",
          justifyContent: "cetner",
          marginRight: "5px",
        }}
      >
        <Text
          sx={(theme) => ({
            color:
              colorScheme === "dark"
                ? theme.colors.gray[5]
                : theme.colors.gray[6],
          })}
        >
          {mph || "N/A"} {mph && "mph"}
        </Text>
      </Box>
    </Tooltip>
  );
};

const Direction = ({ bearing }: { bearing: number }) => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Tooltip label="Current Direction">
      <Box
        sx={{
          padding: "0px 15px",
          borderRadius: "100px 20px 100px 100px",
          //   height: "50px",
          //   width: "50px",
          border: "2px solid",
          display: "flex",
          alignItems: "center",
          justifyContent: "cetner",
        }}
      >
        <Text
          sx={(theme) => ({
            color:
              colorScheme === "dark"
                ? theme.colors.gray[5]
                : theme.colors.gray[6],
          })}
        >
          {`${getDirection(bearing)} Bound` || "N/A"}
        </Text>
      </Box>
    </Tooltip>
  );
};

export const LineAttributes = ({
  speed,
  bearing,
}: {
  speed: number;
  bearing: number;
}) => {
  return (
    <Box display="flex" sx={{ padding: "0px 20px" }}>
      <Speed mph={speed} />
      <Direction bearing={bearing} />
    </Box>
  );
};
