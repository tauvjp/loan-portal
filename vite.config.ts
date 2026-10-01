import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const fromRoot = (name: string) => fileURLToPath(new URL(name, import.meta.url));

export default defineConfig({
  root: fromRoot("./src"),
  base: "/",
  publicDir: fromRoot("./public"),
  plugins: [react()],
  resolve: { alias: { "@": fromRoot("./src") } },
  build: { outDir: fromRoot("./dist"), emptyOutDir: true },
});
