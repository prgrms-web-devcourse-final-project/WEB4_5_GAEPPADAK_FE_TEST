"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
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
        console.log("fetch start");
        setLoading(true);
        const [
          newsRes,
          videosRes,
          keywordsRes,
          //  postsRes
        ] = await Promise.all([
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
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#121212]">
      <Head>
        <title>Trending Now - 최신 트렌드와 뉴스</title>
        <meta
          name="description"
          content="최신 트렌드, 뉴스, 비디오를 한눈에 확인하세요"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-white dark:bg-[#1a1a1a] shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Trending Now
            </div>
            <nav className="hidden md:flex space-x-1">
              <TabButton
                active={activeTab === "home"}
                onClick={() => setActiveTab("home")}
                label="홈"
              />
              <TabButton
                active={activeTab === "news"}
                onClick={() => setActiveTab("news")}
                label="인기 뉴스"
              />
              <TabButton
                active={activeTab === "video"}
                onClick={() => setActiveTab("video")}
                label="인기 유튜브"
              />
            </nav>
          </div>

          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300">
              로그인
            </button>
            <button className="px-3 py-1.5 bg-blue-600 text-white rounded-full text-sm">
              회원가입
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* 히어로 섹션 */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 mb-8 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">
                  이런 느낌으로 만들어주시면 딱 갑습니다!
                </h1>
                <div className="flex-shrink-0 grid grid-cols-6 gap-1">
                  {news.slice(0, 6).map((item, index) => (
                    <div
                      key={index}
                      className="w-16 h-12 overflow-hidden rounded-md"
                    >
                      <Image
                        src={item.thumbnailUrl || "/placeholder.jpg"}
                        alt={item.title}
                        width={64}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 트렌딩 뉴스 섹션 */}
            <section className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Trending News</h2>
                <Link href="/news" className="text-blue-600 text-sm">
                  더보기 &rarr;
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.slice(0, 6).map((item, index) => (
                  <NewsCard key={index} news={item} />
                ))}
              </div>
            </section>

            {/* 인기 유튜브 비디오 섹션 */}
            <section className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Trending YouTube Videos</h2>
                <Link href="/videos" className="text-blue-600 text-sm">
                  더보기 &rarr;
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {videos.slice(0, 4).map((video, index) => (
                  <VideoCard key={index} video={video} />
                ))}
              </div>
            </section>

            {/* 인기 키워드 및 게시물 섹션 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">실시간 포스트</h2>
                  <Link href="/posts" className="text-blue-600 text-sm">
                    더보기 &rarr;
                  </Link>
                </div>
                <div className="space-y-4">
                  {posts.slice(0, 5).map((post, index) => (
                    <PostCard key={index} post={post} />
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">실시간 키워드</h2>
                  <Link href="/keywords" className="text-blue-600 text-sm">
                    더보기 &rarr;
                  </Link>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
                  <ul className="space-y-3">
                    {keywords.slice(0, 10).map((keyword, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center pb-2 border-b dark:border-gray-700"
                      >
                        <div className="flex items-center">
                          <span className="w-6 text-gray-500">{index + 1}</span>
                          <span className="font-medium">{keyword.text}</span>
                        </div>
                        <span
                          className={`text-sm px-2 py-1 rounded-full ${keyword.score > 80 ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}
                        >
                          {keyword.score}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="bg-white dark:bg-gray-900 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                Trending Now
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                최신 트렌드와 뉴스를 빠르게 확인하세요
              </p>
            </div>
            <div className="flex space-x-6">
              <Link
                href="/about"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400"
              >
                회사소개
              </Link>
              <Link
                href="/terms"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400"
              >
                이용약관
              </Link>
              <Link
                href="/privacy"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400"
              >
                개인정보처리방침
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400"
              >
                문의하기
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Trending Now. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// 컴포넌트들
const TabButton = ({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm ${
      active
        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
    }`}
  >
    {label}
  </button>
);

const NewsCard = ({ news }: { news: INews.ISummary }) => (
  <Link
    href={news.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow"
  >
    <div className="relative aspect-video">
      <Image
        src={news.thumbnailUrl || "/placeholder.jpg"}
        alt={news.title}
        fill
        className="object-cover"
      />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold line-clamp-2 mb-2 dark:text-white">
        {news.title}
      </h3>
      <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
        <span>{news.platform}</span>
        <span>{formatDate(news.publishedAt)}</span>
      </div>
    </div>
  </Link>
);

const VideoCard = ({ video }: { video: IVideo.ISummary }) => (
  <Link
    href={video.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow"
  >
    <div className="relative aspect-video group">
      <Image
        src={video.thumbnailUrl || "/placeholder.jpg"}
        alt={video.title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center">
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
    <div className="p-3">
      <h3 className="text-sm font-medium line-clamp-2 mb-1 dark:text-white">
        {video.title}
      </h3>
      <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400">
        <span>{video.platform}</span>
        <span>{formatDate(video.publishedAt)}</span>
      </div>
    </div>
  </Link>
);

const PostCard = ({ post }: { post: IPost.ISummary }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 hover:shadow-md transition-shadow">
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-xs font-medium">
            {post.keyword}
          </span>
          <span className="text-xs text-gray-500">샘플 이미지</span>
        </div>
        <h3 className="text-base font-bold mb-1 dark:text-white">
          {post.title}
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-2">
          {post.summary}
        </p>
      </div>
      <div className="flex-shrink-0 w-24 h-24 relative rounded-lg overflow-hidden">
        <Image
          src={post.thumbnailUrl || "/placeholder.jpg"}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
    </div>
  </div>
);
