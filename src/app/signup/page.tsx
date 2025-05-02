// pages/signup.tsx
import type { NextPage } from "next";
import Head from "next/head";
import SignupForm from "@/components/SignupForm";

const Signup: NextPage = () => {
  const handleSignup = async (
    email: string,
    password: string,
    nickname: string,
    birthdate: string
  ) => {
    // 실제 회원가입 로직 구현
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, nickname, birthdate }),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Signup error:", error);
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
        <SignupForm />
      </main>
    </>
  );
};

export default Signup;
