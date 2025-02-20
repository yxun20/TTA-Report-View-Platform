// src/index.tsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // 필요 시 사용, 없으면 제거

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('root element not found');

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
