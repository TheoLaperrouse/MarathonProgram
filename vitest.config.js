import viteConfig from './vite.config';
import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            globals: true,
            setupFiles: 'vitest.setup.js',
            environment: 'jsdom',
            exclude: [...configDefaults.exclude],
            root: fileURLToPath(new URL('./', import.meta.url)),
        },
    }),
);
