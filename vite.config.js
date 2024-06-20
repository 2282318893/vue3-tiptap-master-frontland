import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), vueJsx()],
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
			"@@": resolve(__dirname, "./src/canvas/src")
		}
	},
	// server: {
	// 	host: "0.0.0.0",
	// 	port: 8000,
	// 	open: true
	// },
	server: {
		host: "0.0.0.0",
		port: 8000,
		open: true,
		cors: true,
		proxy: {
			"/universer-api": {
				target: "http://1.95.48.209:3010",
				changeOrigin: true,
				ws: true
			}
		}
	},
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.js"),
			name: "Vue3TipTap",
			fileName: "vue3-tiptap"
		},
		rollupOptions: {
			external: ["vue"],
			output: {
				globals: {
					vue: "Vue"
				}
			}
		}
	}
});
