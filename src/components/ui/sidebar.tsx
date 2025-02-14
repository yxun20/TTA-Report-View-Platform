import React from "react";
import { FaCog, FaStar, FaGlobe, FaFileAlt, FaUsers } from "react-icons/fa";

export const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white shadow-md flex flex-col p-4">
      <h1 className="text-lg font-bold mb-6">TTA</h1>
      <nav className="flex flex-col gap-4">
        <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-500">
          <FaGlobe /> 국제화
        </a>
        <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-500">
          <FaFileAlt /> 현지화
        </a>
        <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-500">
          <FaUsers /> 컨설팅
        </a>
      </nav>
      <div className="mt-auto">
        <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-500">
          <FaCog /> 설정
        </a>
        <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-500">
          <FaStar /> 즐겨찾기
        </a>
      </div>
    </div>
  );
};
