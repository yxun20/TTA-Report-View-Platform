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
    host: '10.10.8.50',  // ✅ IPv6 문제 방지
    port: 3200,         // ✅ 포트 3000 사용
    strictPort: true,   // ✅ 포트 충돌 시 즉시 오류 발생
  },
});
