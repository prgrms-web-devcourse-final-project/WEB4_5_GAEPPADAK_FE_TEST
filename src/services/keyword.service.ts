import axios from "axios";
import { ApiResponse, IKeyword } from "../../types";

class KeywordService {
  async getTop10Summary() {
    try {
      const response =
        await axios.get<ApiResponse<IKeyword.ISummary[]>>(
          `api/v1/keywords/top`
        );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const keywordService = new KeywordService();
