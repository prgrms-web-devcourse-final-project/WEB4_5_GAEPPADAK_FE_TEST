import { IMember } from "../../types";
import { axiosInstance } from "./axios.instance";

class MemberService {
  async getMe(): Promise<IMember.Me> {
    try {
      const response = await axiosInstance.get<IMember.Me>("api/v1/members/me");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const memberService = new MemberService();
