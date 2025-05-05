export namespace IVideo {
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
    }
  }
}
