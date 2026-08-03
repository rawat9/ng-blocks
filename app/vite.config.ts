/// <reference types="vitest" />

import analog from '@analogjs/platform'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    cacheDir: `../../node_modules/.vite`,
    build: {
      outDir: '../dist/./app/client',
      reportCompressedSize: true,
      target: ['es2020']
    },
    server: {
      fs: {
        allow: ['.']
      }
    },
    plugins: [
      analog({
        prerender: {
          routes: ['/', '/404.html']
        }
      }),
      tsconfigPaths()
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      reporters: ['default']
    },
    define: {
      'import.meta.vitest': mode !== 'production'
    }
  }
})
