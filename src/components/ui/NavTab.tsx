import React from "react";

interface NavTabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export const NavTab: React.FC<NavTabProps> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      active
        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
    }`}
  >
    {label}
  </button>
);

export default NavTab;
