import { Box, Button, useMantineColorScheme } from "@mantine/core";
import React from "react";
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
        sx={{
          position: "fixed",
          bottom: "20px",
          left: "calc(50% - 110px)",
        }}
      >
        {/* @ts-ignore */}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.buymeacoffee.com/canvas23studios"
        >
          <Button
            variant={colorScheme === "dark" ? "default" : "white"}
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
          variant={colorScheme === "dark" ? "default" : "white"}
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
