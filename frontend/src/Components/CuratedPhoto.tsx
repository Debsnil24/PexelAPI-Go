import React, { useState } from "react";
import { CardMedia, Box, IconButton } from "@mui/material";
import "../styles/CuratedPhoto.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/core";
import ShuffleOutlinedIcon from "@mui/icons-material/ShuffleOutlined";
import MediaDialog from "./MediaModal";
import { useQuery } from "@tanstack/react-query";
import { getCuratePhotos, getRandomPhoto } from "../routes";

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
  const [selectedMediaSrc, setSelectedMediaSrc] = useState<string | null>(null);

  const handleOpenDialog = (mediaSrc: string) => {
    setSelectedMediaSrc(mediaSrc);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMediaSrc(null);
  };

  const {
    data: curated,
    isLoading: curatedLoading,
    isError: curatedError,
    error: curatedErrorMsg,
  } = useQuery<Photo[]>({
    queryKey: ["curatedPhotos"],
    queryFn: getCuratePhotos,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: random,
    isLoading: randomLoading,
    isError: randomError,
    error: randomErrorMsg,
    refetch: refetchRandomPhoto,
  } = useQuery<Photo[]>({
    queryKey: ["RandomPhoto"],
    queryFn: getRandomPhoto,
  });

  if (curatedLoading || randomLoading) {
    return <Box>Loading...</Box>;
  }

  if (curatedError || randomError) {
    if (curatedError) {
      return <Box>Error: {curatedErrorMsg?.message}</Box>;
    }
    if (randomError) {
      return <Box>Error: {randomErrorMsg?.message}</Box>;
    }
  }

  return (
    <Box className="curated-photo-container">
      <div className="label-photo">
        <h1 className="heading-photo">Curated Photos</h1>
        {random?.map((photo) => (
          <IconButton
            className="randomize-photo"
            key={photo.id}
            sx={{
              color: "whitesmoke",
            }}
            onClick={() => {
              refetchRandomPhoto();
              handleOpenDialog(photo.src.large);
            }}
          >
            <ShuffleOutlinedIcon fontSize="medium" />
          </IconButton>
        ))}
      </div>

      <Splide options={splideOptions}>
        {curated?.map((photo) => (
          <SplideSlide key={photo.id} sx={{ Margin: "10px" }}>
            <CardMedia
              component="img"
              className="curated-photo-media"
              image={photo.src.large}
              onClick={() => handleOpenDialog(photo.src.large)}
            />
          </SplideSlide>
        ))}
      </Splide>
      <MediaDialog
        open={openDialog}
        onClose={handleCloseDialog}
        mediaSrc={selectedMediaSrc || ""}
        mediaType="image"
      />
    </Box>
  );
};

export default CuratedPhoto;
