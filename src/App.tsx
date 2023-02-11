// @ts-ignore
import React from "react";
import "./App.css";
import { LiveMap } from "./components/LiveMap";
import { QueryClient, QueryClientProvider } from "react-query";
import { ActionIcon, AppShell, Box, Header, Space, Title } from "@mantine/core";
import { IoTrain } from "react-icons/io5";
import { AiOutlineGithub } from "react-icons/ai";

import Router from "./routes";
import { TransitTitle } from "./common/TransitTitle";

const queryClient = new QueryClient();

const App = () => {
  const ref = React.useRef<HTMLAnchorElement>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell
        sx={{ padding: "0px !important", minHeight: "100%" }}
        header={
          <Header
            style={{
              position: "fixed",
              top: 0,
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
              borderBottom: "0px"
            }}
            height={60}
            p="xs"
            pl="lg"
          >
            <TransitTitle type={4} color="000000" label="MBTA Spy" />
            <Space sx={{ flexGrow: 1 }} />
          </Header>
        }
      >
        <Router />
      </AppShell>
    </QueryClientProvider>
  );
};

export default App;
