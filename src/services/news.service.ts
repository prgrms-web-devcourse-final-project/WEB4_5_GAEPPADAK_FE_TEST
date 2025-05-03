import axios from "axios";
import { ApiResponse, INews } from "../../types";

class NewsService {
  async getTop10Summary() {
    try {
      const response =
        await axios.get<ApiResponse<INews.ISummary[]>>(`api/v1/news/top`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const newsService = new NewsService();
