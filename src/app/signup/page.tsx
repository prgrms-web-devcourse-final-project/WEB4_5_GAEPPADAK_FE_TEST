// pages/signup.tsx
import type { NextPage } from "next";
import Head from "next/head";
import SignupForm from "@/components/SignupForm";
import { authService } from "@/services/auth.service";

const Signup: NextPage = () => {
  const handleSignup = async (
    email: string,
    password: string,
    nickname: string,
    birthdate: string
  ) => {
    // 실제 회원가입 로직 구현

    try {
      await authService.signup({
        email,
        passwordHash: password,
        nickname,
        birthDate: birthdate,
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <Head>
        <title>회원가입 | 서비스 이름</title>
        <meta name="description" content="회원가입 페이지" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <SignupForm onSignup={handleSignup} />
      </main>
    </>
  );
};

export default Signup;
