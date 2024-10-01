// components/Layout.js
import Navbar from "./navbar";
import { Box } from "@chakra-ui/react";

export default function Layout({ children, navlinks }) {
  return (
    <Box>
      <Navbar navlinks={navlinks} />
      <main>{children}</main>
    </Box>
  );
}
