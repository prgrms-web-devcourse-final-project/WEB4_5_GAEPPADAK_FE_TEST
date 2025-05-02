export namespace IAuth {
  export class SignUpDto {
    email!: string;
    passwordHash!: string;
    nickname!: string;
    birthDate!: string;
  }

  export interface SignUpResponse {
    code: string;
    message: string;
    data: {
      email: string; // "test@test.com"
      nickname: string; // "테스트쟁이"
      birthDate: string; // "2001-02-21"
      role: string; // "USER"
    };
  }
}
