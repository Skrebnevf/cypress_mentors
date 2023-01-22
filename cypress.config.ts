import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    "defaultCommandTimeout": 10000,
    "viewportWidth": 1400,
    "viewportHeight": 800,
    "projectId": "",
    "chromeWebSecurity": false,
    experimentalStudio: true,
    video: false,
  },
});
