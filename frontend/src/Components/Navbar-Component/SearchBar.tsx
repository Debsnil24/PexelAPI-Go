import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import "./searchBar.css";
import { TextField } from "@mui/material";
import React, { useState } from "react";

type SearchBarProps = {
  onSearchClick: (value: boolean, srctxt: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearchClick }) => {
  const [searchText, setSearchText] = useState("");
  const [isJittering, setIsJittering] = useState(false);

  const handleSearchClick = () => {
    if (searchText.trim() === "") {
      setIsJittering(true);
      onSearchClick(false, "");
      setTimeout(() => setIsJittering(false), 500); // Remove jitter after 500ms
      return;
    }
    onSearchClick(true, searchText);
  };

  return (
    <>
      <div className="search-container">
        <TextField
          variant="outlined"
          placeholder="Search"
          className="search-input"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <IconButton
          sx={{ maxHeight: "39px", color: "white", transform: isJittering ? "translateX(2px)" : "none" }}
          type="button"
          aria-label="search"
          onClick={() => { handleSearchClick(); setSearchText(""); }}
        >
          <SearchIcon />
        </IconButton>
      </div>
    </>
  );
};

export default SearchBar;
