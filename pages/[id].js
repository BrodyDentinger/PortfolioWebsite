import { useRouter } from 'next/router'
import projects from '../data/projects.json'
import Carousel from '../components/carousel'
import Navbar from '../components/navbar'
import { Flex, Box, Heading, Text, Image, UnorderedList, ListItem } from '@chakra-ui/react'

// Main component for project page will take the prop project, and for each entry in that json file, 
// will return a templated presentation of the content within each project entry
export default function Project({ project }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Navbar />
      <Flex
        direction={{ base: 'column', md: 'row' }}  // Stack vertically on mobile, horizontally on larger screens
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        padding={8}
        bg="black"  // Set background color to black
        color="white"  // Set text color to white
      >
        {/* Left Side: Carousel */}
        <Box
          flex="1"
          width={{ base: '100%', md: '50%' }}  // Take full width on mobile, 50% on larger screens
          mb={{ base: 8, md: 0 }}  // Add margin bottom on mobile
          pr={{ md: 8 }}  // Add padding to the right on larger screens
        >
          <Carousel images={project.imageUrl}/>
        </Box>

        {/* Right Side: Content */}
        <Flex
          direction="column"
          flex="1"
          alignItems={{ base: 'center', md: 'flex-start' }}  // Center text on mobile, align left on larger screens
          textAlign={{ base: 'center', md: 'left' }}  // Center text on mobile, align left on larger screens
          width={{ base: '100%', md: '50%' }}
        >
          <Heading as="h1" size="xl" mb={6}>
            {project.title}
          </Heading>

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
    </>
  )
}

/*
Important Note about Next:
Whenever next encounters a dynamic route (like [id].js), it automatically runs the getStaticPaths() method defined within the corresponding file.
And then, for each path returned by GetStaticPaths(), it will automatically run the getStaticProps() method defined within the corresponding file.
*/

// Static creation of pages at build-time, each project will have it's url be mapped to the project's id
// Returns a list of all possible paths (URLs) for the dynamic routes.
export async function getStaticPaths() {
  const paths = projects.map((project) => ({
    params: { id: project.id },
  }))

  return { paths, fallback: false }
}

/* 
This function is called for each item returned from getStaticPaths(). 
It fetches the data for each pre-rendered page/project at build time.
Returns an object with a props key, which will be passed to the Project component. 
*/
export async function getStaticProps({ params }) {
  const project = projects.find((p) => p.id === params.id)

  return { props: { project } }
}