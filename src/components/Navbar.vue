<template>
  <nav
    class="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
    :class="[
      isScrolled
        ? 'bg-white/90 backdrop-blur-md shadow-lg py-3'
        : 'bg-transparent py-6',
    ]"
  >
    <div class="w-full mx-auto px-6 lg:px-10 max-w-[90rem]">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center lg:mr-8 xl:mr-12">
          <router-link to="/" class="group flex items-center space-x-2">
            <div
              class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:rotate-12 transition-transform duration-300"
            >
              <Palmtree class="w-6 h-6 text-white" />
            </div>
            <span
              class="text-2xl font-black tracking-tighter transition-colors"
              :class="isScrolled ? 'text-slate-900' : 'text-white'"
            >
              Welcome<span class="text-blue-600">Manado</span>
            </span>
          </router-link>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden lg:flex lg:items-center lg:space-x-5 xl:space-x-8">
          <router-link
            to="/"
            class="text-[13px] font-bold tracking-wide uppercase transition-colors whitespace-nowrap"
            :class="
              isScrolled
                ? 'text-slate-600 hover:text-blue-600'
                : 'text-white/90 hover:text-white'
            "
            >{{ $t("nav.home") }}</router-link
          >

          <!-- Dropdowns -->
          <div
            v-for="menu in menuItems"
            :key="menu.title"
            class="relative group whitespace-nowrap"
          >
            <button
              class="flex items-center text-[13px] font-bold tracking-wide uppercase transition-colors whitespace-nowrap"
              :class="
                isScrolled
                  ? 'text-slate-600 hover:text-blue-600'
                  : 'text-white/90 hover:text-white'
              "
            >
              {{ $t("nav." + menu.key) }}
              <ChevronDown
                class="ml-1 h-3.5 w-3.5 opacity-50 group-hover:rotate-180 transition-transform duration-300"
              />
            </button>

            <div
              class="absolute left-1/2 -translate-x-1/2 mt-4 w-60 bg-white rounded-3xl shadow-2xl shadow-blue-900/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-4 border border-slate-50 overflow-hidden"
            >
              <div class="p-3 grid gap-1">
                <router-link
                  v-for="cat in menu.categories"
                  :key="cat.id"
                  :to="'/category/' + cat.slug"
                  class="flex items-center px-4 py-3.5 text-[13px] font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-2xl transition-all whitespace-normal"
                >
                  <div
                    class="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center mr-3 group-hover:bg-white transition-colors shrink-0"
                  >
                    <MapPin class="w-4 h-4" />
                  </div>
                  {{ cat.name }}
                </router-link>
              </div>
            </div>
          </div>

          <router-link
            to="/hotels"
            class="text-[13px] font-bold tracking-wide uppercase transition-colors whitespace-nowrap"
            :class="
              isScrolled
                ? 'text-slate-600 hover:text-blue-600'
                : 'text-white/90 hover:text-white'
            "
            >{{ $t("nav.hotels") }}</router-link
          >

          <!-- Travel Info Dropdown -->
          <div class="relative group whitespace-nowrap">
            <button
              class="flex items-center text-[13px] font-bold tracking-wide uppercase transition-colors whitespace-nowrap"
              :class="
                isScrolled
                  ? 'text-slate-600 hover:text-blue-600'
                  : 'text-white/90 hover:text-white'
              "
            >
              {{ $t("nav.travelInfo") }}
              <ChevronDown
                class="ml-1 h-3.5 w-3.5 opacity-50 group-hover:rotate-180 transition-transform duration-300"
              />
            </button>

            <div
              class="absolute left-1/2 -translate-x-1/2 mt-4 w-60 bg-white rounded-3xl shadow-2xl shadow-blue-900/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-4 border border-slate-50 overflow-hidden"
            >
              <div class="p-3 grid gap-1">
                <router-link
                  v-for="(item, index) in travelInfoMenu"
                  :key="index"
                  :to="item.path"
                  class="flex items-center px-4 py-3.5 text-[13px] font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-2xl transition-all whitespace-normal"
                >
                  <div
                    class="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center mr-3 group-hover:bg-white transition-colors shrink-0"
                  >
                    <Compass class="w-4 h-4" />
                  </div>
                  {{ $t("nav." + item.key) }}
                </router-link>
              </div>
            </div>
          </div>

          <router-link
            to="/about"
            class="text-[13px] font-bold tracking-wide uppercase transition-colors whitespace-nowrap"
            :class="
              isScrolled
                ? 'text-slate-600 hover:text-blue-600'
                : 'text-white/90 hover:text-white'
            "
            >{{ $t("nav.about") }}</router-link
          >

          <router-link
            to="/contact"
            class="px-7 py-2.5 bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95 whitespace-nowrap shrink-0"
            >{{ $t("nav.contact") }}</router-link
          >

          <!-- Language Switcher -->
          <div class="relative group whitespace-nowrap ml-2">
            <button
              class="flex items-center px-3 py-1.5 rounded-xl border transition-all"
              :class="
                isScrolled
                  ? 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  : 'border-white/20 text-white hover:bg-white/10'
              "
            >
              <Languages class="w-4 h-4 mr-1.5" />
              <span class="text-[11px] font-black uppercase tracking-widest">{{
                currentLocaleLabel
              }}</span>
              <ChevronDown
                class="ml-1 h-3 w-3 opacity-50 group-hover:rotate-180 transition-transform duration-300"
              />
            </button>

            <div
              class="absolute right-0 mt-4 w-40 bg-white rounded-2xl shadow-2xl shadow-blue-900/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-4 border border-slate-50 overflow-hidden"
            >
              <div class="p-2 grid gap-1">
                <button
                  v-for="lang in availableLanguages"
                  :key="lang.code"
                  @click="changeLanguage(lang.code)"
                  class="flex items-center px-4 py-2.5 text-[11px] font-bold rounded-xl transition-all"
                  :class="
                    locale === lang.code
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50'
                  "
                >
                  <span class="mr-2 text-base">{{ lang.flag }}</span>
                  {{ lang.name }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Toggle Button -->
        <div class="lg:hidden flex items-center">
          <button
            @click="isMobileMenuOpen = true"
            class="p-3 rounded-2xl transition-all duration-300 active:scale-90"
            :class="
              isScrolled
                ? 'bg-slate-100 text-slate-900'
                : 'bg-white/10 text-white backdrop-blur-md'
            "
          >
            <Menu class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Drawer (Teleport to Body for better Z-index handling) -->
    <Teleport to="body">
      <div v-if="isMobileMenuOpen" class="fixed inset-0 z-[1000] lg:hidden">
        <!-- Backdrop -->
        <transition
          enter-active-class="transition duration-500 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition duration-300 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          appear
        >
          <div
            @click="isMobileMenuOpen = false"
            class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          ></div>
        </transition>

        <!-- Drawer Panel -->
        <transition
          enter-active-class="transition duration-500 ease-out"
          enter-from-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition duration-300 ease-in"
          leave-from-class="translate-x-0"
          leave-to-class="translate-x-full"
          appear
        >
          <div
            class="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col overflow-hidden"
          >
            <!-- Header -->
            <div
              class="p-6 flex items-center justify-between border-b border-slate-50"
            >
              <div class="flex items-center space-x-2">
                <div
                  class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"
                >
                  <Palmtree class="w-5 h-5 text-white" />
                </div>
                <span class="text-xl font-black text-slate-900 tracking-tighter"
                  >Menu</span
                >
              </div>
              <button
                @click="isMobileMenuOpen = false"
                class="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X class="w-6 h-6" />
              </button>
            </div>

            <!-- Content -->
            <div class="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div class="space-y-10">
                <!-- Primary Links -->
                <div class="grid gap-6">
                  <router-link
                    to="/"
                    @click="isMobileMenuOpen = false"
                    class="text-2xl font-black text-slate-900 hover:text-blue-600 transition-colors"
                    >Home</router-link
                  >
                  <router-link
                    to="/about"
                    @click="isMobileMenuOpen = false"
                    class="text-2xl font-black text-slate-900 hover:text-blue-600 transition-colors"
                    >About Us</router-link
                  >
                  <router-link
                    to="/contact"
                    @click="isMobileMenuOpen = false"
                    class="text-2xl font-black text-slate-900 hover:text-blue-600 transition-colors"
                    >Contact</router-link
                  >
                </div>

                <!-- Category Groups -->
                <div
                  v-for="menu in menuItems"
                  :key="menu.title"
                  class="space-y-4 pt-8 border-t border-slate-100"
                >
                  <div class="flex items-center space-x-2">
                    <div class="w-6 h-0.5 bg-blue-600 rounded-full"></div>
                    <span
                      class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                      >{{ $t("nav." + menu.key) }}</span
                    >
                  </div>
                  <div class="grid gap-3">
                    <router-link
                      v-for="cat in menu.categories"
                      :key="cat.id"
                      :to="'/category/' + cat.slug"
                      @click="isMobileMenuOpen = false"
                      class="flex items-center p-4 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-all group"
                    >
                      <div
                        class="w-10 h-10 rounded-xl bg-white flex items-center justify-center mr-4 shadow-sm group-hover:scale-110 transition-transform"
                      >
                        <MapPin class="w-5 h-5 text-blue-600" />
                      </div>
                      <span
                        class="font-bold text-slate-700 group-hover:text-blue-600 transition-colors"
                        >{{ cat.name }}</span
                      >
                    </router-link>
                  </div>
                </div>

                <!-- Travel Info Group -->
                <div class="space-y-4 pt-8 border-t border-slate-100">
                  <div class="flex items-center space-x-2">
                    <div class="w-6 h-0.5 bg-blue-600 rounded-full"></div>
                    <span
                      class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                      >{{ $t("nav.travelInfo") }}</span
                    >
                  </div>
                  <div class="grid gap-3">
                    <router-link
                      v-for="(item, index) in travelInfoMenu"
                      :key="index"
                      :to="item.path"
                      @click="isMobileMenuOpen = false"
                      class="flex items-center p-4 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-all group"
                    >
                      <div
                        class="w-10 h-10 rounded-xl bg-white flex items-center justify-center mr-4 shadow-sm group-hover:scale-110 transition-transform p-2 shrink-0"
                      >
                        <Compass class="w-full h-full text-blue-600" />
                      </div>
                      <span
                        class="font-bold text-slate-700 group-hover:text-blue-600 transition-colors text-left"
                        >{{ $t("nav." + item.key) }}</span
                      >
                    </router-link>
                  </div>
                </div>

                <!-- Hotels Menu -->
                <div class="space-y-4 pt-8 border-t border-slate-100">
                  <div class="flex items-center space-x-2">
                    <div class="w-6 h-0.5 bg-blue-600 rounded-full"></div>
                    <span
                      class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                      >Hotels in Manado</span
                    >
                  </div>
                  <div class="grid gap-3">
                    <router-link
                      to="/hotels"
                      @click="isMobileMenuOpen = false"
                      class="flex items-center p-4 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-all group"
                    >
                      <div
                        class="w-10 h-10 rounded-xl bg-white flex items-center justify-center mr-4 shadow-sm group-hover:scale-110 transition-transform shrink-0"
                      >
                        <Building class="w-5 h-5 text-blue-600" />
                      </div>
                      <span
                        class="font-bold text-slate-700 group-hover:text-blue-600 transition-colors"
                        >{{ $t("nav.hotels") }}</span
                      >
                    </router-link>
                  </div>
                </div>

                <!-- Language Selection (Mobile) -->
                <div class="space-y-4 pt-8 border-t border-slate-100">
                  <div class="flex items-center space-x-2">
                    <div class="w-6 h-0.5 bg-blue-600 rounded-full"></div>
                    <span
                      class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                      >Select Language</span
                    >
                  </div>
                  <div class="grid grid-cols-2 gap-3 pb-8">
                    <button
                      v-for="lang in availableLanguages"
                      :key="lang.code"
                      @click="changeLanguage(lang.code)"
                      class="flex items-center p-3 rounded-2xl transition-all"
                      :class="
                        locale === lang.code
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      "
                    >
                      <span class="mr-2 text-lg">{{ lang.flag }}</span>
                      <span class="text-[11px] font-bold">{{ lang.name }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="p-8 border-t border-slate-50 bg-slate-50/50">
              <router-link
                to="/contact"
                @click="isMobileMenuOpen = false"
                class="w-full flex items-center justify-center py-5 bg-blue-600 text-white font-black rounded-2xl shadow-lg shadow-blue-600/20 uppercase tracking-widest text-xs"
              >
                Book Your Adventure
              </router-link>
            </div>
          </div>
        </transition>
      </div>
    </Teleport>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import {
  ChevronDown,
  Menu,
  X,
  Palmtree,
  MapPin,
  Building,
  Compass,
  Languages,
} from "lucide-vue-next";
import { useI18n } from "vue-i18n";
import { getCategories } from "../services/api";
import { autoTranslate } from "../services/translate";
import api from "../services/api";

const { locale, t } = useI18n();

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const localCategories = ref([]);
const nationalCategories = ref([]);
const internationalCategories = ref([]);

const availableLanguages = [
  { code: "id", name: "Bahasa", flag: "🇮🇩" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
];

const currentLocaleLabel = computed(() => {
  const lang = availableLanguages.find((l) => l.code === locale.value);
  return lang ? lang.code : locale.value;
});

const changeLanguage = (code) => {
  locale.value = code;
  localStorage.setItem("locale", code);
};

const menuItems = ref([
  { title: "Local Tours", key: "localTours", categories: localCategories },
  { title: "National", key: "national", categories: nationalCategories },
  {
    title: "International",
    key: "international",
    categories: internationalCategories,
  },
]);

const travelInfoMenu = [
  { name: "Manado Guide", key: "guide", path: "/travel-info" },
  {
    name: "History & Culture in Manado",
    key: "history",
    path: "/travel-info/history-culture",
  },
  {
    name: "Transportation in Manado",
    key: "transport",
    path: "/travel-info/transportation",
  },
  {
    name: "Shopping in Manado",
    key: "shopping",
    path: "/travel-info/shopping",
  },
  {
    name: "Food & Cuisine in Manado",
    key: "food",
    path: "/travel-info/food-cuisine",
  },
];

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
  fetchCategories();
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

const fetchCategories = async () => {
  try {
    const response = await getCategories();
    let categories = response.data.data;

    // Auto translate category names if not in Indonesian
    if (locale.value !== "id") {
      categories = await Promise.all(
        categories.map(async (c) => {
          const translatedName = await autoTranslate(c.name, locale.value);
          return { ...c, name: translatedName };
        }),
      );
    }

    // Local: ID 1, 2, 3
    localCategories.value = categories.filter((c) => [1, 2, 3].includes(c.id));
    // National: ID 4, 5, 6
    nationalCategories.value = categories.filter((c) =>
      [4, 5, 6].includes(c.id),
    );
    // International: ID 7, 8, 9
    internationalCategories.value = categories.filter((c) =>
      [7, 8, 9].includes(c.id),
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

watch(locale, fetchCategories);
</script>

<style scoped>
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
</style>
