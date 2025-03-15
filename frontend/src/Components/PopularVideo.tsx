import React, { useState } from "react";
import { CardMedia, Box, IconButton } from "@mui/material";
import ShuffleOutlinedIcon from "@mui/icons-material/ShuffleOutlined";
import "../styles/PopularVideo.css"; // Import the CSS
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/core";
import RandomMedia from "./RandomMedia";
import { getPopularVideos } from "../routes"; // Adjust the import path
import { useQuery } from "@tanstack/react-query";


interface VideoFile {
  id: number;
  quality: string;
  file_type: string;
  width: number;
  height: number;
  link: string;
}

interface VideoPicture {
  id: number;
  picture: string;
  nr: number;
}

interface Video {
  id: number;
  width: number;
  height: number;
  url: string;
  image: string;
  full_res: string | null;
  duration: number;
  video_files: VideoFile[];
  video_pictures: VideoPicture[];
}


const PopularVideo: React.FC = () => {
  const splideOptions = {
    type: "loop", // Loop back to the beginning when reaching the end
    perPage: 5, // Number of items visible per page
    perMove: 1, // Move one item at a time
    rewind: true, // Rewind to start when the end is reached
    pagination: false, // Enable pagination dots
  };
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const { data, isLoading, isError, error } = useQuery<{ videos: Video[] }>({
    queryKey: ["popularVideos"],
    queryFn: async () => {
      const response = await getPopularVideos();
      if (!response) {
        throw new Error('Failed to fetch popular videos');
      }
      return { videos: response.videos };
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (isError) {
    return <Box>Error: {error?.message}</Box>;
  }

  return (
    <Box className="popular-video-container">
      <div className="label-video">
        <h1 className="heading-video">Popular Videos</h1>
        <IconButton
          className="randomize-video"
          sx={{
            color: "whitesmoke",
          }}
          onClick={handleOpenDialog}
        >
          <ShuffleOutlinedIcon fontSize="medium" />
        </IconButton>
      </div>
      <Splide options={splideOptions}>
        {data?.videos.map((video) => (
          <SplideSlide key={video.id} sx={{ Margin: "10px" }}>
            <CardMedia
              component="img"
              className="popular-video-media"
              src={video.image}
            />
          </SplideSlide>
        ))}
      </Splide>
      <RandomMedia open={openDialog} onClose={handleCloseDialog} />
    </Box>
  );
};

export default PopularVideo;
