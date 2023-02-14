import { ActionIcon, Box } from "@mantine/core";
import React from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { TransitTitle } from "../../common/TransitTitle";
import { isMobile } from "react-device-detect";

export const DrawerTitle = ({
  handleClickHeader,
  setFullHeight,
  fullHeight,
}: {
  fullHeight: boolean;
  handleClickHeader(): void;
  setFullHeight(v: boolean): void;
}) => {
  const location: any = useLocation();

  return (
    <Box
      display="flex"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        minWidth: isMobile ? "calc(100vw - 90px)" : "auto",
      }}
    >
      <Box
        display="flex"
        sx={{
          minWidth: isMobile ? "calc(100vw - 150px)" : "auto",
        }}
      >
        <TransitTitle
          color={location?.state?.route?.attributes?.color}
          label={location?.state?.vehicle?.attributes?.label}
          type={location?.state?.route?.attributes?.type}
          description={
            location?.state?.route?.attributes?.short_name === ""
              ? location?.state?.route?.attributes?.long_name
              : location?.state?.route?.attributes?.short_name
          }
          onClick={handleClickHeader}
          minWidth="85%"
        />
      </Box>
      {isMobile && (
        <>
          <Box sx={{ flex: 1 }} />
          <ActionIcon
            size="lg"
            variant="filled"
            sx={{ margin: 10 }}
            onClick={() => setFullHeight(!fullHeight)}
          >
            {fullHeight ? <IoChevronDown /> : <IoChevronUp />}
          </ActionIcon>
        </>
      )}
    </Box>
  );
};
