import React from "react";
import Link from "next/link";
import { IKeyword } from "../../../types";

interface KeywordListProps {
  keywords: IKeyword.ISummary[];
  title?: string;
  showMoreLink?: boolean;
  maxItems?: number;
}

export const KeywordList: React.FC<KeywordListProps> = ({
  keywords,
  title = "실시간 키워드",
  showMoreLink = true,
  maxItems = 10,
}) => {
  return (
    <div className="w-80 hidden lg:block">
      <div className="sticky top-24">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-between">
            {title}
            {showMoreLink && (
              <Link
                href="/keywords"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                더보기
              </Link>
            )}
          </h2>
          <div className="space-y-4">
            {keywords.slice(0, maxItems).map((keyword, index) => (
              <Link
                href={`/keywords/${keyword.keywordId}`}
                key={keyword.keywordId}
              >
                <div className="flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-md transition-colors">
                  <span className="w-6 text-sm text-gray-500 dark:text-gray-400">
                    {index + 1}
                  </span>
                  <span className="flex-1 font-medium text-gray-900 dark:text-white">
                    {keyword.text}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      keyword.score > 80
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {keyword.score}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeywordList;
