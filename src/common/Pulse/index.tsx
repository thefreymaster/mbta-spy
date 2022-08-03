import React from "react";
import "./index.css";
import classnames from "classnames";
import { Box } from "@mantine/core";

const Pulse = (props: { color: string }) => (
  <Box
    style={{ minWidth: 8, minHeight: 8, backgroundColor: `#${props.color}` }}
    className={classnames({
      pulse: true,
    })}
    sx={() => ({
      "&:before": {
        backgroundColor: `#${props.color}`,
      },
    })}
  />
);

export default Pulse;
