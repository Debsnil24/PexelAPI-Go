import "../styles/Navbar.css";
import "./Navbar-Component/MUISwitch";
import "./Navbar-Component/SearchBar";
import MaterialUISwitch from "./Navbar-Component/MUISwitch";
import SearchBar from "./Navbar-Component/SearchBar";
import { Link } from "@mui/material";
import React from "react";

type NavbarProps = {
  onSearchClick: (value: boolean, srcTxt: string) => void;
};

const Navbar : React.FC<NavbarProps> = ({onSearchClick}) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand-container">
          <Link href="/" underline="none">
            <img src="Logo.svg" alt="Logo" className="navbar-logo" />
          </Link>
        </div>
        <div className="navbar-switch-container">
          <div className="searchbar">
            <SearchBar onSearchClick={onSearchClick}/>
          </div>
          <div className="switch">
            <MaterialUISwitch />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
