// @ts-ignore
import React from "react";
import "./App.css";
import { LiveMap } from "./components/LiveMap";
import { QueryClient, QueryClientProvider } from "react-query";
import { ActionIcon, AppShell, Box, Header, Space, Title } from "@mantine/core";
import { IoTrain } from "react-icons/io5";
import { AiOutlineGithub } from "react-icons/ai";

import Router from "./routes";
import { TransitTitle } from "./components/LineDrawer";

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
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
            }}
            height={60}
            p="xs"
            pl="lg"
          >
            <TransitTitle type={4} color="000000" label="MBTA Spy" />
            {/* <IoTrain
              style={{
                border: "3px solid",
                borderRadius: "100px",
                padding: "5px",
              }}
            />
            <Space w="sm" />
            <Title order={6}>MBTA Spy</Title> */}
            <Space sx={{ flexGrow: 1 }} />
            <ActionIcon<"a">
              component="a"
              href="https://github.com/thefreymaster/mbta-spy"
              ref={ref}
              aria-label="github"
              size="lg"
              target="_blank"
            >
              <AiOutlineGithub size="24px" />
            </ActionIcon>
          </Header>
        }
      >
        <Router />
      </AppShell>
    </QueryClientProvider>
  );
};

export default App;
