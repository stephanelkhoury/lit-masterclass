import { defineConfig } from 'vite';

export default defineConfig({
  // Base public path when served
  base: './',
  
  // Development server options
  server: {
    port: 5173,
    open: true
  },
  
  // Build options
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['lit']
  }
});
