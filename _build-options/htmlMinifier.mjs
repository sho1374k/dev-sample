import { writeFileSync, readFileSync } from "fs";
import { glob } from "glob";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const minify = require('html-minifier').minify;

const htmlMinifier = () => {
  try {
    const files = glob.sync("dist/**/*.html");
    console.log(files);
    for (const file of files) {
      const data = readFileSync(file, "utf8");
      const after = minify(data, {
        collapseWhitespace: true, // 空白を折りたたむ
        removeComments: true, // HTMLコメントアウトを削除する
      });
      writeFileSync(file, after, "utf8");
    }
    console.log(`\n// --------------------------\n\n👌 ~ html minifier\n\n// --------------------------\n`);
  } catch (error) {
    console.log(`\n// -------------------------- \n\n🙅‍♀️ ~ html minifier\n\n// --------------------------\n${error}\n`);
  }
};
htmlMinifier();

/* --------------------------
# 📝 ~ Note

## 📕 ~ Reference
- https://github.com/kangax/html-minifier

## 🎮 ~ Command
```
node _build-options/htmlMinifier.mjs
```
-------------------------- */