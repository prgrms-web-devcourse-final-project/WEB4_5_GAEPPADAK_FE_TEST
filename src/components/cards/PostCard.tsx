import React from "react";
import Image from "next/image";
import { IPost } from "../../../types";
import { useRouter } from "next/navigation";
interface PostCardProps {
  post: IPost.ISummary;
  index: number;
}

export const PostCard: React.FC<PostCardProps> = ({ post, index }) => {
  const router = useRouter();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
      <div className="p-6 flex gap-6">
        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center flex-shrink-0">
          {post.thumbnailUrl ? (
            <Image
              src={post.thumbnailUrl}
              alt={post.title}
              width={96}
              height={96}
              className="rounded object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400 dark:text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
          )}
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
          <button
            className="px-4 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/main/posts/${post.postId}`);
            }}
          >
            {post.keyword}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
