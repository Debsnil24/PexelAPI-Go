import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import "./searchBar.css";
import { TextField } from "@mui/material";
const SearchBar = () => {
  return (
    <>
      <div className="search-container">
        <TextField
          variant="outlined"
          placeholder="Search"
          className="search-input"
          size="small"
        />
        <IconButton
          sx={{ maxHeight: "39px", color: "white" }}
          type="button"
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </div>
    </>
  );
};

export default SearchBar;
