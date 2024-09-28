import { HStack, Link, Box } from "@chakra-ui/react";
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  return (
    <Box bg="black" w="100%">
      <HStack spacing={4} p={4}>
        {[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
          { href: "/portfolio", label: "Portfolio" },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            p={2}
            borderRadius="md"
            _hover={{ bg: "gray.700" }}
            bg={router.pathname === href ? "white" : "transparent"}
            color={router.pathname === href ? "black" : "white"}
          >
            {label}
          </Link>
        ))}
      </HStack>
    </Box>
  );
}