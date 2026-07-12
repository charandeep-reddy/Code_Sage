import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      checks: {
        pluginTimings: false,
      },
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/@monaco-editor")) {
            return "monaco";
          }

          if (id.includes("node_modules/framer-motion")) {
            return "motion";
          }

          if (id.includes("node_modules")) {
            return "vendor";
          }

          return undefined;
        },
      },
    },
  },
});
