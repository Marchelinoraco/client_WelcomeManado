<template>
  <div :class="{ 'dark-app': isDark }">
    <Navbar />
    <router-view :key="$route.fullPath"></router-view>

    <!-- Footer -->
    <footer
      class="bg-gray-950 text-white py-24 border-t border-gray-900 dark:bg-[#020617]"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div class="col-span-1 md:col-span-2">
            <h3
              class="text-3xl font-black text-red-500 mb-8 tracking-tighter italic uppercase"
            >
              WelcomeManado
            </h3>
            <p
              class="text-gray-400 max-md mb-10 leading-relaxed text-base font-light"
            >
              {{ $t("footer.description") }}
            </p>
            <div class="flex space-x-6">
              <a
                href="https://instagram.com/welcomemanadotours"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer text-xs font-bold"
              >
                IG
              </a>
              <a
                href="https://www.facebook.com/welcomemanadotours"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer text-xs font-bold"
              >
                FB
              </a>
              <a
                href="https://wa.me/6282173738822"
                target="_blank"
                class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer text-xs font-bold"
              >
                WA
              </a>
            </div>
          </div>
          <div>
            <h4
              class="text-sm font-black uppercase tracking-[0.2em] mb-8 text-gray-100"
            >
              {{ $t("footer.quickLinks") }}
            </h4>
            <ul class="space-y-4 text-gray-400 text-sm font-medium">
              <li>
                <router-link
                  to="/"
                  class="hover:text-red-500 transition-colors flex items-center"
                  ><span class="mr-2">#</span> {{ $t("nav.home") }}</router-link
                >
              </li>
              <li>
                <router-link
                  to="/about"
                  class="hover:text-red-500 transition-colors flex items-center"
                  ><span class="mr-2">#</span>
                  {{ $t("nav.about") }}</router-link
                >
              </li>
              <li>
                <router-link
                  to="/contact"
                  class="hover:text-red-500 transition-colors flex items-center"
                  ><span class="mr-2">#</span>
                  {{ $t("nav.contact") }}</router-link
                >
              </li>
            </ul>
          </div>
          <div>
            <h4
              class="text-sm font-black uppercase tracking-[0.2em] mb-8 text-gray-100"
            >
              {{ $t("footer.getInTouch") }}
            </h4>
            <div class="space-y-6 text-gray-400 text-sm font-medium">
              <p class="flex items-start">
                <span class="text-red-500 mr-3 mt-1 text-xs">●</span>
                {{ $t("common.officeAddress") }}
              </p>
              <a
                href="tel:+6282173738822"
                class="flex items-start hover:text-red-500 transition-colors"
              >
                <span class="text-red-500 mr-3 mt-1 text-xs">●</span> +62
                821-7373-8822
              </a>
              <a
                href="mailto:info@welcomemanado.com"
                class="flex items-start hover:text-red-500 transition-colors"
              >
                <span class="text-red-500 mr-3 mt-1 text-xs">●</span>
                info@welcomemanado.com
              </a>
              <a
                href="mailto:tour.welcomemanado@gmail.com"
                class="flex items-start hover:text-red-500 transition-colors"
              >
                <span class="text-red-500 mr-3 mt-1 text-xs">●</span>
                tour.welcomemanado@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div class="mt-12">
          <!-- Member Of Section -->
          <div class="py-12 w-full">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3
                class="text-center text-gray-400 text-sm md:text-base font-medium tracking-[0.2em] mb-10"
              >
                ~ Member Of ~
              </h3>
              <div
                class="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-32 opacity-90 transition-opacity duration-300"
              >
                <a
                  href="https://www.iintoa.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:scale-105 hover:opacity-100 transition-all duration-300"
                >
                  <img
                    src="./assets/intoa.jpeg"
                    alt="IINTOA"
                    class="h-14 md:h-16 object-contain mix-blend-multiply"
                  />
                </a>
                <a
                  href="https://asita.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:scale-105 hover:opacity-100 transition-all duration-300"
                >
                  <img
                    src="https://asita.id/wp-content/uploads/2019/07/Logo-ASITA-Background-Putih_HAKI_2.png"
                    alt="ASITA"
                    class="h-16 md:h-20 object-contain mix-blend-multiply"
                  />
                </a>
                <a
                  href="https://astindo.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:scale-105 hover:opacity-100 transition-all duration-300"
                >
                  <img
                    src="https://astindo.org/wp-content/uploads/2024/09/LOGO-ASTINDO-500.png"
                    alt="ASTINDO"
                    class="h-14 md:h-16 object-contain mix-blend-multiply"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          class="mt-12 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs font-bold tracking-widest uppercase"
        >
          <p>&copy; 2026 WelcomeManado. {{ $t("footer.rights") }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { watch } from "vue";
import { useI18n } from "vue-i18n";
import Navbar from "./components/Navbar.vue";
import { useDarkMode } from "./composables/useDarkMode";

const { isDark } = useDarkMode();
const { locale } = useI18n();

watch(
  locale,
  (value) => {
    const langMap = {
      id: "id",
      en: "en",
      ko: "ko",
      zh: "zh-CN",
    };
    document.documentElement.lang = langMap[value] || "en";
  },
  { immediate: true },
);
</script>

<style>
@import "./style.css";
html {
  scroll-behavior: smooth;
}
body {
  font-family: "Inter", sans-serif;
}
</style>
