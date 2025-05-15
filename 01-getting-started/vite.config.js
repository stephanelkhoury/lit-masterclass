import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // Base public path when served in production
  base: './',
  
  // Configure the build output directory
  build: {
    outDir: 'dist',
  },
  
  // Development server options
  server: {
    port: 5173,
    open: true, // Open browser on server start
    cors: true, // Enable CORS
  }
});
