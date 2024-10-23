{/* 
Name: Brody Dentinger
Date: Oct. 03/2024   
*/}

// Wrap entire app in chakra. This will allow reference to tags/components after importing on each page.
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp