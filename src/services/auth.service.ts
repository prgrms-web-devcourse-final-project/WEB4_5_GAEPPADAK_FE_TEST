import { IAuth } from "../../types";
import { axiosInstance } from "./axios.instance";

class AuthService {
  async signup(signupDto: IAuth.SignUpDto): Promise<IAuth.SignUpResponse> {
    const response = await axiosInstance.post<IAuth.SignUpResponse>(
      "api/v1/auth/signup",
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
      "api/v1/auth/login",
      signinDto
    );
    try {
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async signout(): Promise<void> {
    try {
      await axiosInstance.post<void>("api/v1/auth/logout");
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async refreshToken(): Promise<void> {
    try {
      await axiosInstance.post<void>("api/v1/auth/refresh");
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const authService = new AuthService();
