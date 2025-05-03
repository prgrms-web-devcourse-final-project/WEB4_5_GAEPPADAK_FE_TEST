import { IAuth } from "../../types";
import { axiosInstance } from "./axios.instance";

class AuthService {
  async signup(signupDto: IAuth.SignUpDto): Promise<IAuth.SignUpResponse> {
    const response = await axiosInstance.post("/auth/signup", signupDto);
    try {
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const authService = new AuthService();
