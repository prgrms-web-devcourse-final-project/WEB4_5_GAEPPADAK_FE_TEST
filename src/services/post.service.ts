import axios from "axios";
import { ApiResponse, IPost } from "../../types";

class PostService {
  async getTop10Summary() {
    try {
      const response =
        await axios.get<ApiResponse<IPost.ISummary[]>>(`api/v1/posts/top`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const postService = new PostService();
