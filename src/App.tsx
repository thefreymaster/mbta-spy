// @ts-ignore
import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  Header,
  MantineProvider,
  Space,
} from "@mantine/core";

import Router from "./routes";
import { TransitTitle } from "./common/TransitTitle";

const queryClient = new QueryClient();

const App = () => {
  const [colorScheme, setColorScheme] = React.useState<any>(
    localStorage.getItem("colorScheme") ?? "light"
  );
  const toggleColorScheme = (value: ColorScheme) => {
    localStorage.setItem("colorScheme", value);
    return setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme: "dark" }}
        withGlobalStyles
        withNormalizeCSS
      >
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
                  borderBottom: "0px",
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
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
