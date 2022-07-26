import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
  console.log('command', command, mode);
  if (mode === 'development') {
    return {
      plugins: [react()],
      build: {
        rollupOptions: {
          output: {
            dir: '../server/public',
          },
        },
      },
      server: {
        port: 3000,
        https: true,
      },
    };
  }
  return {
    plugins: [react()],
    build: {
      rollupOptions: {
        output: {
          dir: './public',
        },
      },
    },
  };
});
