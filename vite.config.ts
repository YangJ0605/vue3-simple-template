import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // 键必须以斜线开始和结束
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [vue(), vueJsx(), Unocss()],
  server: {
    host: true,
    port: 8888
  }
})
