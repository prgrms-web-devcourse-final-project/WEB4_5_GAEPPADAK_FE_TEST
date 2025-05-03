import axios from "axios";
import { ApiResponse, IVideo } from "../../types";

class VideoService {
  async getTop10Summary() {
    try {
      const response =
        await axios.get<ApiResponse<IVideo.ISummary[]>>(`api/v1/videos/top`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const videoService = new VideoService();
