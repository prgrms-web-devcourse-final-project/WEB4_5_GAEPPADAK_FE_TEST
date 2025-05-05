"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { newsService } from "../services/news.service";
import { videoService } from "../services/video.service";
import { keywordService } from "../services/keyword.service";
import { postService } from "../services/post.service";
import { INews, IVideo, IKeyword, IPost } from "../../types";
import { formatDate } from "../utils/date.utility";

export default function Home() {
  const [news, setNews] = useState<INews.ISummary[]>([]);
  const [videos, setVideos] = useState<IVideo.ISummary[]>([]);
  const [keywords, setKeywords] = useState<IKeyword.ISummary[]>([]);
  const [posts, setPosts] = useState<IPost.ISummary[]>([]);
  const [activeTab, setActiveTab] = useState("home");
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
      {/* 내비게이션 헤더 */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                메인 화면
              </Link>
              <nav className="flex space-x-1">
                <NavTab
                  label="홈"
                  active={activeTab === "home"}
                  onClick={() => setActiveTab("home")}
                />
                <NavTab
                  label="인기 뉴스"
                  active={activeTab === "news"}
                  onClick={() => setActiveTab("news")}
                />
                <NavTab
                  label="인기 유튜브"
                  active={activeTab === "video"}
                  onClick={() => setActiveTab("video")}
                />
              </nav>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 rounded-full text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                회원가입
              </button>
              <button className="px-4 py-2 rounded-full text-sm text-white bg-blue-600 hover:bg-blue-700">
                로그인
              </button>
            </div>
          </div>
        </div>
      </header>

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
                    <PostCard key={post.postId} post={post} index={index} />
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
                      <div
                        key={keyword.keywordId}
                        className="flex items-center"
                      >
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

// 컴포넌트 정의
const NavTab = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      active
        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
    }`}
  >
    {label}
  </button>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

const PostCard = ({ post, index }: { post: IPost.ISummary; index: number }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
    <div className="p-6 flex gap-6">
      <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center flex-shrink-0">
        <Image
          src={post.thumbnailUrl || "/placeholder.jpg"}
          alt={post.title}
          width={96}
          height={96}
          className="rounded object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 text-sm text-gray-500">{index + 1}</span>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
            {post.title}
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {post.summary}
        </p>
        <button className="px-4 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
          채팅방 키워드
        </button>
      </div>
    </div>
  </div>
);

const NewsCard = ({ news }: { news: INews.ISummary }) => (
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

const VideoCard = ({ video }: { video: IVideo.ISummary }) => (
  <Link
    href={video.url}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
  >
    <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden mb-4 group">
      <Image
        src={video.thumbnailUrl || "/placeholder.jpg"}
        alt={video.title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-black bg-opacity-60 flex items-center justify-center group-hover:bg-opacity-80 transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-6 h-6"
          >
            <path d="M8 5.14v14l11-7-11-7z" />
          </svg>
        </div>
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
        {video.title}
      </h3>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        AI로 짜여진 열번째 키워드에 대한 내용...
      </div>
      <button className="mt-3 px-4 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
        열번째 키워드
      </button>
    </div>
  </Link>
);
