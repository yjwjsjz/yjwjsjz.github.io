// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://yjwjsjz.github.io',
	integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/404') })],
	markdown: {
		shikiConfig: {
			themes: { light: 'github-light', dark: 'github-dark' },
		},
	},
	vite: {
		build: {
			// 降低 CSS 压缩目标,防止 esbuild 剥掉 -webkit-background-clip/-webkit-mask-image
			// 等旧 Chromium(<120)/旧 Safari 仍必需的前缀(存量访客里有旧 Edge)
			cssTarget: ['chrome87', 'edge88', 'firefox78', 'safari14'],
		},
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
