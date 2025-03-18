import Navbar from "./Components/Navbar";
import CuratedPhoto from "./Components/CuratedPhoto";
import PopularVideo from "./Components/PopularVideo";
import "./App.css";
import Footer from "./Components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchPage from "./Components/SearchPage";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [SearchText, setSearchText] = useState("");
  const handleSearchClick = (value: boolean, srcTxt: string) => {
    setShowSearchPage(value);
    setSearchText(srcTxt)
  };
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div>
          <Navbar onSearchClick={handleSearchClick} />
        </div>
        {showSearchPage ? (
          <div>
            <SearchPage searchValue={ SearchText } />
          </div>
        ) : (
          <>
            <div>
              <CuratedPhoto />
            </div>
            <div>
              <PopularVideo />
            </div>
          </>
        )}
        <div>
          <Footer />
        </div>
      </QueryClientProvider>
    </>
  );
};

export default App;
