import React, { useState } from "react";
import Link from "next/link";
import NavTab from "@/components/ui/NavTab";

interface HeaderProps {
  initialActiveTab?: string;
}

export const Header: React.FC<HeaderProps> = ({
  initialActiveTab = "home",
}) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  return (
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
            <Link href="/signup">
              <button className="px-4 py-2 rounded-full text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                회원가입
              </button>
            </Link>
            <Link href="/signin">
              <button className="px-4 py-2 rounded-full text-sm text-white bg-blue-600 hover:bg-blue-700">
                로그인
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
