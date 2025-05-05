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
      <Image
        src={news.thumbnailUrl || "/placeholder.jpg"}
        alt={news.title}
        fill
        className="object-cover"
      />
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
