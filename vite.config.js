// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        committee: resolve(__dirname, 'views/committees.html'),
        information: resolve(__dirname, 'views/information.html'),
        registration: resolve(__dirname, 'views/registration.html'),
      },
    },
  },
})