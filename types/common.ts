export interface ApiResponse<T extends unknown | unknown[]> {
  code: string;
  message: string;
  data: T;
}
