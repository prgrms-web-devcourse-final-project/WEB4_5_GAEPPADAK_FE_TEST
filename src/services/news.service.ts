import { ApiResponse, INews, IPagination } from "../../types";
import { axiosInstance } from "./axios.instance";

class NewsService {
  async getTop10Summary() {
    try {
      const response =
        await axiosInstance.get<
          ApiResponse<IPagination.IOffset<INews.ISummary[]>>
        >(`api/v1/news/top`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getSourceNews(postId: number) {
    try {
      const response = await axiosInstance.get<
        ApiResponse<INews.ISource.ISummary[]>
      >(`/api/v1/posts/${postId}/news`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const newsService = new NewsService();
