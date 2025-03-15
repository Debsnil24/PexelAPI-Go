import Navbar from "./Components/Navbar";
import CuratedPhoto from "./Components/CuratedPhoto";
import PopularVideo from "./Components/PopularVideo";
import "./App.css"
import Footer from "./Components/Footer";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
      <div>
        <Navbar />
      </div>
      <div>
        <CuratedPhoto />
      </div>
      <div>
        <PopularVideo />
      </div>
      <div>
        <Footer />
        </div>
        </QueryClientProvider>
    </>
  );
};

export default App;
