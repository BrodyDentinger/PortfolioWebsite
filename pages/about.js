{/* 
Name: Brody Dentinger
Date: Oct. 03/2024   
*/}
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Navbar from '../components/navbar';
import { Box, TableContainer, Table, Tr, Td, Tbody, Link, Heading, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';

export default function AboutMe({ sections, navlinks }) {
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

      <Navbar navlinks={navlinks}></Navbar>
      
      <Box className={styles.grid} maxW="container.lg">
        <main>
          <h1 className={styles.title}>About <span id="name">Me</span></h1>

          <Box display="flex" justifyContent="center" w="100%" py={4}>
            <Flex wrap="wrap" justify="center" borderWidth="1px" borderColor="white" borderRadius="lg" display="inline-flex">
              {sections.map((section) => (
                <Link
                  key={section.id}
                  href={`#${section.id}`}
                  m={1}  // Match the margin used in the portfolio page for tags
                  cursor="pointer"
                  p={2}
                  borderRadius="md"
                  _hover={{ bg: "gray.700", color: "white" }}
                  bg={router.asPath === `#${section.id}` ? "white" : "black"}  
                  color={router.asPath === `#${section.id}` ? "black" : "white"}  
                >
                  {section.heading}
                </Link>
              ))}
            </Flex>
          </Box>

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
          main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
       
      `}</style>
    </div>
  );
}

// Fetch the JSON data at build time
export async function getStaticProps() {
  const sectionsFilePath = path.join(process.cwd(), 'data', 'about.json');
  const sectionsJsonData = fs.readFileSync(sectionsFilePath);
  const sections = JSON.parse(sectionsJsonData);

  const navlinksFilePath = path.join(process.cwd(), 'data', 'navlinks.json');
  const navlinksJsonData = fs.readFileSync(navlinksFilePath, 'utf-8');
  const navlinks = JSON.parse(navlinksJsonData);

  return {
    props: {
      sections,
      navlinks, 
    },
  };
}
