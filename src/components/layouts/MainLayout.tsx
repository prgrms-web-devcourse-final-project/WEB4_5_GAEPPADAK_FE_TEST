import React, { ReactNode, useEffect, useState } from "react";
import Header from "../navigation/Header";
import KeywordList from "../sidebar/KeywordList";
import { keywordService } from "../../services/keyword.service";
import { IKeyword } from "../../../types";
import LoadingSpinner from "../ui/LoadingSpinner";

interface MainLayoutProps {
  children: ReactNode;
  activeTab?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  activeTab = "home",
}) => {
  const [keywords, setKeywords] = useState<IKeyword.ISummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        setLoading(true);
        const keywordsRes = await keywordService.getTop10Summary();
        setKeywords(keywordsRes.data);
      } catch (error) {
        console.error("Error fetching keywords:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKeywords();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 글로벌 헤더 */}
      <Header initialActiveTab={activeTab} />

      <div className="container mx-auto px-6 py-8">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex">
            {/* 메인 콘텐츠 */}
            <div className="flex-1 max-w-5xl">{children}</div>

            {/* 사이드바 (키워드 리스트) */}
            <aside className="pl-8">
              <KeywordList keywords={keywords} />
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainLayout;
