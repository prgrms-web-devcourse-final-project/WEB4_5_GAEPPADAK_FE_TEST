import React from "react";
import Image from "next/image";
import Link from "next/link";
import { INews } from "../../../types";

interface NewsCardProps {
  news: INews.ISummary;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news }) => (
  <Link
    href={news.url}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
  >
    <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden mb-4">
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
    <div className="p-4">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
        {news.title}
      </h3>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        AI로 짜여진 첫번째 키워드에 대한 내용...
      </div>
      <button className="mt-3 px-4 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
        첫번째 키워드
      </button>
    </div>
  </Link>
);

export default NewsCard;
