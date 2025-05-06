import React from "react";
import Image from "next/image";
import Link from "next/link";
import { INews } from "../../../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; // 한국어 로케일 추가

// dayjs 설정
dayjs.extend(relativeTime);
dayjs.locale("ko"); // 한국어 로케일 사용

interface NewsCardProps {
  news: INews.ISummary;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  // 날짜 포맷팅 - 상대적 시간 표시 (예: "2시간 전")
  const formattedDate = news.publishedAt
    ? dayjs(news.publishedAt).fromNow()
    : "최근";

  return (
    <Link
      href={news.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="relative">
        {/* 이미지 영역 */}
        <div className="w-full h-40 bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
          {news.thumbnailUrl ? (
            <Image
              src={news.thumbnailUrl}
              alt={news.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400 dark:text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 8l-7 7-7-7"
                />
              </svg>
            </div>
          )}
        </div>

        {/* 콘텐츠 영역 */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {news.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {news.summary}
          </p>

          {/* 시간과 관련성 표시 */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-xs">{formattedDate}</span>
            </div>
            <div className="flex items-center text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
