import { ApiResponse, IPost } from "../../types";
import { axiosInstance } from "./axios.instance";

class PostService {
  async getTop10Summary() {
    try {
      const response =
        await axiosInstance.get<ApiResponse<IPost.ISummary[]>>(
          `api/v1/posts/top`
        );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const postService = new PostService();
