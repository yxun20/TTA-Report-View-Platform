// vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: 'localhost',  // ✅ IPv6 문제 방지
    port: 3000,         // ✅ 포트 3000 사용
    strictPort: true,   // ✅ 포트 충돌 시 즉시 오류 발생
    proxy: {
      // "/services"로 시작하는 모든 요청을 http://10.10.8.88:8000 로 프록시
      '/services': {
        target: 'http://10.10.8.88:8000',
        changeOrigin: true,
        secure: false,
        // 필요하면 rewrite 추가
        // rewrite: (path) => path.replace(/^\/services/, '/services'),
      },
    },
  },
});
