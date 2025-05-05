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
}
