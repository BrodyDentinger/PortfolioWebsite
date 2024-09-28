import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Navbar from '../components/navbar';
import { Box, TableContainer, Table, Tr, Td, Tbody, Link, Heading } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';

export default function AboutMe({ sections }) {
  const router = useRouter();

  // Enable smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>About Me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      
      <Box className={styles.grid}>
        <main>
          <h1 className={styles.title}>About <span id="name">Me</span></h1>

          {/* Centered Table of Contents with white border and rounded corners */}
          <TableContainer 
            mx="auto"
            border="1px solid white"
            borderRadius="lg"
            p={4}
            w="fit-content"
          >
            <Table variant="simple" size="sm" border="none">
              <Tbody>
                <Tr border="none">
                  <Td border="none" padding={0}>
                    {sections.map(section => (
                      <Link
                        key={section.id}
                        href={`#${section.id}`}
                        mr={4}
                        p={2}
                        borderRadius="md"
                        _hover={{ bg: "gray.700", color: "white" }}  // Hover effect
                        bg={router.asPath === `#${section.id}` ? "white" : "transparent"}
                        color={router.asPath === `#${section.id}` ? "black" : "white"}
                      >
                        {section.heading}
                      </Link>
                    ))}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>

          {/* Sections with padding */}
          {sections.map(section => (
            <section key={section.id} id={section.id}>
              <Box p={4}>
                <Heading as="h2" size="lg">{section.heading}</Heading>
                <p>{section.content}</p>
              </Box>
            </section>
          ))}
        </main>
      </Box>

      {/* Global styles for smoother scrolling */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        #name {
          color: #0070f3; /* Blue color from card hover */
        }
      `}</style>
    </div>
  );
}

// Fetch the JSON data at build time
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'about.json');
  const jsonData = fs.readFileSync(filePath);
  const sections = JSON.parse(jsonData);

  return {
    props: {
      sections,
    },
  };
}
