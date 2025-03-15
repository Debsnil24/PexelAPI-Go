import React, { useState } from "react";
import { CardMedia, Box, IconButton } from "@mui/material";
import "../styles/CuratedPhoto.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/core";
import ShuffleOutlinedIcon from "@mui/icons-material/ShuffleOutlined";
import RandomMedia from "./RandomMedia";
import { useQuery } from "@tanstack/react-query";
import { getCuratePhotos } from "../routes";

interface PhotoSrc {
  original: string;
  large: string;
  large2x: string;
  medium: string;
  small: string;
  potrait: string;
  square: string;
  landscape: string;
  tiny: string;
}

interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  src: PhotoSrc;
}

const CuratedPhoto: React.FC = () => {
  const splideOptions = {
    type: "loop",
    perPage: 5,
    perMove: 1,
    rewind: true,
    pagination: false,
  };
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const { data, isLoading, isError, error } = useQuery<Photo[]>({ // Correct type use here
    queryKey: ["curatedPhotos"],
    queryFn: getCuratePhotos,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (isError) {
    return <Box>Error: {error?.message}</Box>; // added optional chaining here.
  }

  return (
    <Box className="curated-photo-container">
      <div className="label-photo">
        <h1 className="heading-photo">Curated Photos</h1>
        <IconButton
          className="randomize-photo"
          sx={{
            color: "whitesmoke",
          }}
          onClick={handleOpenDialog}
        >
          <ShuffleOutlinedIcon fontSize="medium" />
        </IconButton>
      </div>
      <Splide options={splideOptions}>
        {data?.map((photo) => (
          <SplideSlide key={photo.id} sx={{ Margin: "10px" }}>
            <CardMedia
              component="img"
              className="curated-photo-media"
              image={photo.src.large}
            />
          </SplideSlide>
        ))}
      </Splide>
      <RandomMedia open={openDialog} onClose={handleCloseDialog} />
    </Box>
  );
};

export default CuratedPhoto;