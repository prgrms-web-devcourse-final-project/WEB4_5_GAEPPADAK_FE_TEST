// app/(main)/posts/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { postService } from "@src/services/post.service";
import { IPost } from "@/types";
import LoadingSpinner from "@src/components/ui/LoadingSpinner";
import { commentService } from "@/src/services/comment.service";
import { IComment } from "@/types/comment";

export default function PostDetailPage() {
  const params = useParams();
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<IComment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await postService.getDetail(Number(params.id));
        setPost(response.data);

        const { list, meta } = await commentService.getComments(
          Number(params.id),
          {
            page: currentPage,
            size: 10,
            sort: "createdAt",
          }
        );

        setComments(list);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    // 댓글 제출 로직 (API 연동 예정)
    setComment("");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          게시글을 찾을 수 없습니다.
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* 뒤로가기 버튼 */}
      <Link
        href="/"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 mb-6"
      >
        <svg
          className="w-5 h-5 mr-2"
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
        포스트 화면
      </Link>

      {/* 메인 콘텐츠 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
        {/* 포스트 헤더 */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 mb-4">
            {post.keyword}
          </span>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>
        </div>

        {/* 썸네일 이미지 */}
        <div className="px-6 py-8">
          <div className="w-full aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden relative mb-6">
            {post.thumbnailUrl ? (
              <Image
                src={post.thumbnailUrl}
                alt={post.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32">
                  <Image
                    src="/sample-image.png"
                    alt="Sample"
                    width={150}
                    height={100}
                    className="object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 포스트 내용 */}
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {post.summary}
            </p>
          </div>
        </div>
      </div>

      {/* 댓글 섹션 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          댓글 (댓글 개수)
        </h3>

        {/* 댓글 입력 폼 */}
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="댓글 입력 창"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              입력
            </button>
          </div>
        </form>

        {/* 댓글 목록 */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.commentId} className="flex gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-700">
                {comment.profileUrl && (
                  <Image
                    src={comment.profileUrl}
                    alt={comment.nickname}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="font-medium text-gray-900 dark:text-white mb-1">
                    {comment.nickname}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {comment.body}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <button className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    추천
                    {comment.likeCount}
                  </button>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {comment.createdAt}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
              className="w-5 h-5 text-gray-600 dark:text-gray-400"
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
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
              className="w-5 h-5 text-gray-600 dark:text-gray-400"
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

      {/* 뉴스 추천 섹션 */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          뉴스 추천
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
                썸네일 이미지
              </p>
              <p className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                뉴스 제목
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded text-center">
                유튜브 채팅
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
