"use client";

import { ReactNode } from "react";
import Navigation from "@/src/components/navigation/Header";
import KeywordSidebar from "@/src/components/sidebar/KeywordList";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />

      <main>
        <div className="flex">
          <div className="flex-1 max-w-5xl">
            <div className="container mx-auto px-6 py-8">{children}</div>
          </div>

          <aside className="w-80 pl-8 hidden lg:block">
            <div className="sticky top-24">
              <KeywordSidebar />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
