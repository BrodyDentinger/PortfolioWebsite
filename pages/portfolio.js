import projects from '../data/projects.json'
import Navbar from '../components/navbar';
import styles from '../styles/Home.module.css';
import { Box, Container, Card, SimpleGrid, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, Link } from '@chakra-ui/react'

export default function Home() {
  return (
    <Box className={styles.container}>
      <Navbar />
      <Container maxW="container.md" py={8}>
        <SimpleGrid 
          columns={{ base: 2, md: 2, lg: 2 }} 
          spacing={0}  
          rowGap={8}
          columnGap={8}
          justifyItems="center"
        >
          {projects.map((project) => (
            <a href={`/${project.id}`}>
            <Card 
              key={project.id} 
              className={styles.portfoliocard}
              maxW="sm" 
              w="100%" 
              bg="black" 
              color="white"
              borderColor="white" 
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
  )
}