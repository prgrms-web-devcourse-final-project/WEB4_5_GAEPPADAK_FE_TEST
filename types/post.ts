export interface IPost extends IPost.IBase {}

export namespace IPost {
  export interface IBase {
    postId: number;
    keyword: string;
    title: string;
    summary: string;
    thumbnailUrl: string;
  }

  export interface ISummary extends IBase {}

  export class GetListQueryDto {
    keyword!: string;

    page: number = 1;

    size: number = 10;

    sort: "createdAt" | "viewCount" = "createdAt";
  }
}
