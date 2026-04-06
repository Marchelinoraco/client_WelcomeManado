<template>
  <div>
    <Navbar />
    <router-view :key="$route.fullPath"></router-view>

    <!-- Footer -->
    <footer class="bg-gray-950 text-white py-24 border-t border-gray-900">
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
              <div
                class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer text-xs font-bold"
              >
                IG
              </div>
              <div
                class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer text-xs font-bold"
              >
                FB
              </div>
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
                <span class="text-red-500 mr-3 mt-1 text-xs">●</span> Manado,
                North Sulawesi, Indonesia
              </p>
              <p class="flex items-start">
                <span class="text-red-500 mr-3 mt-1 text-xs">●</span> +62
                821-7373-8822
              </p>
              <p class="flex items-start">
                <span class="text-red-500 mr-3 mt-1 text-xs">●</span>
                info@welcomemanado.com
              </p>
            </div>
          </div>
        </div>
        <div
          class="mt-24 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs font-bold tracking-widest uppercase"
        >
          <p>&copy; 2026 WelcomeManado. {{ $t("footer.rights") }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
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
