import {
  Box,
  Header as MTHeader,
  Space,
  useMantineColorScheme,
} from "@mantine/core";
import { TransitTitle } from "../../common/TransitTitle";
import { useHistory } from "react-router-dom";
import { AppTitle } from "../AppTitle";

const AppHeader = () => {
  const history = useHistory();
  const { colorScheme } = useMantineColorScheme();

  return (
    <MTHeader
      style={{
        position: "fixed",
        top: 0,
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        borderBottom: "0px",
      }}
      height={60}
      p="xs"
      pl="lg"
      onClick={() => history.push("/")}
    >
      <AppTitle />
      <Space sx={{ flexGrow: 1 }} />
    </MTHeader>
  );
};

export default AppHeader;
