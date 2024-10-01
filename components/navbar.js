// components/Navbar.js
import { HStack, Link, Box } from "@chakra-ui/react";
import { useRouter } from 'next/router';

export default function Navbar({ navlinks }) {
  const router = useRouter();

  return (
    <Box bg="black" w="100%">
      <HStack spacing={4} p={4} >
        {navlinks.map(navlink => (
          <Link
            key={navlink.link}
            href={navlink.link}
            p={2}
            borderRadius="md"
            _hover={{ bg: "gray.700" }}
            bg={router.pathname === navlink.link ? "white" : "transparent"}
            color={router.pathname === navlink.link ? "black" : "white"}
          >
            {navlink.label}
          </Link>
        ))}
      </HStack>
    </Box>
  );
}
