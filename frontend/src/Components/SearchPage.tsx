import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import PhotoGrid from "./PhotoGrid"; // Ensure this component exists
import VideoGrid from "./VideoGrid"; // Ensure this component exists

type SearchPageProp = {
  searchValue: string;
};

const SearchPage: React.FC<SearchPageProp> = ({ searchValue }) => {
  const [view, setView] = useState("PhotoGrid");

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      bgcolor={"#002137"}
    >
      <Box display="flex" gap={2} paddingTop={"10px"}>
        <Button variant="outlined" onClick={() => setView("PhotoGrid")}>
          Photo
        </Button>
        <Button variant="outlined" onClick={() => setView("VideoGrid")}>
          Video
        </Button>
      </Box>
      {view === "PhotoGrid" && <PhotoGrid searchValue={searchValue} />}
      {view === "VideoGrid" && <VideoGrid searchValue={searchValue} />}
    </Box>
  );
};

export default SearchPage;
