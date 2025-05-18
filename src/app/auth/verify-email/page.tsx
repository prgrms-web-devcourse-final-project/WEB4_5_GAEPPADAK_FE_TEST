"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authService } from "@src/services/auth.service";
import { AxiosError } from "axios";

const EmailVerificationPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-sans">
      {/* 왼쪽 상단 이메일 입력 박스 */}
      <div className="absolute top-5 left-5 p-2 bg-white border border-gray-300 rounded shadow-md text-sm">
        이메일 인증 코드 입력
      </div>

      {/* 화살표 */}
      <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 w-24 h-0.5 bg-gray-400">
        <div className="absolute right-0 top-0 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-8 border-t-transparent border-b-transparent border-l-gray-400"></div>
      </div>

      {/* 인증 코드 입력 폼 */}
      <Suspense
        fallback={
          <div className="p-8 bg-white rounded-lg shadow-md w-80 text-center">
            로딩 중...
          </div>
        }
      >
        <EmailVerificationForm />
      </Suspense>
    </div>
  );
};

function EmailVerificationForm() {
  const [verificationCode, setVerificationCode] = useState<string>("");
  // 시간 포맷팅 (분:초)
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
  };
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [success, setSuccess] = useState<string>("");

  // URL 쿼리 파라미터에서 이메일 가져오기
  const email = searchParams.get("email") || "";

  useEffect(() => {
    if (timeLeft <= 0) {
      setError("인증 시간이 만료되었습니다. 다시 시도해주세요.");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (!email) {
      router.push("/signup");
    }
  }, [email, router]);

  const handleSubmit = async () => {
    if (!verificationCode) {
      setError("인증 코드를 입력해주세요.");
      return;
    }

    if (timeLeft <= 0) {
      setError("인증 시간이 만료되었습니다. 다시 시도해주세요.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await authService.checkEmail({
        email,
        authCode: verificationCode,
      });

      setSuccess("이메일 인증이 완료되었습니다.");

      // 성공 시 다음 페이지로 이동 (필요에 따라 변경)
      setTimeout(() => {
        router.push("/login"); // 또는 다음 단계로 이동
      }, 2000);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      } else {
        setError("인증 과정에서 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const verifyEmail = async () => {
      console.log(email);
      await authService.sendEmailAuth(email);
    };
    verifyEmail();
  }, []);

  return (
    <div className="p-8 bg-white rounded-lg shadow-md w-80 text-center border border-gray-200">
      <h2 className="text-lg font-bold mb-6 text-gray-800">인증 코드 입력</h2>

      <div className="mb-6">
        <label className="block text-left text-sm mb-1">인증 코드</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          placeholder="인증 코드를 입력하세요"
          maxLength={6}
        />
        <div className="text-red-500 text-xs text-left mt-1">
          남은 시간: {formatTime(timeLeft)}
        </div>
      </div>

      <button
        className={`w-full py-3 bg-blue-500 text-white rounded text-sm transition-colors ${
          isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-600"
        }`}
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "처리 중..." : "확인"}
      </button>

      {error && <div className="text-red-500 text-xs mt-3">{error}</div>}
      {success && <div className="text-green-500 text-xs mt-3">{success}</div>}
    </div>
  );
}

export default EmailVerificationPage;
