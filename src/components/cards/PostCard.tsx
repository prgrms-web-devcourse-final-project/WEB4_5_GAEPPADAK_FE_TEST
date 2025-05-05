import React from "react";
import Image from "next/image";
import { IPost } from "../../../types";

interface PostCardProps {
  post: IPost.ISummary;
  index: number;
}

export const PostCard: React.FC<PostCardProps> = ({ post, index }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
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
        <button
          className="px-4 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          채팅방 키워드
        </button>
      </div>
    </div>
  </div>
);

export default PostCard;
