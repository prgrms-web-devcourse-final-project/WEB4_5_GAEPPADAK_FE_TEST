// app/(main)/keyword/[keyword]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { postService } from "@src/services/post.service";
import { newsService } from "@src/services/news.service";
import { IPost } from "@/types";
import { INews } from "@/types/news";
import LoadingSpinner from "@src/components/ui/LoadingSpinner";

type TabType = "home" | "news" | "youtube";

export default function KeywordDetailPage() {
  const params = useParams();
  const keyword = decodeURIComponent(params.keyword as string);

  const [posts, setPosts] = useState<IPost.ISummary[]>([]);
  const [newsItems, setNewsItems] = useState<INews.ISource.ISummary[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const postsResponse = await postService.getList({
          keyword,
          page: currentPage,
          size: 10,
          sort: "createdAt",
        });

        if (postsResponse && postsResponse.code === "SUCCESS") {
          setPosts(postsResponse.data);
        }

        const newsResponse = await newsService.getSourceNewsList({
          keyword,
          page: 1,
          size: 10,
        });

        if (newsResponse && newsResponse.code === "SUCCESS") {
          setNewsItems(newsResponse.data);
        }
      } catch (error) {
        console.error("데이터 로드 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword, currentPage]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {/* 키워드 정보 */}
      <div className="mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            키워드: {keyword}
          </h1>
        </div>
      </div>

      {/* 홈 탭 - 포스트 목록 */}
      {activeTab === "home" && (
        <div className="space-y-4">
          {posts.map((post, index) => (
            <Link
              key={post.postId}
              href={`/main/posts/${post.postId}`}
              className="block"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex gap-6">
                {/* 썸네일 */}
                <div className="w-24 h-24 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                  {post.thumbnailUrl ? (
                    <Image
                      src={post.thumbnailUrl}
                      alt={post.title}
                      width={96}
                      height={96}
                      className="rounded object-cover"
                    />
                  ) : (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      썸네일
                      <br />
                      이미지
                    </span>
                  )}
                </div>

                {/* 콘텐츠 */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    AI로 짜여진 첫번째 키워드에 대한 포스트 제목 {index + 1}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    AI로 짜여진 첫번째 키워드에 대한 뉴스 내용...
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-500">
                      (뉴스 작성 시간 표시)
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      2025.04.24 13:00
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* 페이지네이션 */}
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <span className="mx-2 text-gray-700 dark:text-gray-300">
              {currentPage} | 2 | 3 | 4
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* 인기 뉴스 탭 */}
      {activeTab === "news" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Link
              key={index}
              href="#"
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow"
            >
              <div className="w-32 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg mx-auto mb-2 relative">
                <Image
                  src="/placeholder.jpg"
                  alt="썸네일"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white text-center mb-2">
                썸네일
                <br />
                이미지
              </p>
              <p className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                뉴스 제목
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded text-center">
                뉴스 채팅
              </p>
            </Link>
          ))}
        </div>
      )}

      {/* 인기 유튜브 탭 */}
      {activeTab === "youtube" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Link
              key={index}
              href="#"
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow"
            >
              <div className="w-32 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg mx-auto mb-2 relative">
                <Image
                  src="/placeholder.jpg"
                  alt="썸네일"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white text-center mb-2">
                썸네일
                <br />
                이미지
              </p>
              <p className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                유튜브 제목
              </p>
              <p className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded text-center">
                유튜브 채팅
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
