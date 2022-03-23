// @ts-ignore
import React from "react";
import "./App.css";
import { LiveMap } from "./components/LiveMap";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppShell, Header, Navbar } from "@mantine/core";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell
        sx={{ padding: "0px !important" }}
        header={
          <Header
            style={{
              position: "fixed",
              top: 0,
              backdropFilter: "blur(4px)",
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
            }}
            height={60}
            p="xs"
            pl="lg"
          >
            MBTA Tracker
          </Header>
        }
      >
        <LiveMap />
      </AppShell>
    </QueryClientProvider>
  );
};

export default App;
