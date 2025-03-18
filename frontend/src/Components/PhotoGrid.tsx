import { Box, Card, CardMedia, Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { SearchPhotos } from "../routes";
import MediaDialog from "./MediaModal";
import { useState } from "react";

type PhotoGridProp = {
  searchValue: string;
};

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

const PhotoGrid: React.FC<PhotoGridProp> = ({ searchValue }) => {
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
    data: searchPhoto,
    isLoading: searchLoading,
    isError: searchError,
    error: searchErrorMsg,
  } = useQuery<Photo[]>({
    queryKey: ["searchPhotos", searchValue],
    queryFn: () => SearchPhotos(searchValue),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  if (searchLoading) {
    return <Box>Loading...</Box>;
  }

  if (searchError) {
    return <Box>Error: {searchErrorMsg?.message}</Box>;
  }

  return (
    <>
      <div style={{color:'whitesmoke'}}>
        <h2>{searchValue}</h2>
      </div>
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
          padding: 2,
        }}
      >
        {searchPhoto?.map((photo) => (
          <Box key={photo.id} sx={{ width: 300 }}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="200"
                image={photo.src.large}
                alt="Photo"
                sx={{
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": { opacity: 0.8 },
                }}
                onClick={() => handleOpenDialog(photo.src.large)}
              />
            </Card>
          </Box>
        ))}
        <MediaDialog
          open={openDialog}
          onClose={handleCloseDialog}
          mediaSrc={selectedMediaSrc || ""}
          mediaType="image"
        />
      </Container>
    </>
  );
};

export default PhotoGrid;
