import { ApiResponse, IKeyword } from "../../types";
import { axiosInstance } from "./axios.instance";

class KeywordService {
  async getTop10Summary() {
    try {
      const response =
        await axiosInstance.get<ApiResponse<IKeyword.ISummary[]>>(
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
