"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { memberService } from "../services/member.service";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        await memberService.getMe();
        setIsLoading(false);
      } catch (error) {
        // 인증 실패 시 로그인 페이지로 리다이렉트
        console.log(error);
        router.push("/signin");
      }
    }

    // 현재 경로가 로그인/회원가입 페이지가 아닐 경우에만 인증 확인
    const pathname = window.location.pathname;
    if (pathname !== "/signin" && pathname !== "/signup") {
      checkAuth();
    } else {
      setIsLoading(false);
    }
  }, [router]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {isLoading ? <div>로딩 중...</div> : children}
      </body>
    </html>
  );
}
