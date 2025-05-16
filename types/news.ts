import { IPagination } from "./common";

export namespace INews {
  export interface ISummary {
    url: string;

    title: string;

    thumbnailUrl: string;

    publishedAt: string;

    platform: string;
  }

  export namespace ISource {
    export interface ISummary {
      id: number;

      url: string;

      thumbnailUrl: string;

      title: string;

      platform: "YOUTUBE" | "NAVER_NEWS";
    }

    export class GetMixedListQueryDto {
      keyword!: string;

      page: number = 1;

      size: number = 10;
    }
  }

  export class GetListQueryDto extends IPagination.OffsetQueryDto {}
}
