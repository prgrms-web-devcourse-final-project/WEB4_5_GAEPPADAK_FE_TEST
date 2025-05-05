import { ApiResponse, IVideo, IPagination } from "../../types";
import { axiosInstance } from "./axios.instance";

class VideoService {
  async getTop10Summary() {
    try {
      const response =
        await axiosInstance.get<
          ApiResponse<IPagination.IOffset<IVideo.ISummary[]>>
        >(`api/v1/videos/top`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getSourceVideos(postId: number) {
    try {
      const response = await axiosInstance.get<
        ApiResponse<IVideo.ISource.ISummary[]>
      >(`/api/v1/posts/${postId}/videos`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const videoService = new VideoService();
