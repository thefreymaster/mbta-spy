// @ts-ignore
import React from "react";
import "./App.css";
import { LiveMap } from "./components/LiveMap";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppShell, Box, Header, Space, Title } from "@mantine/core";
import { IoTrain } from "react-icons/io5";
import Router from "./routes";

const queryClient = new QueryClient();

const App = () => {
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
            <IoTrain
              style={{
                border: "3px solid",
                borderRadius: "100px",
                padding: "5px",
              }}
            />
            <Space w="sm" />
            <Title order={6}>MBTA Spy</Title>
          </Header>
        }
      >
        <Router />
      </AppShell>
    </QueryClientProvider>
  );
};

export default App;
