import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl : "http://localhost:5173/",
    projectId: "od86uv",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
