// @ts-ignore
import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";

import Router from "./routes";
import AppHeader from "./components/AppHeader";

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
              <AppHeader />
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
