import { AxiosResponse } from "axios";
import { ApiResponse, IPagination, IPost } from "../../types";
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

  async getDetail(postId: number) {
    try {
      const response = await axiosInstance.get<ApiResponse<IPost>>(
        `api/v1/posts/${postId}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getList(query: IPost.GetListQueryDto) {
    try {
      const response = await axiosInstance.get<
        ApiResponse<IPagination.IOffset<IPost.ISummary[]>>
      >(`/api/v1/posts/search`, {
        params: query,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const postService = new PostService();
