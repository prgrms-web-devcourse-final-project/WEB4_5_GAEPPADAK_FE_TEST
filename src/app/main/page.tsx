"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { newsService } from "@src/services/news.service";
import { videoService } from "@src/services/video.service";
import { postService } from "@src/services/post.service";
import { INews, IVideo, IPost } from "@/types";

// UI 컴포넌트 임포트
import LoadingSpinner from "@src/components/ui/LoadingSpinner";

// 카드 컴포넌트 임포트
import PostCard from "@src/components/cards/PostCard";
import NewsCard from "@src/components/cards/NewsCard";
import VideoCard from "@src/components/cards/VideoCard";

export default function Home() {
  const [news, setNews] = useState<INews.ISummary[]>([]);
  const [videos, setVideos] = useState<IVideo.ISummary[]>([]);
  const [posts, setPosts] = useState<IPost.ISummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [newsRes, videosRes, postsRes] = await Promise.all([
          newsService.getTop10Summary(),
          videoService.getTop10Summary(),
          postService.getTop10Summary(),
        ]);

        setNews(newsRes.data.list);
        setVideos(videosRes.data.list);
        setPosts(postsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          실시간 포스트 리스트
        </h2>
        <div className="space-y-4">
          {posts.slice(0, 5).map((post, index) => (
            <Link href={`main/posts/${post.postId}`} key={post.postId}>
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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.slice(0, 5).map((video, index) => (
            <VideoCard key={index} video={video} />
          ))}
        </div>
      </section>
    </>
  );
}
