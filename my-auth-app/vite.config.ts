import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // Allow connections from outside the container
    port: 5173,      // Optional: ensure the port matches
  },
  plugins: [react()],
})
