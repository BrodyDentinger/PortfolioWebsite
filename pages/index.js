import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Navbar from '../components/navbar';
import Socials from '../components/socials';
import Layout from '../components/Layout';
import fs from 'fs';
import path from 'path';

export default function Home({ navlinks = []}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Brody Dentinger</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar navlinks={navlinks}></Navbar>
        
      <main>
        <h1 className={styles.title}>
          I'm <span id ="name">Brody Dentinger</span>, a Full-Stack Developer
        </h1>
        
        <div className={styles.grid}>
          <a href="./portfolio" className={styles.card}>
            <h3>My Work &rarr;</h3>
            <p>Browse my portfolio and see some my previous work.</p>
          </a>

          <a href="./about" className={styles.card}>
            <h3>About Me &rarr;</h3>
            <p>Learn more about my experiences, story, passions, and plans! </p>
          </a>

        </div>
      </main>
      <footer>
        <Socials/>
      </footer>

      <style jsx>{`
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
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
        
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
          #name {
            color: #0070f3; /* Blue color from card hover */
          }
      `}</style>
    </div>
  );
}


export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'navlinks.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const navlinks = JSON.parse(jsonData);

  return {
    props: {
      navlinks, // Pass navlinks to the Layout
    },
  };
}
