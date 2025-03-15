import React from "react";
import {CardMedia, Box } from "@mui/material";
import "../styles/CuratedPhoto.css"; // Import the CSS
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/core";

interface ImageCarouselProps {
  imageUrls: string[];
}

const CuratedPhoto: React.FC<ImageCarouselProps> = ({ imageUrls }) => {
  const splideOptions = {
    type: "loop", // Loop back to the beginning when reaching the end
    perPage: 3, // Number of items visible per page
    perMove: 1, // Move one item at a time
    rewind: true, // Rewind to start when the end is reached
    pagination: false, // Enable pagination dots
  };

  return (
    <Box className="curated-photo-container">
      <Splide options={splideOptions}>
        {imageUrls.map((url) => (
          <SplideSlide sx={{ Margin: '10px' }}>
                <CardMedia
                  component="img"
                  className="curated-photo-media"
                  image={url}
              />
          </SplideSlide>
        ))}
      </Splide>
    </Box>
  );
};

export default CuratedPhoto;
