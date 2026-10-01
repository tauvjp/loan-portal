import { build } from "vite";
import { cp, readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const dist = join(root, "dist");
const server = join(root, ".build/ssr");
const configFile = join(root, "vite.config.ts");

await build({ configFile });
await build({
  configFile,
  logLevel: "warn",
  build: {
    ssr: join(root, "src/entry-server.tsx"),
    outDir: server,
    emptyOutDir: true,
    copyPublicDir: false,
  },
});
const { render } = await import(pathToFileURL(join(server, "entry-server.js")).href);
const template = await readFile(join(dist, "index.html"), "utf8");
if (!template.includes("<!--app-html-->")) throw new Error("Missing prerender slot");
const html = template.replace("<!--app-html-->", render());
await writeFile(join(dist, "index.html"), html);

// Existing GitHub Pages publishes the repository root. Commit these outputs.
// Keep the existing CNAME, admin, verification files and legacy ad assets intact.
for (const directory of ["assets", "images"]) {
  await rm(join(root, directory), { recursive: true, force: true });
  await mkdir(join(root, directory), { recursive: true });
  await cp(join(dist, directory), join(root, directory), { recursive: true });
}
await cp(join(dist, "favicon.svg"), join(root, "favicon.svg"));
await writeFile(join(root, "index.html"), html);
await writeFile(join(root, ".nojekyll"), "");
console.log("Ready: static homepage, styles, scripts and images for GitHub Pages.");
