import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/lookup': {
                target: 'http://localhost:3010',
                changeOrigin: true,
            },
        },
    },
})
