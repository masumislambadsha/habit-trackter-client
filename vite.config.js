import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    middlewareMode: false,
    // Fallback for SPA routing
    historyApiFallback: {
      rewrites: [
        { from: /^\/.*$/, to: '/index.html' }
      ]
    }
  }
})
