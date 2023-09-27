import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 配置@别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // 服务器配置
  server: {
    proxy: {
      '/api': {
        target: 'http://codercba.com:9002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
