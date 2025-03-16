import React from "react";
import { Box, Card, CardMedia } from "@mui/material";
import "../styles/MediaPage.css"; // Import the CSS file

interface MediaPageProps {
  mediaSrc: string; // URL of the media (image or video)
  mediaType: "image" | "video"; // Type of media
}

const MediaPage: React.FC<MediaPageProps> = ({ mediaSrc, mediaType }) => {
  return (
    <Box className="media-container">
      <Card className="media-card">
        {mediaType === "image" ? (
          <CardMedia component="img" className="media-item" image={mediaSrc} />
        ) : (
          <CardMedia
            component="video"
            className="media-item"
            src={mediaSrc}
            controls
            muted
          />
        )}
      </Card>
    </Box>
  );
};

export default MediaPage;
