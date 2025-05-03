import { IAuth } from "../../types";
import { axiosInstance } from "./axios.instance";

class AuthService {
  async signup(signupDto: IAuth.SignUpDto): Promise<IAuth.SignUpResponse> {
    const response = await axiosInstance.post<IAuth.SignUpResponse>(
      "/auth/signup",
      signupDto
    );
    try {
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async signin(signinDto: IAuth.SignInDto): Promise<IAuth.SignInResponse> {
    const response = await axiosInstance.post<IAuth.SignInResponse>(
      "/auth/signin",
      signinDto
    );
    try {
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async refreshToken(): Promise<void> {
    try {
      await axiosInstance.post<void>("/auth/refresh");
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const authService = new AuthService();
