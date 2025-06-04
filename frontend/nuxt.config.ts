import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],

  runtimeConfig: {
    public: {
      apiBase:
        process.env.API_BASE || "https://product-hunt-d3ym.onrender.com/api",
    },
  },

  nitro: {
    compatibility: {
      compatibilityDate: "2025-05-15",
    },
  },

  devtools: {
    enabled: false,
  },

  telemetry: false, // Add this line to disable telemetry

  app: {
    head: {
      title: "Product Hunt Clone",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },

  build: {
    transpile: ["vue-toastification"],
  },

  plugins: [{ src: "~/plugins/toast.js", mode: "client" }],
});
