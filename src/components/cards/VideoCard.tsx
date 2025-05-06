import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IVideo } from "../../../types";

interface VideoCardProps {
  video: IVideo.ISummary;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => (
  <Link
    href={video.url}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
  >
    <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden mb-4 group">
      {video.thumbnailUrl ? (
        <>
          <Image
            src={video.thumbnailUrl}
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
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-full text-gray-400 dark:text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}
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

export default VideoCard;
