export interface ApiResponse<T extends unknown | unknown[]> {
  code: string;
  message: string;
  data: T;
}

export namespace IPagination {
  export interface IOffset<T extends unknown[]> {
    list: T;

    meta: {
      page: number;
      size: number;
      totalElements: number;
      totalPages: number;
      hasNext: boolean;
      hasPrevious: boolean;
    };
  }

  export class OffsetQueryDto {
    page!: number;

    size!: number;
  }
}
