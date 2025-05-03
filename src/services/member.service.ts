import { IMember } from "../../types";
import { axiosInstance } from "./axios.instance";

class MemberService {
  async getMe(): Promise<IMember.Me> {
    const response = await axiosInstance.get<IMember.Me>("api/v1/members/me");
    return response.data;
  }
}

export const memberService = new MemberService();
