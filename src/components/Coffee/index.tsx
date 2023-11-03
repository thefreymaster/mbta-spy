import { Box, Button, useMantineColorScheme } from "@mantine/core";
import React from "react";
import { isMobile } from "react-device-detect";
import { BiCoffeeTogo } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

const Coffee = () => {
  const { colorScheme } = useMantineColorScheme();

  const [show, setShow] = React.useState(
    localStorage.getItem("show-donation") ? false : true
  );

  const handleShow = () => {
    localStorage.setItem("show-donation", "false");
    setShow(false);
  };

  if (show) {
    return (
      <Box
        sx={(theme) => ({
          position: "fixed",
          bottom: isMobile ? "80px" : "20px",
          left: "calc(50% - 110px)",
          boxShadow: theme.shadows.lg,
          borderRadius: "100px",
        })}
      >
        {/* @ts-ignore */}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.buymeacoffee.com/canvas23studios"
        >
          <Button
            variant={colorScheme === "dark" ? "white" : "default"}
            color="gray"
            leftIcon={<BiCoffeeTogo />}
            sx={{ borderRadius: "100px 0px 0px 100px" }}
          >
            Buy Me A Coffee
          </Button>
        </a>
        <Button
          onClick={handleShow}
          color="gray"
          variant={colorScheme === "dark" ? "white" : "default"}
          sx={{ borderRadius: "0px 100px 100px 0px" }}
          aria-label="Donate"
        >
          <IoMdClose />
        </Button>
      </Box>
    );
  }
  return null;
};

export default Coffee;
