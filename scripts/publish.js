import { cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const files = ["index.html", "404.html"];
const directories = ["assets", "research", "resume", "miscellaneous"];

for (const file of files) {
  cpSync(`_site/${file}`, file);
}

for (const directory of directories) {
  mkdirSync(directory, { recursive: true });
  cpSync(`_site/${directory}`, directory, { recursive: true });
}

const htmlFiles = [
  ...files,
  "research/index.html",
  "resume/index.html",
  "miscellaneous/index.html"
];

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8").replace(/[ \t]+$/gm, "");
  writeFileSync(file, html);
}

console.log("Published the generated site to the repository root.");
