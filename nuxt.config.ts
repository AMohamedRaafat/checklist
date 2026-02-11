// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "motion-v/nuxt", "@vite-pwa/nuxt"],
  app: {
    head: {
      htmlAttrs: {
        lang: "ar",
        dir: "rtl",
      },
      meta: [
        {
          name: "description",
          content:
            "تطبيق قائمة التحقق الشاملة لتعيين شركة نقلة - إدارة فعالة للمسوغات والملفات المطلوبة",
        },
        { name: "theme-color", content: "#10b981" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [{ rel: "icon", href: "/logo.png" }],
    },
  },
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "قائمة التحقق من مسوغات التعيين",
      short_name: "Checklist",
      description: "تطبيق قائمة التحقق من مسوغات تعيين شركة نقلة",
      theme_color: "#10b981",
      background_color: "#ffffff",
      display: "standalone",
      scope: "/",
      start_url: "/",
      dir: "rtl",
      lang: "ar-SA",
      orientation: "portrait-primary",
      categories: ["productivity"],
      icons: [
        {
          src: "/logo.png",
          sizes: "192x192 512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icon.svg",
          sizes: "any",
          type: "image/svg+xml",
          purpose: "any",
        },
      ],
    },
    workbox: {
      cleanupOutdatedCaches: true,
      skipWaiting: true,
    },
  },
});
