import React, { useState } from "react";
import { CardMedia, Box, IconButton } from "@mui/material";
import ShuffleOutlinedIcon from "@mui/icons-material/ShuffleOutlined";
import "../styles/PopularVideo.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/core";
import { getPopularVideos, getRandomVideo } from "../routes";
import { useQuery } from "@tanstack/react-query";
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

const PopularVideo: React.FC = () => {
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
    data: popular,
    isLoading: popularLoading,
    isError: popularError,
    error: popularErrormsg,
  } = useQuery<{ videos: Video[] }>({
    queryKey: ["popularVideos"],
    queryFn: async () => {
      const response = await getPopularVideos();
      if (!response) {
        throw new Error("Failed to fetch popular videos");
      }
      return { videos: response.videos };
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: random,
    isLoading: randomLoading,
    isError: randomError,
    error: randomErrormsg,
    refetch: refetchRandomVideo,
  } = useQuery<Video[]>({
    queryKey: ["randomVideo"],
    queryFn: getRandomVideo,
  });

  if (popularLoading || randomLoading) {
    return <Box>Loading...</Box>;
  }

  if (popularError || randomError) {
    if (popularError) {
      return <Box>Error: {popularErrormsg?.message}</Box>;
    }
    if (randomError) {
      return <Box>Error: {randomErrormsg?.message}</Box>;
    }
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
    <Box className="popular-video-container">
      <div className="label-video">
        <h1 className="heading-video">Popular Videos</h1>
        {random?.map((video) => (
          <IconButton
            className="randomize-video"
            sx={{
              color: "whitesmoke",
            }}
            onClick={() => {
              refetchRandomVideo();
              const bestQualityLink = findBestQualityLink(video.video_files);
              if (bestQualityLink) {
                handleOpenDialog(bestQualityLink);
              }
            
            }}
            key={video.id}
          >
            <ShuffleOutlinedIcon fontSize="medium" />
          </IconButton>
        ))}
      </div>

      <Splide options={splideOptions}>
        {popular?.videos.map((video) => (
          <SplideSlide key={video.id} sx={{ Margin: "10px" }}>
            <CardMedia
              component="img"
              className="popular-video-media"
              src={video.image}
              onClick={() => {
                const bestQualityLink = findBestQualityLink(video.video_files);
                if (bestQualityLink) {
                  handleOpenDialog(bestQualityLink);
                }
              }}
            />
          </SplideSlide>
        ))}
      </Splide>
      <MediaDialog
        open={openDialog}
        onClose={handleCloseDialog}
        mediaSrc={selectedMediaSrc || "https://videos.pexels.com/video-files/4990247/4990247-hd_1920_1080_30fps.mp4"}
        mediaType="video"
      />
    </Box>
  );
};

export default PopularVideo;
