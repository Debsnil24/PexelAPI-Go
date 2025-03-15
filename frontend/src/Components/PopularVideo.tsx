import React from "react";
import {CardMedia, Box } from "@mui/material";
import "../styles/PopularVideo.css"; // Import the CSS
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/core";

interface VideoCarouselProps {
  videoUrls: string[];
}

const PopularVideo: React.FC<VideoCarouselProps> = ({ videoUrls }) => {
  const splideOptions = {
    type: "loop", // Loop back to the beginning when reaching the end
    perPage: 5, // Number of items visible per page
    perMove: 1, // Move one item at a time
    rewind: true, // Rewind to start when the end is reached
    pagination: false, // Enable pagination dots
  };

  return (
    <Box className="popular-video-container">
      <Splide options={splideOptions}>
        {videoUrls.map((url) => (
          <SplideSlide sx={{ Margin: "10px" }}>
            <CardMedia
              component="video"
              className="popular-video-media"
              src={url}
            />
          </SplideSlide>
        ))}
      </Splide>
    </Box>
  );
};

export default PopularVideo;
