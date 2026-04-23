<template>
  <nav
    class="fixed top-0 left-0 right-0 z-[100] transition-all duration-700"
    :class="[
      isScrolled
        ? 'bg-white/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.03)] py-3 border-b border-slate-100/50'
        : 'bg-gradient-to-b from-slate-950/35 via-slate-900/15 to-transparent py-6',
    ]"
  >
    <div class="w-full mx-auto px-4 lg:px-6 xl:px-4 max-w-[95rem]">
      <div class="flex justify-between items-center h-14 w-full">
        <!-- Logo Section -->
        <div class="flex-shrink-0 flex justify-start items-center lg:mr-4">
          <router-link to="/" class="group flex items-center space-x-3">
            <div
              class="w-10 h-10 lg:w-11 lg:h-11 rounded-2xl overflow-hidden shadow-xl group-hover:rotate-[15deg] transition-all duration-500 ease-spring ring-1 bg-black"
              :class="[
                isScrolled
                  ? 'ring-slate-200/60 shadow-slate-900/10'
                  : 'ring-white/20 shadow-red-900/20',
              ]"
            >
              <img
                src="@/assets/logo.png"
                alt="WelcomeManado"
                class="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div class="flex flex-col">
              <span
                class="text-lg lg:text-xl font-black tracking-tighter leading-none transition-colors"
                :class="isScrolled ? 'text-slate-900' : 'text-white'"
              >
                Welcome<span class="text-red-600">Manado</span>
              </span>
              <span
                class="text-[9px] font-black uppercase tracking-[0.4em] mt-1.5 opacity-60 transition-colors"
                :class="isScrolled ? 'text-slate-500' : 'text-white/80'"
              >
                Tour & Travel
              </span>
            </div>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden xl:flex flex-1 justify-center items-center space-x-1 lg:space-x-1.5">
          <!-- Home Link -->
          <router-link
            to="/"
            class="px-1.5 lg:px-2.5 py-2 text-[10px] lg:text-[11px] font-bold tracking-normal uppercase transition-all rounded-xl hover:bg-slate-100/50 whitespace-nowrap"
            :class="
              isScrolled
                ? 'text-slate-600 hover:text-red-600'
                : 'text-white/90 hover:text-white hover:bg-white/10'
            "
            >{{ $t("nav.home") }}</router-link
          >

          <router-link
            to="/manado-tours"
            class="px-1.5 lg:px-2.5 py-2 text-[10px] lg:text-[11px] font-bold tracking-normal uppercase transition-all rounded-xl hover:bg-slate-100/50 whitespace-nowrap"
            :class="
              isScrolled
                ? 'text-slate-600 hover:text-red-600'
                : 'text-white/90 hover:text-white hover:bg-white/10'
            "
            >{{ $t("nav.localTours") }}</router-link
          >

          <router-link
            to="/nasional"
            class="px-1.5 lg:px-2.5 py-2 text-[10px] lg:text-[11px] font-bold tracking-normal uppercase transition-all rounded-xl hover:bg-slate-100/50 whitespace-nowrap"
            :class="
              isScrolled
                ? 'text-slate-600 hover:text-red-600'
                : 'text-white/90 hover:text-white hover:bg-white/10'
            "
            >{{ $t("nav.national") }}</router-link
          >

          <router-link
            to="/internasional"
            class="px-1.5 lg:px-2.5 py-2 text-[10px] lg:text-[11px] font-bold tracking-normal uppercase transition-all rounded-xl hover:bg-slate-100/50 whitespace-nowrap"
            :class="
              isScrolled
                ? 'text-slate-600 hover:text-red-600'
                : 'text-white/90 hover:text-white hover:bg-white/10'
            "
            >{{ $t("nav.international") }}</router-link
          >

          <!-- Hotels -->
          <router-link
            to="/hotels"
            class="px-1.5 lg:px-2.5 py-2 text-[10px] lg:text-[11px] font-bold tracking-normal uppercase transition-all rounded-xl hover:bg-slate-100/50 whitespace-nowrap"
            :class="
              isScrolled
                ? 'text-slate-600 hover:text-red-600'
                : 'text-white/90 hover:text-white hover:bg-white/10'
            "
            >{{ $t("nav.hotels") }}</router-link
          >

          <!-- Gallery -->
          <router-link
            to="/gallery"
            class="px-1.5 lg:px-2.5 py-2 text-[10px] lg:text-[11px] font-bold tracking-normal uppercase transition-all rounded-xl hover:bg-slate-100/50 whitespace-nowrap"
            :class="
              isScrolled
                ? 'text-slate-600 hover:text-red-600'
                : 'text-white/90 hover:text-white hover:bg-white/10'
            "
            >{{ $t("nav.gallery") }}</router-link
          >

          <router-link
            to="/travel-info"
            class="px-1.5 lg:px-2.5 py-2 text-[10px] lg:text-[11px] font-bold tracking-normal uppercase transition-all rounded-xl hover:bg-slate-100/50 whitespace-nowrap"
            :class="
              isScrolled
                ? 'text-slate-600 hover:text-red-600'
                : 'text-white/90 hover:text-white hover:bg-white/10'
            "
            >{{ $t("nav.travelInfo") }}</router-link
          >

          <router-link
            to="/about"
            class="px-1.5 lg:px-2.5 py-2 text-[10px] lg:text-[11px] font-bold tracking-normal uppercase transition-all rounded-xl hover:bg-slate-100/50 whitespace-nowrap"
            :class="
              isScrolled
                ? 'text-slate-600 hover:text-red-600'
                : 'text-white/90 hover:text-white hover:bg-white/10'
            "
            >{{ $t("nav.about") }}</router-link
          >
        </div>

        <!-- Right Side Utility -->
        <div class="hidden xl:flex flex-shrink-0 justify-end items-center">
          <div
            class="flex items-center space-x-2 lg:space-x-3 ml-3 border-l border-slate-200/20 pl-3"
          >
          <!-- Dark Mode Toggle -->
          <button
            @click="toggleDarkMode"
            class="theme-toggle w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center transition-all rounded-xl border hover:shadow-lg active:scale-95"
            :class="
              isScrolled
                ? 'border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:bg-white dark:hover:bg-slate-700'
                : 'border-white/10 bg-white/5 text-white hover:bg-white/10 backdrop-blur-md'
            "
            :title="
              isDark
                ? $t('navbar.toggleLightMode')
                : $t('navbar.toggleDarkMode')
            "
          >
            <Sun v-if="isDark" class="w-[18px] h-[18px] theme-toggle-icon" />
            <Moon v-else class="w-[18px] h-[18px] theme-toggle-icon" />
          </button>

          <!-- Language Selector -->
          <div class="relative group/lang">
            <button
              class="w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center transition-all rounded-xl border hover:shadow-lg active:scale-95"
              :class="
                isScrolled
                  ? 'border-slate-100 bg-slate-50 text-slate-600 hover:bg-white'
                  : 'border-white/10 bg-white/5 text-white hover:bg-white/10 backdrop-blur-md'
              "
            >
              <Languages class="w-[18px] h-[18px]" />
            </button>

            <div
              class="absolute right-0 top-full pt-3 w-48 opacity-0 invisible group-hover/lang:opacity-100 group-hover/lang:visible transition-all duration-500 transform group-hover/lang:translate-y-0 translate-y-4"
            >
              <div
                class="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-50 p-2 grid gap-1"
              >
                <button
                  v-for="lang in availableLanguages"
                  :key="lang.code"
                  @click="changeLanguage(lang.code)"
                  class="flex items-center justify-between px-5 py-3.5 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all"
                  :class="
                    locale === lang.code
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                      : 'text-slate-600 hover:bg-slate-50'
                  "
                >
                  <div class="flex items-center">
                    <span class="mr-3 text-lg">{{ lang.flag }}</span>
                    {{ lang.name }}
                  </div>
                  <div
                    v-if="locale === lang.code"
                    class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"
                  ></div>
                </button>
              </div>
            </div>
          </div>

          <!-- Contact Button -->
          <router-link
            to="/contact"
            class="px-4 lg:px-5 py-2 lg:py-2.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 hover:shadow-red-600/30 hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
          >
            {{ $t("nav.contact") }}
          </router-link>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="xl:hidden flex items-center">
          <button
            @click="isMobileMenuOpen = true"
            class="w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 active:scale-90"
            :class="
              isScrolled
                ? 'bg-red-50 text-red-600'
                : 'bg-white/10 text-white backdrop-blur-md border border-white/20'
            "
          >
            <Menu class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Drawer -->
    <Teleport to="body">
      <div v-if="isMobileMenuOpen" class="fixed inset-0 z-[1000] xl:hidden">
        <!-- Backdrop -->
        <transition
          enter-active-class="transition duration-700 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition duration-500 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          appear
        >
          <div
            @click="isMobileMenuOpen = false"
            class="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          ></div>
        </transition>

        <!-- Drawer Panel -->
        <transition
          enter-active-class="transition duration-700 ease-spring"
          enter-from-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition duration-500 ease-in"
          leave-from-class="translate-x-0"
          leave-to-class="translate-x-full"
          appear
        >
          <div
            class="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-slate-900 shadow-2xl flex flex-col overflow-hidden rounded-l-[3rem]"
          >
            <!-- Header -->
            <div
              class="p-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800"
            >
              <div class="flex items-center space-x-3">
                <div
                  class="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-200 dark:shadow-red-900/30"
                >
                  <Palmtree class="w-5 h-5 text-white" />
                </div>
                <span class="text-xl font-black text-slate-900 dark:text-white tracking-tighter"
                  >{{ $t("navbar.explore") }}</span
                >
              </div>
              <button
                @click="isMobileMenuOpen = false"
                class="w-10 h-10 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-white transition-colors"
              >
                <X class="w-5 h-5" />
              </button>
            </div>

            <!-- Scrollable Content -->
            <div class="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <div class="space-y-6">
                <!-- Main Links -->
                <div class="grid gap-3">
                  <router-link
                    v-for="link in [
                      { to: '/', label: $t('nav.home') },
                      { to: '/manado-tours', label: $t('nav.localTours') },
                      { to: '/nasional', label: $t('nav.national') },
                      { to: '/internasional', label: $t('nav.international') },
                      { to: '/gallery', label: $t('nav.gallery') },
                      { to: '/hotels', label: $t('nav.hotels') },
                      { to: '/travel-info', label: $t('nav.travelInfo') },
                      { to: '/about', label: $t('nav.about') },
                    ]"
                    :key="link.to"
                    :to="link.to"
                    @click="isMobileMenuOpen = false"
                    class="text-xl font-black text-slate-900 dark:text-white hover:text-red-600 dark:hover:text-red-500 transition-colors tracking-tight"
                  >
                    {{ link.label }}
                  </router-link>
                </div>

                <!-- Dark Mode Toggle (Mobile) -->
                <div class="space-y-4 pt-8 border-t border-slate-100 dark:border-slate-700">
                  <span
                    class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"
                    >{{ $t("navbar.appearance") }}</span
                  >
                  <button
                    @click="toggleDarkMode"
                    class="w-full flex items-center justify-between p-4 rounded-2xl border transition-all"
                    :class="
                      isDark
                        ? 'bg-slate-800 text-yellow-400 border-slate-700'
                        : 'bg-slate-50 text-slate-600 border-slate-100'
                    "
                  >
                    <div class="flex items-center">
                      <div
                        class="w-9 h-9 rounded-xl flex items-center justify-center mr-4 transition-all"
                        :class="isDark ? 'bg-slate-700' : 'bg-white shadow-sm'"
                      >
                        <Sun v-if="isDark" class="w-5 h-5 text-yellow-400" />
                        <Moon v-else class="w-5 h-5 text-slate-500" />
                      </div>
                      <span class="font-bold">
                        {{ isDark ? $t("navbar.lightMode") : $t("navbar.darkMode") }}
                      </span>
                    </div>
                    <div
                      class="w-12 h-7 rounded-full p-1 transition-colors"
                      :class="isDark ? 'bg-yellow-500' : 'bg-slate-300'"
                    >
                      <div
                        class="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform"
                        :class="isDark ? 'translate-x-5' : 'translate-x-0'"
                      ></div>
                    </div>
                  </button>
                </div>

                <!-- Language Selector (Mobile) -->
                <div class="space-y-4 pt-8 border-t border-slate-100 dark:border-slate-700 pb-10">
                  <span
                    class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"
                    >{{ $t("navbar.selectLanguage") }}</span
                  >
                  <div class="grid grid-cols-2 gap-3">
                    <button
                      v-for="lang in availableLanguages"
                      :key="lang.code"
                      @click="changeLanguage(lang.code)"
                      class="flex items-center p-4 rounded-2xl border transition-all"
                      :class="
                        locale === lang.code
                          ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-200'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-100 dark:border-slate-700'
                      "
                    >
                      <span class="mr-2 text-lg">{{ lang.flag }}</span>
                      <span class="text-[11px] font-bold">{{ lang.name }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mobile Footer -->
            <div class="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
              <router-link
                to="/contact"
                @click="isMobileMenuOpen = false"
                class="w-full flex items-center justify-center py-4 bg-red-600 text-white font-black rounded-2xl shadow-xl shadow-red-600/20 dark:shadow-red-900/30 uppercase tracking-widest text-xs active:scale-95 transition-all"
              >
                {{ $t("navbar.bookAdventure") }}
              </router-link>
            </div>
          </div>
        </transition>
      </div>
    </Teleport>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import {
  ChevronRight,
  Menu,
  Palmtree,
  X,
  Languages,
  Sun,
  Moon,
} from "lucide-vue-next";
import { useI18n } from "vue-i18n";
import { useDarkMode } from "../composables/useDarkMode";

const { locale, t } = useI18n();
const { isDark, toggle: toggleDarkMode } = useDarkMode();

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const availableLanguages = [
  { code: "id", name: "Bahasa", flag: "🇮🇩" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
];

const changeLanguage = (code) => {
  locale.value = code;
  localStorage.setItem("locale", code);
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

// Initialize locale from localStorage
onMounted(() => {
  const savedLocale = localStorage.getItem("locale");
  if (savedLocale && availableLanguages.some((l) => l.code === savedLocale)) {
    locale.value = savedLocale;
  }
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  document.body.style.overflow = "";
});

// Body lock when mobile menu is open
watch(isMobileMenuOpen, (val) => {
  if (val) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});
</script>

<style scoped>
.ease-spring {
  transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}

.animate-fade-in {
  animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
