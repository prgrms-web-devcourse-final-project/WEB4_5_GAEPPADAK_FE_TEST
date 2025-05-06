"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { newsService } from "@src/services/news.service";
import { videoService } from "@src/services/video.service";
import { INews } from "@/types";
import { IVideo } from "@/types";
import LoadingSpinner from "@src/components/ui/LoadingSpinner";

export default function PopularNewsPage() {
  // 상태 관리
  const [newsList, setNewsList] = useState<INews.ISummary[]>([]);
  const [videoList, setVideoList] = useState<IVideo.ISummary[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(4);

  // 뉴스 데이터 가져오기
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setNewsLoading(true);
        const response = await newsService.getPopularNews({
          page: currentPage,
          size: 5,
        });

        setNewsList(response.data.list || []);
      } catch (error) {
        console.error("인기 뉴스 로딩 중 오류 발생:", error);
        setNewsList([]);
      } finally {
        setNewsLoading(false);
      }
    };

    fetchNews();
  }, [currentPage]);

  // 비디오 데이터 가져오기
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setVideoLoading(true);
        const response = await videoService.getPopularVideos({
          page: 1,
          size: 5,
        });

        setVideoList(response.data.list || []);
      } catch (error) {
        console.error("인기 비디오 로딩 중 오류 발생:", error);
        setVideoList([]);
      } finally {
        setVideoLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  if (newsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {/* 뉴스 목록 */}
      <div className="space-y-4">
        {newsList.length > 0 ? (
          newsList.map((news, index) => (
            <div
              key={news.newsId || index}
              className="border border-gray-200 rounded-lg"
            >
              <div className="flex">
                {/* 썸네일 */}
                <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center bg-gray-100">
                  {news.thumbnailUrl ? (
                    <Image
                      src={news.thumbnailUrl}
                      alt={news.title || ""}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <div>썸네일</div>
                      <div>이미지</div>
                    </div>
                  )}
                </div>

                {/* 내용 */}
                <div className="flex-1 p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {news.title || `네이버 뉴스 제목 ${index + 1}`}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {news.summary || "뉴스 내용..."}
                  </p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>(뉴스 작성 시간 표시)</span>
                    <span>
                      {news.createdAt ? formatDate(news.createdAt) : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          // 뉴스가 없는 경우 메시지 표시
          <div className="border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500">조회된 뉴스가 없습니다.</p>
          </div>
        )}
      </div>

      {/* 페이지네이션 - 뉴스가 있을 때만 표시 */}
      {newsList.length > 0 && (
        <div className="flex justify-center my-8">
          <div className="flex items-center">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="mx-1"
            >
              ◀
            </button>

            {Array.from({ length: 4 }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`mx-1 ${currentPage === page ? "font-bold" : ""}`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="mx-1"
            >
              ▶
            </button>
          </div>
        </div>
      )}

      {/* 하단 관련 유튜브 섹션 */}
      <div className="mt-8 mb-4">
        <h2 className="text-lg font-semibold mb-4">연관 유튜브</h2>
        {videoLoading ? (
          <LoadingSpinner />
        ) : videoList.length > 0 ? (
          <div className="grid grid-cols-5 gap-4">
            {videoList.map((video, index) => (
              <Link
                key={video.videoId || index}
                href={video.url || "#"}
                className="border border-gray-200 rounded"
              >
                <div className="aspect-square bg-gray-100 relative">
                  {video.thumbnailUrl ? (
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title || ""}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-center">
                      <div>
                        <div>썸네일</div>
                        <div>이미지</div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-2 text-center text-sm">
                  {video.title || "유튜브 제목"}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // 비디오가 없는 경우 메시지 표시
          <div className="border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500">조회된 유튜브가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
