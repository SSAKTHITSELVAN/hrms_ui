import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'HRMS App',
        short_name: 'HRMS',
        description: 'Pinesphere HRMS App',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/'
        // 🔥 Icons removed — minimal setup now
      }
    })
  ],
  server: {
    host: '0.0.0.0', // Bind to all interfaces including your IP
    port: 5173,      // Optional, set explicitly
    strictPort: true // Ensures it doesn’t auto-switch if busy
  }
})
