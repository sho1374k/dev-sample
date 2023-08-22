import { defineConfig } from "astro/config";
import postcssMergeQueries from "postcss-merge-queries";
import glsl from "vite-plugin-glsl";
// import sitemap from "@astrojs/sitemap";
import * as dotenv from "dotenv";
dotenv.config();

function createDate() {
  let now = new Date(),
    year = String(now.getFullYear()),
    month = String(now.getMonth() + 1),
    date = String(now.getDate()),
    hour = String(now.getHours()),
    minute = String(now.getMinutes());

  month = month.length === 1 ? `0${month}` : month;
  return `${year}${month}${date}`;
}

const DATE = createDate(),
  MODE = process.env.NODE_ENV,
  SITE_URL = MODE === "production" ? process.env.PUBLIC_PROD_URL : process.env.PUBLIC_LOCAL_URL;

console.log(
  `// --------------------------\n\n⚡️ ~ MODE : ${MODE}\n\n▕▔▔▔▔▔▔▔▔▔▔▔╲\n▕╮╭┻┻╮╭┻┻╮╭▕╮╲\n▕╯┃╭╮┃┃╭╮┃╰▕╯╭▏\n▕╭┻┻┻┛┗┻┻┛ ╰▏ ▏\n▕╰━━━┓┈┈┈╭╮▕╭╮▏\n▕╭╮╰┳┳┳┳╯╰╯▕╰╯▏\n▕╰╯┈┗┛┗┛┈╭╮▕╮┈▏\n\n// --------------------------\n\n🌏 ~ ${SITE_URL}\n\n// --------------------------`,
);

// https://astro.build/config
export default defineConfig({
  markdown: {
    drafts: true,
  },
  build: {
    assets: "assets",
  },
  site: SITE_URL,
  base: "/",
  vite: {
    esbuild: {
      drop: ["console", "debugger"],
    },
    plugins: [glsl()],
    build: {
      rollupOptions: {
        output: {
          assetFileNames: `assets/build.[hash].${DATE}[extname]`,
          entryFileNames: `assets/build.[hash].${DATE}.js`,
        },
      },
    },
    css: {
      postcss: {
        plugins: [postcssMergeQueries],
      },
    },
    server: {
      open: true,
      port: 3000,
    },
    preview: {
      open: true,
      port: 3000,
      host: true,
    },
  },
  plugins: ["prettier-plugin-astro"],
  integrations: [],
  server: {
    open: true,
    host: true,
    port: 3000,
  },
  preview: {
    open: true,
    host: true,
    port: 3000,
  },
});
