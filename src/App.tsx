import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ReportDetailPage from './pages/ReportDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인 페이지 */}
        <Route path="/" element={<MainPage />} />
        {/* 상세 페이지 */}
        <Route path="/report/:reportId" element={<ReportDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
