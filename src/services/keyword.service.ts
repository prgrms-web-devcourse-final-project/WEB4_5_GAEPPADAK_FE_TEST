import axios from "axios";
import { ApiResponse, IKeyword } from "../../types";

class KeywordService {
  async getTop10Summary() {
    const response =
      await axios.get<ApiResponse<IKeyword.ISummary[]>>(`api/v1/keywords/top`);
    return response.data;
  }
}

export const keywordService = new KeywordService();
