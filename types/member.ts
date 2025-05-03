export namespace IMember {
  export interface Me {
    code: string;

    message: string;

    data: {
      nickname: string;

      email: string;

      birthDate: string;
    };
  }
}
