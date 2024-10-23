{/* 
Name: Brody Dentinger
Date: Oct. 03/2024   
*/}
import { useRouter } from 'next/router'
import projects from '../data/projects.json'
import Carousel from '../components/carousel'
import Navbar from '../components/navbar'
import { Flex, Box, Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react'
import Head from 'next/head';
import fs from 'fs';
import path from 'path';

export default function Project({ project, navlinks }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  // Split the title into first word and the rest for colouring
  const words = project.title.split(' ')
  const firstWord = words[0]
  const restOfTitle = words.slice(1).join(' ')

  return (
    <>
      <Head>
        <title>{project.title}</title>
      </Head>
      <Navbar navlinks={navlinks}></Navbar>
      <Flex
        direction="column"
        minHeight="100vh"
        padding={8}
        bg="black"
        color="white"
      >
        {/* Title Row */}
        <Box width="100%" mb={0}>
          <Heading as="h1" size="2xl" textAlign="center" fontWeight="normal">
            <span style={{ color: '#0070f3' }}>{firstWord}</span>{' '}
            {restOfTitle}
          </Heading>
        </Box>

        {/* Content Row */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="center"
        >
          {/* Left Side: Carousel */}
          <Box
            flex="1"
            width={{ base: '100%', md: '50%' }}
            mb={{ base: 8, md: 0 }}
            pr={{ md: 8 }}
          >
            <Carousel images={project.imageUrl}/>
          </Box>

          {/* Right Side: Content */}
          <Flex
            direction="column"
            flex="1"
            alignItems={{ base: 'center', md: 'flex-start' }}
            textAlign={{ base: 'center', md: 'left' }}
            width={{ base: '100%', md: '50%' }}
          >
            <Text fontSize="lg" mb={6}>
              {project.description}
            </Text>

            <Heading as="h2" size="md" mb={4}>
              Technologies used
            </Heading>

            <UnorderedList spacing={3}>
              {project.technologies.map((tech, index) => (
                <ListItem key={index} fontSize="lg">
                  {tech}
                </ListItem>
              ))}
            </UnorderedList>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export async function getStaticPaths() {
  const paths = projects.map((project) => ({
    params: { id: project.id },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const project = projects.find((p) => p.id === params.id)

  const navlinksFilePath = path.join(process.cwd(), 'data', 'navlinks.json');
  const navlinksJsonData = fs.readFileSync(navlinksFilePath, 'utf-8');
  const navlinks = JSON.parse(navlinksJsonData);
  
  return { props: { project, navlinks } }
}