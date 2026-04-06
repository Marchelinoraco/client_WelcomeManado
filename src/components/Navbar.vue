<template>
  <nav
    class="fixed top-0 left-0 right-0 z-[100] transition-all duration-700"
    :class="[
      isScrolled
        ? 'bg-white/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.03)] py-3 border-b border-slate-100/50'
        : 'bg-transparent py-6',
    ]"
  >
    <div class="w-full mx-auto px-6 lg:px-10 max-w-[95rem]">
      <div class="flex justify-between items-center h-16">
        <!-- Logo Section -->
        <div class="flex-shrink-0 flex items-center lg:mr-8">
          <router-link to="/" class="group flex items-center space-x-3">
            <div
              class="w-11 h-11 rounded-2xl overflow-hidden shadow-xl group-hover:rotate-[15deg] transition-all duration-500 ease-spring ring-1"
              :class="[
                isScrolled
                  ? 'bg-gradient-to-br from-slate-900 to-slate-700 ring-slate-200/60 shadow-slate-900/10'
                  : 'bg-white/10 backdrop-blur-md ring-white/20 shadow-red-900/20',
              ]"
            >
              <svg
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                class="w-full h-full"
                aria-label="WelcomeManado"
                role="img"
              >
                <path
                  d="M12 18 L26 82 L42 46 L56 82 L70 18 L57 18 L50 55 L42 18 L34 55 L27 18 Z"
                  fill="#DC2626"
                  stroke="rgba(255,255,255,0.9)"
                  stroke-width="2.5"
                  stroke-linejoin="round"
                />
                <path
                  d="M32 86 L32 44 L44 44 L50 58 L56 44 L68 44 L68 86 L56 86 L56 62 L50 72 L44 62 L44 86 Z"
                  fill="#F8FAFC"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div class="flex flex-col">
              <span
                class="text-2xl font-black tracking-tighter leading-none transition-colors"
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
        <div class="hidden lg:flex lg:items-center lg:space-x-1 xl:space-x-3">
          <!-- Home Link -->
          <router-link
            to="/"
            class="px-4 py-2 text-[13px] font-bold tracking-wide uppercase transition-all rounded-xl hover:bg-slate-100/50 whitespace-nowrap"
            :class="
              isScrolled
                ? 'text-slate-600 hover:text-red-600'
                : 'text-white/90 hover:text-white hover:bg-white/10'
            "
            >{{ $t("nav.home") }}</router-link
          >

          <!-- Tour Dropdowns -->
          <div
            v-for="menu in menuItems"
            :key="menu.title"
            class="relative group whitespace-nowrap"
          >
            <button
              class="px-4 py-2 flex items-center text-[13px] font-bold tracking-wide uppercase transition-all rounded-xl hover:bg-slate-100/50 whitespace-nowrap group-hover:text-red-600"
              :class="
                isScrolled
                  ? 'text-slate-600'
                  : 'text-white/90 group-hover:bg-white/10'
              "
            >
              {{ $t("nav." + menu.key) }}
              <ChevronDown
                class="ml-1.5 h-3.5 w-3.5 opacity-50 group-hover:rotate-180 transition-transform duration-500"
              />
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="menu.categories?.length"
              class="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform group-hover:translate-y-0 translate-y-4 pointer-events-none group-hover:pointer-events-auto"
            >
              <div
                class="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-50 p-3 flex overflow-visible min-w-[300px]"
              >
                <!-- Local Tours with Sub-menu -->
                <div v-if="menu.key === 'localTours'" class="flex w-full">
                  <div class="w-full grid gap-1">
                    <div
                      v-for="cat in menu.categories"
                      :key="cat.id"
                      class="relative group/cat"
                    >
                      <router-link
                        :to="'/category/' + cat.slug"
                        class="flex items-center justify-between px-5 py-4 text-[13px] font-bold text-slate-600 hover:bg-red-50/50 hover:text-red-600 rounded-2xl transition-all group/item"
                      >
                        <div class="flex items-center">
                          <div
                            class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mr-4 group-hover/item:bg-white group-hover/item:shadow-sm transition-all shrink-0"
                          >
                            <MapPin
                              class="w-4 h-4 text-slate-400 group-hover/item:text-red-600"
                            />
                          </div>
                          {{ cat.name }}
                        </div>
                        <ChevronRight
                          v-if="getToursByCategory(cat.id).length"
                          class="w-4 h-4 opacity-50 text-slate-300 group-hover/cat:opacity-100 group-hover/cat:translate-x-1 transition-all"
                        />
                      </router-link>

                      <!-- Sub-menu (Desktop) -->
                      <div
                        v-if="getToursByCategory(cat.id).length"
                        class="absolute left-full top-0 pl-4 opacity-0 invisible group-hover/cat:opacity-100 group-hover/cat:visible transition-all duration-300 transform translate-x-4 group-hover/cat:translate-x-0 pointer-events-none group-hover/cat:pointer-events-auto"
                      >
                        <div
                          class="w-72 bg-white rounded-[2.5rem] shadow-2xl border border-slate-50 p-4 shadow-red-900/10"
                        >
                          <div
                            class="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-3"
                          >
                            {{ cat.name }} Tours
                          </div>
                          <div
                            class="grid gap-1 max-h-[400px] overflow-y-auto custom-scrollbar"
                          >
                            <router-link
                              v-for="tour in getToursByCategory(cat.id)"
                              :key="tour.id"
                              :to="getTourLink(tour)"
                              class="block px-4 py-3 text-[12.5px] font-bold text-slate-500 hover:text-red-600 hover:bg-red-50/50 rounded-xl transition-all"
                            >
                              {{ tour.title }}
                            </router-link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Standard Dropdown (National/International) -->
                <div v-else class="w-full grid gap-1">
                  <router-link
                    v-for="cat in menu.categories"
                    :key="cat.id"
                    :to="getCategoryLink(menu.key, cat.slug)"
                    class="flex items-center px-5 py-4 text-[13px] font-bold text-slate-600 hover:bg-red-50/50 hover:text-red-600 rounded-2xl transition-all group/item"
                  >
                    <div
                      class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mr-4 group-hover/item:bg-white group-hover/item:shadow-sm transition-all shrink-0"
                    >
                      <MapPin
                        class="w-4 h-4 text-slate-400 group-hover/item:text-red-600"
                      />
                    </div>
                    {{ cat.name }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- Hotels -->
          <router-link
            to="/hotels"
            class="px-4 py-2 text-[13px] font-bold tracking-wide uppercase transition-all rounded-xl hover:bg-slate-100/50 whitespace-nowrap"
            :class="
              isScrolled
                ? 'text-slate-600 hover:text-red-600'
                : 'text-white/90 hover:text-white hover:bg-white/10'
            "
            >{{ $t("nav.hotels") }}</router-link
          >

          <!-- Travel Info -->
          <div class="relative group whitespace-nowrap">
            <button
              class="px-4 py-2 flex items-center text-[13px] font-bold tracking-wide uppercase transition-all rounded-xl hover:bg-slate-100/50 whitespace-nowrap group-hover:text-red-600"
              :class="
                isScrolled
                  ? 'text-slate-600'
                  : 'text-white/90 group-hover:bg-white/10'
              "
            >
              {{ $t("nav.travelInfo") }}
              <ChevronDown
                class="ml-1.5 h-3.5 w-3.5 opacity-50 group-hover:rotate-180 transition-transform duration-500"
              />
            </button>

            <div
              class="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform group-hover:translate-y-0 translate-y-4 pointer-events-none group-hover:pointer-events-auto"
            >
              <div
                class="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-50 p-3 grid gap-1"
              >
                <router-link
                  v-for="(item, index) in travelInfoMenu"
                  :key="index"
                  :to="item.path"
                  class="flex items-center px-5 py-4 text-[13px] font-bold text-slate-600 hover:bg-red-50/50 hover:text-red-600 rounded-2xl transition-all group/item"
                >
                  <div
                    class="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center mr-4 group-hover/item:bg-white group-hover/item:shadow-sm transition-all shrink-0"
                  >
                    <Compass
                      class="w-4 h-4 text-slate-400 group-hover/item:text-red-600"
                    />
                  </div>
                  {{ $t("nav." + item.key) }}
                </router-link>
              </div>
            </div>
          </div>

          <router-link
            to="/about"
            class="px-4 py-2 text-[13px] font-bold tracking-wide uppercase transition-all rounded-xl hover:bg-slate-100/50 whitespace-nowrap"
            :class="
              isScrolled
                ? 'text-slate-600 hover:text-red-600'
                : 'text-white/90 hover:text-white hover:bg-white/10'
            "
            >{{ $t("nav.about") }}</router-link
          >
        </div>

        <!-- Right Side Utility -->
        <div
          class="hidden lg:flex items-center space-x-4 ml-6 pl-6 border-l border-slate-200/20"
        >
          <!-- Language Selector -->
          <div class="relative group/lang">
            <button
              class="w-11 h-11 flex items-center justify-center transition-all rounded-2xl border hover:shadow-lg active:scale-95"
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
            class="px-8 py-3.5 bg-red-600 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 hover:shadow-red-600/30 hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
          >
            {{ $t("nav.contact") }}
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <div class="lg:hidden flex items-center">
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
      <div v-if="isMobileMenuOpen" class="fixed inset-0 z-[1000] lg:hidden">
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
            class="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col overflow-hidden rounded-l-[3rem]"
          >
            <!-- Header -->
            <div
              class="p-8 flex items-center justify-between border-b border-slate-50"
            >
              <div class="flex items-center space-x-3">
                <div
                  class="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-200"
                >
                  <Palmtree class="w-5 h-5 text-white" />
                </div>
                <span class="text-xl font-black text-slate-900 tracking-tighter"
                  >Explore</span
                >
              </div>
              <button
                @click="isMobileMenuOpen = false"
                class="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X class="w-5 h-5" />
              </button>
            </div>

            <!-- Scrollable Content -->
            <div class="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div class="space-y-10">
                <!-- Main Links -->
                <div class="grid gap-5">
                  <router-link
                    v-for="link in [
                      { to: '/', label: 'Home' },
                      { to: '/hotels', label: 'Hotels' },
                      { to: '/about', label: 'About Us' },
                    ]"
                    :key="link.to"
                    :to="link.to"
                    @click="isMobileMenuOpen = false"
                    class="text-2xl font-black text-slate-900 hover:text-red-600 transition-colors tracking-tight"
                  >
                    {{ link.label }}
                  </router-link>
                </div>

                <!-- Categories -->
                <div
                  v-for="menu in menuItems"
                  :key="menu.title"
                  class="space-y-4 pt-8 border-t border-slate-100"
                >
                  <span
                    class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"
                    >{{ $t("nav." + menu.key) }}</span
                  >
                  <div class="grid gap-2">
                    <div
                      v-for="cat in menu.categories"
                      :key="cat.id"
                      class="space-y-2"
                    >
                      <button
                        @click="
                          expandedMobileCategory =
                            expandedMobileCategory === cat.id ? null : cat.id
                        "
                        class="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-red-50 transition-all group"
                      >
                        <div class="flex items-center">
                          <div
                            class="w-9 h-9 rounded-xl bg-white flex items-center justify-center mr-4 shadow-sm group-hover:scale-110 transition-transform"
                          >
                            <MapPin class="w-4 h-4 text-red-600" />
                          </div>
                          <span
                            class="font-bold text-slate-700 group-hover:text-red-600 transition-colors"
                            >{{ cat.name }}</span
                          >
                        </div>
                        <ChevronDown
                          v-if="getToursByCategory(cat.id).length"
                          class="w-4 h-4 text-slate-400 transition-transform duration-500"
                          :class="{
                            'rotate-180': expandedMobileCategory === cat.id,
                          }"
                        />
                      </button>

                      <!-- Sub-tours -->
                      <div
                        v-if="expandedMobileCategory === cat.id"
                        class="pl-12 pr-2 py-2 space-y-2 animate-fade-in"
                      >
                        <router-link
                          v-for="tour in getToursByCategory(cat.id)"
                          :key="tour.id"
                          :to="getTourLink(tour)"
                          @click="isMobileMenuOpen = false"
                          class="block py-2.5 text-[13px] font-bold text-slate-500 hover:text-red-600 transition-colors"
                        >
                          {{ tour.title }}
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Travel Info -->
                <div class="space-y-4 pt-8 border-t border-slate-100">
                  <span
                    class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"
                    >{{ $t("nav.travelInfo") }}</span
                  >
                  <div class="grid gap-2">
                    <router-link
                      v-for="(item, index) in travelInfoMenu"
                      :key="index"
                      :to="item.path"
                      @click="isMobileMenuOpen = false"
                      class="flex items-center p-4 bg-slate-50 rounded-2xl hover:bg-red-50 transition-all group"
                    >
                      <div
                        class="w-9 h-9 rounded-xl bg-white flex items-center justify-center mr-4 shadow-sm group-hover:scale-110 transition-transform"
                      >
                        <Compass class="w-4 h-4 text-red-600" />
                      </div>
                      <span
                        class="font-bold text-slate-700 group-hover:text-red-600 transition-colors"
                        >{{ $t("nav." + item.key) }}</span
                      >
                    </router-link>
                  </div>
                </div>

                <!-- Language Selector (Mobile) -->
                <div class="space-y-4 pt-8 border-t border-slate-100 pb-10">
                  <span
                    class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"
                    >Select Language</span
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
                          : 'bg-slate-50 text-slate-600 border-slate-100'
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
            <div class="p-8 border-t border-slate-50 bg-slate-50/50">
              <router-link
                to="/contact"
                @click="isMobileMenuOpen = false"
                class="w-full flex items-center justify-center py-5 bg-red-600 text-white font-black rounded-2xl shadow-xl shadow-red-600/20 uppercase tracking-widest text-xs active:scale-95 transition-all"
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
  ChevronRight,
  Menu,
  Palmtree,
  X,
  MapPin,
  Building,
  Compass,
  Languages,
  Globe,
} from "lucide-vue-next";
import { useI18n } from "vue-i18n";
import {
  getInternationalRegions,
  getInternationalTours,
  getLocalCategories,
  getLocalTours,
  getNationalCategories,
  getNationalTours,
} from "../services/api";
import { autoTranslate } from "../services/translate";
import { dummyTours, dummyCategories } from "../data/dummyTours";
import {
  dummyLocalCategories,
  dummyLocalTours,
} from "../views/wisatalokal/dummyLocalTours";
import {
  dummyNasionalCategories,
  dummyNasionalTours,
} from "../views/nasional/dummyNasionalTours";
import { dummyInternationalRegions } from "../views/internasional/dummyInternationalTours";

const { locale, t } = useI18n();

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const localCategories = ref([]);
const nationalCategories = ref([]);
const internationalCategories = ref([]);
const localTours = ref([]);
const nationalTours = ref([]);
const internationalTours = ref([]);
const hoveredCategory = ref(null);
const expandedMobileCategory = ref(null);

const getToursByCategory = (categoryId) => {
  const all = [
    ...(localTours.value || []),
    ...(nationalTours.value || []),
    ...(internationalTours.value || []),
  ];
  return all.filter((t) => t.category_id === categoryId).slice(0, 6);
};

const getCategoryLink = (menuKey, slug) => {
  if (menuKey === "national") return `/nasional/${slug}`;
  if (menuKey === "international") return `/internasional/region/${slug}`;
  return `/category/${slug}`;
};

const getTourLink = (tour) => {
  const type = tour?.category?.type;
  if (type === "national") return `/nasional/tour/${tour.slug}`;
  if (type === "international") return `/internasional/tour/${tour.slug}`;
  return `/tour/${tour.slug}`;
};

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

const menuItems = computed(() => [
  {
    title: t("nav.localTours") || "Local Tours",
    key: "localTours",
    categories: localCategories.value,
  },
  {
    title: t("nav.national") || "National",
    key: "national",
    categories: nationalCategories.value,
  },
  {
    title: t("nav.international") || "International",
    key: "international",
    categories: internationalCategories.value,
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
    const [
      localCatRes,
      nationalCatRes,
      internationalCatRes,
      localToursRes,
      nationalToursRes,
      internationalToursRes,
    ] = await Promise.all([
      getLocalCategories(),
      getNationalCategories(),
      getInternationalRegions(),
      getLocalTours(),
      getNationalTours(),
      getInternationalTours(),
    ]);

    let localCats = localCatRes?.data?.data || [];
    let nationalCats = nationalCatRes?.data?.data || [];
    let internationalCats = internationalCatRes?.data?.data || [];

    localTours.value = localToursRes?.data?.data || [];
    nationalTours.value = nationalToursRes?.data?.data || [];
    internationalTours.value = internationalToursRes?.data?.data || [];

    if (locale.value !== "id") {
      localCats = await Promise.all(
        localCats.map(async (c) => ({
          ...c,
          name: await autoTranslate(c.name, locale.value),
        })),
      );
      nationalCats = await Promise.all(
        nationalCats.map(async (c) => ({
          ...c,
          name: await autoTranslate(c.name, locale.value),
        })),
      );
      internationalCats = await Promise.all(
        internationalCats.map(async (c) => ({
          ...c,
          name: await autoTranslate(c.name, locale.value),
        })),
      );
    }

    localCategories.value = localCats;
    nationalCategories.value = nationalCats;
    internationalCategories.value = internationalCats;
  } catch (error) {
    console.error("Error processing categories:", error);
    // Ultimate fallback
    localCategories.value = dummyLocalCategories.filter(
      (c) => c.type === "nature",
    );
    nationalCategories.value = dummyNasionalCategories;
    internationalCategories.value = dummyInternationalRegions;
    localTours.value = dummyLocalTours;
    nationalTours.value = dummyNasionalTours;
    internationalTours.value = dummyTours.filter(
      (t) => t.category?.type === "international",
    );
  }
};

watch(locale, fetchCategories);
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
