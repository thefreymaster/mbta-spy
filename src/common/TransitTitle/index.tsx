import { Avatar, Box, Title } from "@mantine/core";
import { TransitIcon } from "../../components/LiveMarker";

export const TransitTitle = (props: {
  type: number;
  color: string;
  label: string;
  description?: string;
  onClick?(): void;
}) => {
  return (
    <>
      <Box
        sx={() => ({
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: `#${props?.color}`,
          color: "white",
          borderRadius: "100px 20px 100px 100px",
          padding: "3px 20px 3px 3px",
        })}
      >
        <Avatar radius="xl" >
          <TransitIcon
            value={props.type}
            color={props.color}
            style={{ display: "flex" }}
            onClick={props.onClick}
          />
        </Avatar>
        <Title
          sx={() => ({
            marginLeft: 5,
            minWidth: "40px",
          })}
          order={6}
        >
          {props.label}
        </Title>
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
      </Box>
    </>
  );
};
