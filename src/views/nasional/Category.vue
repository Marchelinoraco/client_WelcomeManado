<template>
  <div class="min-h-screen bg-white">
    <div v-if="category" class="relative">
      <div class="relative h-[72vh] lg:h-[80vh] overflow-hidden bg-slate-900">
        <div class="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-2 p-2">
          <div class="col-span-5 row-span-6 rounded-[2.5rem] overflow-hidden">
            <img
              :src="collageImages[0]"
              class="w-full h-full object-cover opacity-90"
              alt="Destination image"
            />
          </div>
          <div class="col-span-4 row-span-6 rounded-[2.5rem] overflow-hidden">
            <img
              :src="collageImages[1]"
              class="w-full h-full object-cover opacity-90"
              alt="Destination image"
            />
          </div>
          <div class="col-span-3 row-span-3 rounded-[2.5rem] overflow-hidden">
            <img
              :src="collageImages[2]"
              class="w-full h-full object-cover opacity-90"
              alt="Destination image"
            />
          </div>
          <div class="col-span-3 row-span-3 rounded-[2.5rem] overflow-hidden">
            <img
              :src="collageImages[3]"
              class="w-full h-full object-cover opacity-90"
              alt="Destination image"
            />
          </div>
        </div>

        <div class="absolute inset-0 bg-slate-900/40"></div>
        <div
          class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"
        ></div>

        <div
          class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16"
        >
          <nav
            class="flex mb-8 text-[10px] font-black uppercase tracking-[0.25em] text-red-300"
          >
            <router-link to="/" class="hover:text-white transition-colors"
              >Home</router-link
            >
            <span class="mx-3 text-white/30">•</span>
            <span class="text-white/80">Tour Package</span>
            <span class="mx-3 text-white/30">•</span>
            <span class="text-white">{{ category.name }}</span>
          </nav>

          <h1
            class="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase"
          >
            {{ category.name }}
          </h1>
          <p class="mt-6 text-white/80 text-lg max-w-3xl font-medium">
            {{ category.description }}
          </p>
        </div>
      </div>

      <div class="relative z-20 -mt-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            class="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-100 p-4 md:p-6"
          >
            <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div class="md:col-span-4">
                <label
                  class="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2"
                  >All Destination</label
                >
                <select
                  v-model="selectedDestination"
                  @change="applyFilters"
                  class="w-full h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
                >
                  <option
                    v-for="dest in destinationOptions"
                    :key="dest.slug"
                    :value="dest.slug"
                  >
                    {{ dest.name }}
                  </option>
                </select>
              </div>

              <div class="md:col-span-4">
                <label
                  class="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2"
                  >All Interest</label
                >
                <select
                  v-model="selectedInterest"
                  class="w-full h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
                >
                  <option value="all">All Interest</option>
                  <option
                    v-for="interest in interestOptions"
                    :key="interest"
                    :value="interest"
                  >
                    {{ formatInterest(interest) }}
                  </option>
                </select>
              </div>

              <div class="md:col-span-3">
                <label
                  class="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2"
                  >Search</label
                >
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search tour..."
                  class="w-full h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
                />
              </div>

              <div class="md:col-span-1 md:pt-6">
                <button
                  @click="applyFilters"
                  class="w-full h-12 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-widest transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div v-if="loading" class="text-center py-20">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"
        ></div>
      </div>

      <div v-else-if="category">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div class="lg:col-span-7">
            <h2 class="text-2xl font-black text-slate-900 tracking-tight">
              Tentang {{ category.name }}
            </h2>
            <p class="mt-4 text-slate-600 leading-relaxed font-medium">
              {{ category.overview || category.description }}
            </p>
          </div>
          <div class="lg:col-span-5">
            <div
              v-if="category.highlights?.length"
              class="bg-slate-50 rounded-[2.5rem] border border-slate-100 p-8"
            >
              <div
                class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4"
              >
                Highlight
              </div>
              <ul class="space-y-3">
                <li
                  v-for="(item, idx) in category.highlights"
                  :key="idx"
                  class="flex items-start gap-3 text-sm font-bold text-slate-700"
                >
                  <span
                    class="mt-1.5 w-2 h-2 rounded-full bg-red-600 flex-shrink-0"
                  ></span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div v-if="hasMultipleTypes" class="flex justify-center mb-12">
          <div class="inline-flex p-1.5 bg-slate-100 rounded-2xl">
            <button
              v-for="tab in filterTabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="px-8 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300"
              :class="
                activeTab === tab.id
                  ? 'bg-red-600 text-white shadow-lg shadow-red-200'
                  : 'text-slate-500 hover:text-slate-900'
              "
            >
              {{ tab.name }}
            </button>
          </div>
        </div>

        <div
          v-if="filteredTours.length > 0"
          class="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          <TourCard
            v-for="tour in filteredTours"
            :key="tour.id"
            :tour="tour"
            detailBasePath="/nasional/tour"
          />
        </div>
        <div
          v-else
          class="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200"
        >
          <p class="text-gray-400 font-medium">
            No tour packages found in this category.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import TourCard from "@/components/TourCard.vue";
import { getNationalCategories, getNationalTours } from "@/services/api";
import { autoTranslate } from "@/services/translate";
import { stripHtml } from "@/utils/htmlText";
import {
  dummyNasionalCategories,
  dummyNasionalTours,
} from "./dummyNasionalTours";

const route = useRoute();
const router = useRouter();
const { locale } = useI18n();
const category = ref(null);
const tours = ref([]);
const destinationCategories = ref([]);
const loading = ref(true);
const activeTab = ref("daily");
const selectedDestination = ref("");
const selectedInterest = ref("all");
const searchQuery = ref("");

const isMultiDay = (tour) => {
  return tour.duration_days > 1 || tour.duration_nights > 0;
};

const hasDaily = computed(() => tours.value.some((t) => !isMultiDay(t)));
const hasPackages = computed(() => tours.value.some((t) => isMultiDay(t)));
const hasMultipleTypes = computed(() => hasDaily.value && hasPackages.value);

const filterTabs = computed(() => {
  const tabs = [];
  if (hasDaily.value) {
    tabs.push({
      id: "daily",
      name: locale.value === "id" ? "Wisata Harian" : "Daily Tours",
    });
  }
  if (hasPackages.value) {
    tabs.push({
      id: "packages",
      name: locale.value === "id" ? "Paket Tour" : "Tour Packages",
    });
  }
  return tabs;
});

const filteredTours = computed(() => {
  const query = (searchQuery.value || "").trim().toLowerCase();
  const interest = selectedInterest.value;

  let list = tours.value;

  if (interest && interest !== "all") {
    list = list.filter((t) => (t.interest_tags || []).includes(interest));
  }

  if (query) {
    list = list.filter((t) => {
      const haystack =
        `${t.title || ""} ${t.summary || ""} ${t.description || ""}`.toLowerCase();
      return haystack.includes(query);
    });
  }

  if (!hasMultipleTypes.value) return list;
  return list.filter((t) => {
    if (activeTab.value === "daily") return !isMultiDay(t);
    if (activeTab.value === "packages") return isMultiDay(t);
    return true;
  });
});

const destinationOptions = computed(() => destinationCategories.value);

const interestOptions = computed(() => {
  const set = new Set();
  tours.value.forEach((t) => {
    (t.interest_tags || []).forEach((tag) => set.add(tag));
  });
  return Array.from(set);
});

const collageImages = computed(() => {
  const images = [];
  const fromTours = tours.value.flatMap((t) =>
    (t.galleries || []).map((g) => g.image_path),
  );
  fromTours.forEach((url) => {
    if (url && !images.includes(url)) images.push(url);
  });

  while (images.length < 4) {
    images.push(
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2400&q=80",
    );
  }
  return images.slice(0, 4);
});

const formatInterest = (value) => {
  if (!value) return "";
  const s = value.replace(/[_-]+/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const applyFilters = () => {
  if (
    selectedDestination.value &&
    selectedDestination.value !== route.params.slug
  ) {
    selectedInterest.value = "all";
    searchQuery.value = "";
    router.push(`/nasional/${selectedDestination.value}`);
  }
};

watch(
  () => selectedDestination.value,
  (next) => {
    if (!next) return;
    if (next === route.params.slug) return;
    applyFilters();
  },
);

const fetchData = async () => {
  loading.value = true;
  try {
    const [catRes, tourRes] = await Promise.all([
      getNationalCategories(),
      getNationalTours({ category: route.params.slug }),
    ]);

    let cats = catRes.data.data || [];
    const rawCategory = cats.find((c) => c.slug === route.params.slug);
    const rawTours = tourRes.data.data || [];

    if (!rawCategory) {
      const localCat = dummyNasionalCategories.find(
        (c) => c.slug === route.params.slug,
      );
      if (localCat) {
        category.value = localCat;
        tours.value = dummyNasionalTours.filter(
          (t) => t.category_id === localCat.id,
        );
        destinationCategories.value = dummyNasionalCategories;
        selectedDestination.value = localCat.slug;
        return;
      }
    }

    if (locale.value !== "id") {
      cats = await Promise.all(
        cats.map(async (c) => ({
          ...c,
          name: await autoTranslate(c.name, locale.value),
        })),
      );
    }

    destinationCategories.value = cats;
    selectedDestination.value = route.params.slug || "";

    // Auto translate category info if not in Indonesian
    if (locale.value !== "id" && rawCategory) {
      const [translatedName, translatedDesc] = await Promise.all([
        autoTranslate(rawCategory.name, locale.value),
        autoTranslate(stripHtml(rawCategory.description), locale.value),
      ]);
      category.value = {
        ...rawCategory,
        name: translatedName,
        description: translatedDesc,
      };
    } else {
      category.value = rawCategory
        ? {
            ...rawCategory,
            description: stripHtml(rawCategory.description),
            overview: stripHtml(rawCategory.overview),
          }
        : rawCategory;
    }

    // Auto translate tour titles and descriptions
    if (locale.value !== "id" && rawTours.length > 0) {
      tours.value = await Promise.all(
        rawTours.map(async (tour) => {
          const [translatedTitle, translatedDescription] = await Promise.all([
            autoTranslate(tour.title, locale.value),
            autoTranslate(stripHtml(tour.description), locale.value),
          ]);
          return {
            ...tour,
            title: translatedTitle,
            description: translatedDescription,
          };
        }),
      );
    } else {
      tours.value = rawTours;
    }

    // Reset active tab based on available types
    if (hasPackages.value && !hasDaily.value) {
      activeTab.value = "packages";
    } else {
      activeTab.value = "daily";
    }
  } catch (error) {
    console.error("Error fetching category data:", error);
    const fallbackCategory = dummyNasionalCategories.find(
      (c) => c.slug === route.params.slug,
    );
    category.value = fallbackCategory || null;
    destinationCategories.value = dummyNasionalCategories;
    tours.value = fallbackCategory
      ? dummyNasionalTours.filter((t) => t.category_id === fallbackCategory.id)
      : [];
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);
watch(
  () => route.params.slug,
  () => {
    selectedInterest.value = "all";
    searchQuery.value = "";
    fetchData();
  },
);
watch(locale, fetchData); // Refetch and translate when language changes
</script>
