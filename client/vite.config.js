import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
// https://vitejs.dev/config/
// here i have added the svgr() method into the plugins for it have installed "npm i vite-plugin-svgr" 
export default defineConfig({
  plugins: [react(),svgr()],
})
