import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { SearchVideos } from "../routes";
import { Box, Card, CardMedia, Container } from "@mui/material";
import MediaDialog from "./MediaModal";


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

type VideoGridProp = {
  searchValue: string;
}
const VideoGrid: React.FC<VideoGridProp> = ({ searchValue }) => {
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
    data: searchVideo,
    isLoading: searchLoading,
    isError: searchError,
    error: searchErrormsg,
  } = useQuery<{ videos: Video[] }>({
    queryKey: ["searchVideo", searchValue],
    queryFn: async () => {
      const response = await SearchVideos(searchValue);
      if (!response) {
        throw new Error("Failed to fetch popular videos");
      }
      return { videos: response.videos };
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  if (searchLoading) {
    return <Box>Loading...</Box>;
  }

  if (searchError) {
      return <Box>Error: {searchErrormsg?.message}</Box>;
  }

  const findBestQualityLink = (videoFiles: VideoFile[]): string | null => {
    const checkQuality = (quality: string): string | null => {
      const file = videoFiles.find((file) => file.quality === quality);
      return file ? file.link : null;
    };

    const uhdLink = checkQuality("uhd");
    if (uhdLink) return uhdLink;

    const hdLink = checkQuality("hd");
    if (hdLink) return hdLink;

    const sdLink = checkQuality("sd");
    if (sdLink) return sdLink;

    return null;
  };

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
        {searchVideo?.videos.map((video) => (
          <Box key={video.id} sx={{ width: 300 }}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="200"
                image={video.image}
                alt="Photo"
                sx={{
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": { opacity: 0.8 },
                }}
                onClick={() => {
                  const bestQualityLink = findBestQualityLink(video.video_files);
                  if (bestQualityLink) {
                    handleOpenDialog(bestQualityLink);
                  }
                }}
              />
            </Card>
          </Box>
        ))}
        <MediaDialog
        open={openDialog}
        onClose={handleCloseDialog}
        mediaSrc={selectedMediaSrc || ""}
        mediaType="video"
      />
      </Container>
    </>
  )
}

export default VideoGrid