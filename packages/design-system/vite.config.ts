import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  if (mode === "lib") {
    return {
      plugins: [
        react(),
        dts({
          include: ["src"],
          outDir: "lib",
          rollupTypes: true,
        }),
      ],
      publicDir: false,
      build: {
        lib: {
          entry: resolve(__dirname, "src/index.ts"),
          name: "BowpiDesignSystem",
          fileName: (fmt) => `design-system.${fmt}.js`,
          formats: ["es", "cjs"],
        },
        rollupOptions: {
          external: ["react", "react-dom", "react/jsx-runtime"],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
            },
            assetFileNames: (asset) => {
              const name = asset.name ?? "";
              return name.endsWith(".css") ? "design-system.css" : name || "asset";
            },
          },
        },
        cssCodeSplit: false,
        outDir: "lib",
        emptyOutDir: true,
        sourcemap: true,
      },
    };
  }

  // Default mode (dev / storybook)
  return { plugins: [react()] };
});
