{/* 
Name: Brody Dentinger
Date: Oct. 03/2024   
*/}
import { HStack, Link, Box, Icon } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { SiLinkedin, SiGithub } from 'react-icons/si';

export default function Socials() {
  const router = useRouter();

  const socials = [
    { 
      href: "https://www.linkedin.com/in/brody-dentinger/", 
      label: "LinkedIn", 
      colorScheme: "linkedin", 
      icon: SiLinkedin 
    },
    { 
      href: "https://github.com/BrodyDentinger", 
      label: "GitHub", 
      colorScheme: "gray", 
      icon: SiGithub 
    }
  ];

  return (
    <Box bg="black" w="100%" display="flex" justifyContent="center" alignItems="center" p={4}>
      <HStack spacing={4} justifyContent="center" alignItems="center">
        {socials.map(({ href, label, colorScheme, icon }) => (
          <Link
            key={href}
            href={href}
            isExternal
            display="flex"
            alignItems="center"
            colorScheme={colorScheme}
            p={2}
            borderRadius="md"
            _hover={{ bg: `${colorScheme}.700` }}  // Use color scheme for hover
            bg={router.pathname === href ? `${colorScheme}.500` : "transparent"}
            color={router.pathname === href ? "white" : `${colorScheme}.200`}
          >
            <Icon as={icon} mr={2} />  {/* Add the icon */}
            {label}
          </Link>
        ))}
      </HStack>
    </Box>
  );
}
