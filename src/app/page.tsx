"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { newsService } from "../services/news.service";
import { videoService } from "../services/video.service";
import { keywordService } from "../services/keyword.service";
// import { postService } from "../services/post.service";
import { INews, IVideo, IKeyword, IPost } from "../../types";

// UI 컴포넌트 임포트
import LoadingSpinner from "../components/ui/LoadingSpinner";

// 네비게이션 컴포넌트 임포트
import Header from "../components/navigation/Header";

// 카드 컴포넌트 임포트
import PostCard from "../components/cards/PostCard";
import NewsCard from "../components/cards/NewsCard";
import VideoCard from "../components/cards/VideoCard";

export default function Home() {
  const [news, setNews] = useState<INews.ISummary[]>([]);
  const [videos, setVideos] = useState<IVideo.ISummary[]>([]);
  const [keywords, setKeywords] = useState<IKeyword.ISummary[]>([]);
  const [posts, setPosts] = useState<IPost.ISummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [newsRes, videosRes, keywordsRes /*postsRes*/] =
          await Promise.all([
            newsService.getTop10Summary(),
            videoService.getTop10Summary(),
            keywordService.getTop10Summary(),
            // postService.getTop10Summary(),
          ]);

        setNews(newsRes.data.list);
        setVideos(videosRes.data.list);
        setKeywords(keywordsRes.data);
        // setPosts(postsRes.data);

        // 임시 포스트 데이터 (포스트 API가 활성화될 때까지 사용)
        setPosts([
          {
            postId: 1,
            keyword: "키워드1",
            title: "샘플 포스트 제목 1",
            summary:
              "이것은 샘플 포스트의 요약입니다. API가 연결되면 실제 데이터로 대체됩니다.",
            thumbnailUrl: "/placeholder.jpg",
          },
          {
            postId: 2,
            keyword: "키워드2",
            title: "샘플 포스트 제목 2",
            summary:
              "두 번째 샘플 포스트입니다. 실제 API 연동 시 이 데이터는 제거될 예정입니다.",
            thumbnailUrl: "/placeholder.jpg",
          },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 글로벌 헤더 컴포넌트 사용 */}
      <Header initialActiveTab="home" />

      <main className="container mx-auto px-6 py-8">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex">
            {/* 메인 콘텐츠 영역 */}
            <div className="flex-1 max-w-5xl">
              {/* 실시간 포스트 리스트 섹션 */}
              <section className="mb-12">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  실시간 포스트 리스트
                </h2>
                <div className="space-y-4">
                  {posts.slice(0, 5).map((post, index) => (
                    <Link href={`/posts/${post.postId}`} key={post.postId}>
                      <PostCard post={post} index={index} />
                    </Link>
                  ))}
                </div>
              </section>

              {/* 인기 뉴스 섹션 */}
              <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    인기 뉴스
                  </h2>
                  <Link
                    href="/news"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    전체보기 버튼
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {news.slice(0, 5).map((newsItem, index) => (
                    <NewsCard key={index} news={newsItem} />
                  ))}
                </div>
              </section>

              {/* 인기 유튜브 섹션 */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    인기 유튜브
                  </h2>
                  <Link
                    href="/videos"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    전체보기 버튼
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.slice(0, 5).map((video, index) => (
                    <VideoCard key={index} video={video} />
                  ))}
                </div>
              </section>
            </div>

            {/* 실시간 키워드 - 우측 sticky 사이드바 */}
            <aside className="w-80 pl-8 hidden lg:block">
              <div className="sticky top-24">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-between">
                    실시간 키워드
                    <Link
                      href="/keywords"
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      더보기
                    </Link>
                  </h2>
                  <div className="space-y-4">
                    {keywords.slice(0, 10).map((keyword, index) => (
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
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
