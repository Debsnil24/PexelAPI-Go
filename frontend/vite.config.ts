import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/photo': { // Proxy requests starting with /api/photo
        target: 'http://localhost:9000', // Your Go server's address
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/photo/, '/api/photo'), // Keep /api/photo prefix
      },
      '/api/video': { //proxy requests starting with /api/video
        target: 'http://localhost:9000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/video/, '/api/video'),
      },
      '/api/remaining': { //proxy requests starting with /api/remaining
        target: 'http://localhost:9000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/remaining/, '/api/remaining'),
      }
    },
  },
})
