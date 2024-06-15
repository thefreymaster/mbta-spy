import { ActionIcon, Box, useMantineColorScheme } from "@mantine/core";
import React from "react";
import { IoChevronDown, IoChevronUp, IoClose } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { TransitTitle } from "../../common/TransitTitle";
import { isMobile } from "react-device-detect";

export const DrawerTitle = ({
  handleClickHeader,
  setFullHeight,
  fullHeight,
  onClose,
}: {
  fullHeight: boolean;
  handleClickHeader(): void;
  setFullHeight(v: boolean): void;
  onClose(): void;
}) => {
  const location: any = useLocation();
  const { colorScheme } = useMantineColorScheme();

  return (
    <Box
      display="flex"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        minWidth: isMobile ? "calc(100vw - 90px)" : "100%",
      }}
    >
      <Box
        display="flex"
        sx={{
          minWidth: isMobile ? "calc(100vw - 150px)" : "calc(100% - 36px)",
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
          minWidth="calc(100% - 36px)"
        />
      </Box>
      {isMobile && (
        <>
          <ActionIcon
            size="lg"
            variant="light"
            sx={(theme) => ({ margin: 10, color: theme.colors.gray[8] })}
            onClick={() => setFullHeight(!fullHeight)}
          >
            {fullHeight ? <IoChevronDown /> : <IoChevronUp />}
          </ActionIcon>
        </>
      )}
      <ActionIcon
        size="lg"
        variant="light"
        sx={(theme) => ({ margin: 10, color: colorScheme === 'dark' ? theme.colors.gray[4] : theme.colors.gray[8] })}
        onClick={() => onClose()}
      >
        <IoClose />
      </ActionIcon>
    </Box>
  );
};
