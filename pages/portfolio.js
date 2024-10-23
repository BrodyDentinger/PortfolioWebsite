{/* 
Name: Brody Dentinger
Date: Oct. 03/2024   
*/}
import React, { useState } from 'react';
import Navbar from '../components/navbar';
import styles from '../styles/Home.module.css';
import { Box, Container, Card, SimpleGrid, CardBody, Image, Stack, Heading, Text, Flex, Tag } from '@chakra-ui/react';
import fs from 'fs';
import path from 'path';

export default function Home({ projects, navlinks }) {

  // Set the current state to projects and tie it to setFilteredProjects. This will be called when a filter button is clicked to refresh the displayed projects
  // based on the technology used. By default, all projects are shown.
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedTech, setSelectedTech] = useState(null);

  // Extract unique technologies
  const allTechnologies = Array.from(
    new Set(projects.flatMap(project => project.technologies))
  );

  // Filter projects based on selected technology
  // This is done by passing in the key of the clicked tech Tag. If the selected tech Tag is new, filter the projects based on the tech. 
  // Refresh the state.
  const filterProjects = (tech) => {
    if (tech === selectedTech) {
      setSelectedTech(null);
      setFilteredProjects(projects);
    } else {
      setSelectedTech(tech);
      setFilteredProjects(projects.filter(project => 
        project.technologies.includes(tech)
      ));
    }
  };

  return (
    <Box className={styles.container}>
      <Navbar navlinks={navlinks}></Navbar>
      <Container maxW="container.lg" py={8}>
        <Box borderWidth="1px" borderColor="white" borderRadius="lg" p={4} mb={6}>
          <Flex wrap="wrap" justify="center">
            {allTechnologies.map((tech) => (
              <Tag
                key={tech}
                m={1}
                cursor="pointer"
                bg={selectedTech === tech ? "#0070f3" : "black"}
                color="white"
                onClick={() => filterProjects(tech)}
                _hover={{
                  opacity: 0.8
                }}
              >
                {tech}
              </Tag>
            ))}
          </Flex>
        </Box>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={0}
          rowGap={8}
          columnGap={8}
          justifyItems="center"
        >
          {/* Create a card for each project prop. */}
          {filteredProjects.map((project) => (
            <a href={`/${project.id}`} key={project.id}>
              <Card
                className={styles.portfoliocard}
                maxW="sm"
                w="100%"
                bg="#2a2c3c"
                color="white"
                borderColor="black"
                borderWidth="1px"
                borderStyle="solid"
              >
                <CardBody>
                  <Image
                    src={project.imageUrl[0]}
                    alt={project.briefdescription}
                    borderRadius='lg'
                  />
                  <Stack mt='4' spacing='1'>
                    <Heading size='md'>{project.title}</Heading>
                    <Text>{project.briefdescription}</Text>
                  </Stack>
                </CardBody>
              </Card>
            </a>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

// Get projects and navlinks statically from our JSON files.
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'projects.json');
  const jsonData = fs.readFileSync(filePath);
  const projects = JSON.parse(jsonData);

  const navlinksFilePath = path.join(process.cwd(), 'data', 'navlinks.json');
  const navlinksJsonData = fs.readFileSync(navlinksFilePath, 'utf-8');
  const navlinks = JSON.parse(navlinksJsonData);

  return {
    props: {
      projects,
      navlinks
    },
  };
}