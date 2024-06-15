import { Text, useMantineColorScheme } from "@mantine/core";
import packageJson from "../../../package.json";
import styled from "styled-components";
import { BRIGHT_BACKGROUND_COLOR, DARK_BACKGROUND_COLOR } from "../../constants/styles";
import { getBlur } from "../../utils/getBlur";

const StatusBar = () => {
  const { colorScheme } = useMantineColorScheme();

  const Style = styled.div`
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colorScheme === "dark" ? DARK_BACKGROUND_COLOR : BRIGHT_BACKGROUND_COLOR};
    color: white;
    font-size: 12px;
    font-weight: bold;
    font-family: "Sofia Sans", sans-serif;
    position: fixed;
    bottom: 0px;
    width: 100vw;
    z-index: 1000;
    backdrop-filter: ${getBlur(10)}
  `;

  return (
    <Style>
      <StatusIndicator isActive />
      <Text
        size="xs"
        sx={(theme) => ({
          margin: "0px 20px 0px 10px",
          minWidth: "40px",
          color:
            colorScheme === "dark"
              ? theme.colors.gray[1]
              : theme.colors.gray[8],
        })}
      >
        MBTA Spy {packageJson.version}
      </Text>
    </Style>
  );
};

interface IStatusIndicator {
  isActive: boolean;
}

const StatusIndicator = styled.div<IStatusIndicator>`
  height: 6px;
  width: 6px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  background-color: ${({ isActive }) => (isActive ? "#50d150" : "#f03535")};
  transition: background 1s ease-in-out;
`;

export default StatusBar;
