import { ApiResponse, INews } from "../../types";
import { axiosInstance } from "./axios.instance";

class NewsService {
  async getTop10Summary() {
    try {
      const response =
        await axiosInstance.get<ApiResponse<INews.ISummary[]>>(
          `api/v1/news/top`
        );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const newsService = new NewsService();
