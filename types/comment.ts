export interface IComment {
  id: number;
  memberId: number;
  body: string;
  likeCount: number;
  createdAt: string;
}

export namespace IComment {
  export interface ILike {
    id: number;
    memberId: number;
    body: string;
    likeCount: number;
    createdAt: string;
  }

  export class CreateDto {
    body!: string;
  }

  export class UpdateDto {
    body!: string;
  }
}
