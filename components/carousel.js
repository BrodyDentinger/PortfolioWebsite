import React from 'react';
import { Box, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  dotsClass: 'slick-dots',
  appendDots: dots => (
    <ul style={{ bottom: '5px' }}>
      {dots}
    </ul>
  )
};

export default function Carousel({ images }) {
  const [slider, setSlider] = React.useState(null);
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '10px' });
  
  // Check the current breakpoint to conditionally show arrows
  const showArrows = useBreakpointValue({ base: false, md: true });

  return (
    <Box position={'relative'} width={'full'} overflow={'hidden'}>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      <style>{`
        .slick-dots li button:before {
          color: white;  /* inactive dots */
          opacity: 0.5;  /* Add this */
        }
        .slick-dots li.slick-active button:before {
          color: #0070f3;    /* active dot */
          opacity: 1;        /* Add this */
        }
      `}</style>

      {/* Conditionally render arrows based on screen size */}
      {showArrows && (
        <>
          <IconButton
            aria-label="left-arrow"
            colorScheme="messenger"
            borderRadius="full"
            position="absolute"
            left={side}
            top={top}
            transform={'translate(0%, -50%)'}
            zIndex={2}
            onClick={() => slider?.slickPrev()}
          >
            <BiLeftArrowAlt />
          </IconButton>

          <IconButton
            aria-label="right-arrow"
            colorScheme="messenger"
            borderRadius="full"
            position="absolute"
            right={side}
            top={top}
            transform={'translate(0%, -50%)'}
            zIndex={2}
            onClick={() => slider?.slickNext()}
          >
            <BiRightArrowAlt />
          </IconButton>
        </>
      )}

      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {images.map((url, index) => (
          <Box
            key={index}
            width="100%"
            aspectRatio="16 / 9" // Adjust this ratio based on your image's aspect ratio
            display="flex"
            justifyContent="center"
            alignItems="center"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="contain"
            backgroundImage={`url(${url})`}
          />
        ))}
      </Slider>
    </Box>
  );
}