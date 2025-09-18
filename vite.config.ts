import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Prod en raíz (indoffpro.com) y build limpia a /dist
export default defineConfig({
  base: '/',                     // sirve en raíz del dominio
  plugins: [react(), tailwindcss()],
  envPrefix: 'VITE_',            // solo expone variables que empiecen con VITE_
  server: {
    host: true,                  // accesible en LAN
    port: 5173,
    strictPort: true,
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    target: 'esnext',
  },
});
