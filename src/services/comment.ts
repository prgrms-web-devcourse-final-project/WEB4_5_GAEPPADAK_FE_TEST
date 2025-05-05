import { ApiResponse, IPagination } from "@/types";
import { axiosInstance } from "./axios.instance";
import { IComment } from "@/types/comment";

export class CommentService {
  async getComments(postId: number) {
    try {
      const response = await axiosInstance.get<
        ApiResponse<IPagination.IOffset<IComment[]>>
      >(`/api/v1/posts/${postId}/comments`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const commentService = new CommentService();
