import Navbar from "./Components/Navbar";
import CuratedPhoto from "./Components/CuratedPhoto";
import PopularVideo from "./Components/PopularVideo";
import "./App.css"
const fixedImageUrls = [
  'https://images.pexels.com/photos/31100323/pexels-photo-31100323.jpeg',
  'https://images.pexels.com/photos/31100323/pexels-photo-31100323.jpeg',
  'https://images.pexels.com/photos/31100323/pexels-photo-31100323.jpeg',
  'https://images.pexels.com/photos/31100323/pexels-photo-31100323.jpeg',
  'https://images.pexels.com/photos/31100323/pexels-photo-31100323.jpeg',
  'https://images.pexels.com/photos/31100323/pexels-photo-31100323.jpeg',
  'https://images.pexels.com/photos/31100323/pexels-photo-31100323.jpeg',
  'https://images.pexels.com/photos/31100323/pexels-photo-31100323.jpeg',
  'https://images.pexels.com/photos/31100323/pexels-photo-31100323.jpeg',
  'https://images.pexels.com/photos/31100323/pexels-photo-31100323.jpeg',
  'https://images.pexels.com/photos/31100323/pexels-photo-31100323.jpeg',
  'https://images.pexels.com/photos/31100323/pexels-photo-31100323.jpeg',
  'https://images.pexels.com/photos/31100323/pexels-photo-31100323.jpeg',
  'https://images.pexels.com/photos/31100323/pexels-photo-31100323.jpeg',
];

const dummyVideoUrls = [
  'https://videos.pexels.com/video-files/5386411/5386411-uhd_1440_2732_25fps.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel-2010-480p.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel-2010-720p.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel-2010-1080p.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel-2010-480p.webm',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel-2010-720p.webm',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel-2010-1080p.webm',
];
const App = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <CuratedPhoto imageUrls={fixedImageUrls}/>
      </div>
      <div>
        <PopularVideo videoUrls={dummyVideoUrls}/>
      </div>
    </>
  );
};

export default App;
