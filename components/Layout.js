{/* 
Name: Brody Dentinger
Date: Oct. 03/2024   
*/}

// Currently unused - TODO: Create a layout with navbar and link bar in footer
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
