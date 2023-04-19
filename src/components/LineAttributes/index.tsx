import { Box, Tooltip } from "@mantine/core";
import React from "react";
import { getDirection } from "../../utils/getDirection";

const Speed = ({ mph }: { mph: number }) => {
  if (!mph) {
    return null;
  }
  return (
    <Tooltip label="Current MPH">
      <Box
        sx={{
          padding: "5px 15px",
          borderRadius: "100px",
          //   height: "50px",
          //   width: "50px",
          border: "2px solid",
          display: "flex",
          alignItems: "center",
          justifyContent: "cetner",
          marginRight: "5px",
        }}
      >
        {mph || "N/A"} {mph && "mph"}
      </Box>
    </Tooltip>
  );
};

const Direction = ({ bearing }: { bearing: number }) => {
  return (
    <Tooltip label="Current Direction">
      <Box
        sx={{
          padding: "0px 15px",
          borderRadius: "100px",
          //   height: "50px",
          //   width: "50px",
          border: "2px solid",
          display: "flex",
          alignItems: "center",
          justifyContent: "cetner",
        }}
      >
        {getDirection(bearing) || "N/A"}
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
