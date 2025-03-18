/* eslint-disable react-refresh/only-export-components */
import axios from "axios";

interface PhotoSrc {
  original: string;
  large: string;
  large2x: string;
  medium: string;
  small: string;
  potrait: string;
  square: string;
  landscape: string;
  tiny: string;
}

interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  src: PhotoSrc;
}

interface CuratedPhotosResponse {
  page: number;
  per_page: number;
  next_page: string;
  photos: Photo[];
}

export const getCuratePhotos = async (): Promise<Photo[]> => {
  try {
    const resp = await axios.get<CuratedPhotosResponse>("/api/photo/curated", {
      params: {
        per_page: 80,
        page: 1,
      },
    });

    console.log("Curated Photo:", resp.data);

    // return only the photo array.
    return resp.data.photos;
  } catch (error) {
    console.error("Unable to get Curated Photos", error);
    return [];
  }
};

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

interface PopularVideosResponse {
  page: number;
  per_page: number;
  total_results: number;
  url: string;
  videos: Video[];
}

export const getPopularVideos =
  async (): Promise<PopularVideosResponse | null> => {
    try {
      const resp = await axios.get<PopularVideosResponse>(
        "/api/video/popular",
        {
          // Adjust your API endpoint
          params: {
            per_page: 80, // Adjust as needed
            page: 1, // Adjust as needed
          },
        }
      );

      console.log("Popular Videos:", resp.data);

      return resp.data;
    } catch (error) {
      console.error("Unable to get Popular Videos", error);
      return null;
    }
  };

export const getRandomPhoto = async () => {
  try {
    const resp = await axios.get<Photo>("/api/photo/random");

    console.log("Random Photo:", resp.data);

    // return only the photo array.
    console.log([resp.data]);
    return [resp.data];
  } catch (error) {
    console.error("Unable to get Random Photo", error);
    return [];
  }
};

export const getRandomVideo = async () => {
  try {
    const resp = await axios.get<Video>("/api/video/random");

    console.log("Random Video:", resp.data);

    console.log([resp.data]);
    return [resp.data];
  } catch (error) {
    console.error("Unable to get Random Video", error);
    return [];
  }
};

export const SearchPhotos = async (SrcText: string): Promise<Photo[]> => {
  try {
    const resp = await axios.get<CuratedPhotosResponse>("/api/photo/search", {
      params: {
        query: SrcText,
        per_page: 15,
        page: 1,
      },
    });

    console.log("Search Photo:", resp.data);

    // return only the photo array.
    return resp.data.photos;
  } catch (error) {
    console.error("Unable to get Curated Photos", error);
    return [];
  }
};


export const SearchVideos =
  async (SrcTxt: string): Promise<PopularVideosResponse | null> => {
    try {
      const resp = await axios.get<PopularVideosResponse>(
        "/api/video/search",
        {
          // Adjust your API endpoint
          params: {
            query: SrcTxt,
            per_page: 15, // Adjust as needed
            page: 1, // Adjust as needed
          },
        }
      );

      console.log("Popular Videos:", resp.data);

      return resp.data;
    } catch (error) {
      console.error("Unable to get Popular Videos", error);
      return null;
    }
  };