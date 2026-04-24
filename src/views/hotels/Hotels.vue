<template>
  <div
    class="selection:bg-red-100 selection:text-red-700 font-sans min-h-screen bg-slate-50"
  >
    <!-- Hero Header -->
    <header
      class="relative pt-40 pb-20 lg:pt-52 lg:pb-32 px-6 lg:px-10 overflow-hidden bg-slate-900"
    >
      <div
        class="absolute inset-0 z-0 scale-105 animate-pulse"
        style="animation-duration: 20s"
      >
        <img
          src="https://images.unsplash.com/photo-1551882547-ff40c0d588fa?auto=format&fit=crop&w=2400&q=80"
          class="w-full h-full object-cover opacity-30"
          :alt="$t('hotelsPage.hero.imageAlt')"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"
        ></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto text-center">
        <div
          class="inline-flex items-center space-x-3 mb-6 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20"
        >
          <Building class="w-4 h-4 text-red-400" />
          <span
            class="text-xs font-black text-white uppercase tracking-[0.3em]"
            >{{ $t("hotelsPage.hero.badge") }}</span
          >
        </div>
        <h1
          class="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-8"
        >
          {{ $t("hotelsPage.hero.title1") }}
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600"
            >{{ $t("hotelsPage.hero.title2") }}</span
          >
        </h1>
        <p
          class="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          {{ $t("hotelsPage.hero.description") }}
        </p>
      </div>
    </header>

    <!-- Content Section -->
    <main class="py-20 lg:py-32 px-6 lg:px-10 max-w-7xl mx-auto">
      <!-- Search & Filter Section -->
      <div class="mb-20 space-y-10">
        <div class="max-w-2xl mx-auto">
          <div class="relative group">
            <div
              class="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none"
            >
              <Search
                class="w-6 h-6 text-slate-400 group-focus-within:text-red-600 transition-colors"
              />
            </div>
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="$t('hotelsPage.search.placeholder')"
              class="w-full pl-16 pr-6 py-5 bg-white border border-slate-200 rounded-[2rem] shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-red-900/10 focus:outline-none focus:ring-4 focus:ring-red-600/10 focus:border-red-600 transition-all text-slate-800 font-medium text-lg placeholder:text-slate-400"
            />
          </div>
        </div>

        <!-- Category Tabs -->
        <div class="flex flex-wrap justify-center gap-3">
          <button
            v-for="cat in hotelCategories"
            :key="cat.key"
            @click="selectedCategory = cat.key"
            class="px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 border"
            :class="
              selectedCategory === cat.key
                ? 'bg-red-600 text-white border-red-600 shadow-xl shadow-red-600/20'
                : 'bg-white text-slate-500 border-slate-200 hover:border-red-600 hover:text-red-600'
            "
          >
            {{ $t(cat.labelKey) }}
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredHotels.length === 0"
        class="text-center py-20 flex flex-col items-center justify-center"
      >
        <div
          class="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Building class="w-10 h-10 text-slate-300" />
        </div>
        <h3 class="text-3xl font-black text-slate-900 mb-3 tracking-tight">
          {{ $t("hotelsPage.empty.title") }}
        </h3>
        <p class="text-slate-500 font-medium text-lg max-w-md">
          {{ $t("hotelsPage.empty.description", { query: searchQuery }) }}
        </p>
      </div>

      <!-- Grid -->
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-10 items-stretch"
      >
        <!-- Hotel Card -->
        <article
          v-for="hotel in filteredHotels"
          :key="hotel.id"
          class="group bg-white rounded-[2.25rem] overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-red-900/10 transition-all duration-500 border border-slate-100 flex h-full flex-col hover:-translate-y-1"
        >
          <div class="relative aspect-[4/3] overflow-hidden">
            <img
              :src="hotel.image"
              :alt="hotel.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              loading="lazy"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"
            ></div>

            <div class="absolute inset-x-0 bottom-0 p-6">
              <div
                class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/55 px-4 py-2 text-white backdrop-blur-md"
              >
                <MapPin class="w-4 h-4 text-red-400" />
                <span class="text-[11px] font-black uppercase tracking-[0.24em]">
                  {{ hotel._location || hotel.location }}
                </span>
              </div>
            </div>

            <div
              class="absolute top-6 right-6 flex items-center gap-2 rounded-full border border-white/70 bg-white/95 px-4 py-2.5 text-slate-950 shadow-xl shadow-slate-950/15 ring-1 ring-slate-900/5 backdrop-blur-md"
            >
              <div
                class="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100"
              >
                <Star class="w-4 h-4 text-amber-500 fill-amber-500" />
              </div>
              <span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                Stars
              </span>
              <span class="font-black text-slate-950 text-base leading-none">{{
                hotel.stars
              }}</span>
            </div>
          </div>

          <div class="p-7 lg:p-8 flex-1 flex flex-col text-left">
            <div class="flex items-center justify-between gap-4 mb-4">
              <span
                class="inline-flex items-center rounded-full bg-red-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-red-600"
              >
                {{ hotel.category }}
              </span>
              <span class="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
                {{ hotel.stars }} {{ hotel.stars > 1 ? "Stars" : "Star" }}
              </span>
            </div>

            <h3
              class="text-2xl font-black text-slate-900 mb-3 leading-tight group-hover:text-red-600 transition-colors"
            >
              {{ hotel.name }}
            </h3>

            <p
              class="hotel-description text-slate-500 text-sm leading-7 mb-8 flex-1 font-medium"
            >
              {{ hotel._descriptionText || hotel.descriptionText }}
            </p>

            <div
              class="pt-6 border-t border-slate-100 mt-auto flex items-center justify-between gap-4"
            >
              <div>
                <div
                  class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em]"
                >
                  {{ $t("hotelsPage.card.featured") }}
                </div>
                <div class="text-sm font-bold text-slate-700 mt-2">
                  {{ hotel._location || hotel.location }}
                </div>
              </div>
              <router-link
                :to="'/hotel/' + hotel.slug"
                class="flex items-center justify-center w-14 h-14 bg-slate-50 rounded-2xl group-hover:bg-red-600 text-slate-400 group-hover:text-white transition-colors duration-300 shrink-0"
              >
                <ArrowRight
                  class="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                />
              </router-link>
            </div>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { Star, MapPin, Building, ArrowRight, Search } from "lucide-vue-next";
import { getHotels } from "@/services/api";
import { translateText } from "@/services/translate";

const { locale } = useI18n();

const searchQuery = ref("");
const selectedCategory = ref("all");

const hotelCategories = [
  { key: "all", labelKey: "hotelsPage.categories.all" },
  { key: "resort", labelKey: "hotelsPage.categories.resort" },
  { key: "cityHotel", labelKey: "hotelsPage.categories.cityHotel" },
  { key: "boutique", labelKey: "hotelsPage.categories.boutique" },
  { key: "ecoLodge", labelKey: "hotelsPage.categories.ecoLodge" },
];
const categoryToKey = {
  Resort: "resort",
  "City Hotel": "cityHotel",
  Boutique: "boutique",
  "Eco Lodge": "ecoLodge",
};

const translatedCache = new Map();
const displayedHotels = ref([]);

const localeKey = (value) => {
  const loc = String(value || "").toLowerCase();
  if (loc.startsWith("ko")) return "ko";
  if (loc.startsWith("zh")) return "zh";
  if (loc.startsWith("en")) return "en";
  return "id";
};

const getLocalizedDescriptionFromRaw = (hotel, loc) => {
  const key = localeKey(loc);
  if (key === "en") return hotel?.description_en || hotel?.description || "";
  if (key === "ko") return hotel?.description_ko || hotel?.description || "";
  if (key === "zh") return hotel?.description_zh || hotel?.description || "";
  return hotel?.description || "";
};

const stripHtml = (value) =>
  String(value || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();

const runWithConcurrency = async (items, limit, worker) => {
  const results = new Array(items.length);
  let index = 0;
  const runners = Array.from(
    { length: Math.min(limit, items.length) },
    async () => {
      while (index < items.length) {
        const i = index;
        index += 1;
        results[i] = await worker(items[i], i);
      }
    },
  );
  await Promise.all(runners);
  return results;
};

const fetchHotels = async () => {
  const res = await getHotels();
  const arr = Array.isArray(res.data?.data?.data)
    ? res.data.data.data
    : Array.isArray(res.data?.data)
      ? res.data.data
      : [];
  return arr.map((h) => {
    const image =
      h.primary_image ||
      h.images?.[0]?.image_path ||
      "https://images.unsplash.com/photo-1551882547-ff40c0d588fa?auto=format&fit=crop&w=2400&q=80";
    const categoryLabel = h.category
      ? h.category.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase())
      : "All";
    const categoryKey =
      categoryToKey[categoryLabel] ||
      (h.category || "all").replace(/ /g, "").replace(/-/g, "").toLowerCase();
    const localizedDescription = getLocalizedDescriptionFromRaw(h, locale.value);
    return {
      id: h.id,
      name: h.name,
      slug: h.slug,
      description: localizedDescription,
      descriptionBase: h.description || "",
      descriptionText: stripHtml(localizedDescription),
      hasLocalizedDescription:
        localeKey(locale.value) === "en"
          ? Boolean(h.description_en)
          : localeKey(locale.value) === "ko"
            ? Boolean(h.description_ko)
            : localeKey(locale.value) === "zh"
              ? Boolean(h.description_zh)
              : true,
      location: h.location || "",
      _description: undefined,
      _descriptionText: undefined,
      _location: undefined,
      stars: Number(h.stars || 0),
      image,
      category: categoryLabel,
      categoryKey,
    };
  });
};

const ensureTranslatedHotels = async () => {
  const lang = locale.value;

  if (translatedCache.has(lang)) {
    displayedHotels.value = translatedCache.get(lang);
    return;
  }

  const base = await fetchHotels();

  if (lang === "en") {
    translatedCache.set(lang, base);
    displayedHotels.value = base;
    return;
  }

  const translated = await runWithConcurrency(base, 4, async (hotel) => {
    const [desc, loc] = await Promise.all([
      hotel.hasLocalizedDescription
        ? Promise.resolve(undefined)
        : translateText(stripHtml(hotel.descriptionBase), lang, "auto"),
      translateText(hotel.location, lang, "auto"),
    ]);

    return {
      ...hotel,
      _description: desc,
      _descriptionText: desc || hotel._descriptionText,
      _location: loc,
    };
  });

  translatedCache.set(lang, translated);
  displayedHotels.value = translated;
};

onMounted(async () => {
  await ensureTranslatedHotels();
});

watch(
  () => locale.value,
  async () => {
    await ensureTranslatedHotels();
  },
);

const filteredHotels = computed(() => {
  let results = displayedHotels.value;

  if (selectedCategory.value !== "all") {
    results = results.filter(
      (hotel) => hotel.categoryKey === selectedCategory.value,
    );
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase().trim();
    results = results.filter(
      (hotel) =>
        String(hotel.name).toLowerCase().includes(query) ||
        String(hotel.location).toLowerCase().includes(query) ||
        String(hotel._location || "")
          .toLowerCase()
          .includes(query) ||
        String(hotel.descriptionText).toLowerCase().includes(query) ||
        String(hotel._description || "")
          .toLowerCase()
          .includes(query),
    );
  }

  return results;
});
</script>

<style scoped>
.hotel-description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  overflow: hidden;
}
</style>
