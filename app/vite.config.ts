/// <reference types="vitest" />

import analog from '@analogjs/platform'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { readFileSync } from 'node:fs'
import { defineConfig, Plugin } from 'vite'

function myPlugin(): Plugin {
  return {
    name: 'source-query',
    transform(code, id) {
      if (id.includes('?source')) {
        // Get the source file path
        const source = readFileSync(id.replace('?source', '')).toString()

        // Replace the import statement with a string literal
        code = `export default \`${source.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`;`
      }
      return code
    },
  }
}

export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    cacheDir: `../../node_modules/.vite`,
    build: {
      outDir: '../dist/./app/client',
      reportCompressedSize: true,
      target: ['es2020'],
    },

    server: {
      fs: {
        allow: ['.'],
      },
    },
    plugins: [
      analog({
        prerender: {
          routes: ['/', '/404.html'],
        },
      }),
      nxViteTsPaths(),
      myPlugin(),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      reporters: ['default'],
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  }
})
