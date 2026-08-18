import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the build works when hosted at
// https://<username>.github.io/<repo-name>/ on GitHub Pages,
// no matter what the repo is named.
export default defineConfig({
  plugins: [react()],
  base: '/monster_collection/',
})
