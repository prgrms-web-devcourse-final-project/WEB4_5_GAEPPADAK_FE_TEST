// pages/signup.tsx
import type { NextPage } from "next";
import Head from "next/head";
import SignupForm from "@/components/SignupForm";

const Signup: NextPage = () => {
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
