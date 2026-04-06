<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <div
      v-if="category"
      class="relative h-[60vh] flex items-center overflow-hidden bg-slate-900"
    >
      <img
        :src="heroImage"
        class="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
        alt="Hero Background"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"
      ></div>

      <div
        class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-20 w-full"
      >
        <nav
          class="flex mb-6 text-xs font-bold uppercase tracking-widest text-red-400"
        >
          <router-link to="/" class="hover:text-white transition-colors"
            >Home</router-link
          >
          <span class="mx-3 text-white/30">/</span>
          <span class="text-white">Category</span>
        </nav>
        <h1
          class="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic"
        >
          {{ category.name }}
        </h1>
        <p class="text-white/80 text-xl max-w-3xl leading-relaxed font-medium">
          {{ category.description }}
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div v-if="loading" class="text-center py-20">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"
        ></div>
      </div>

      <div v-else-if="category">
        <!-- Filter Tabs -->
        <div v-if="hasMultipleTypes" class="flex justify-center mb-16">
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

        <!-- List of Tours -->
        <div
          v-if="filteredTours.length > 0"
          class="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          <TourCard v-for="tour in filteredTours" :key="tour.id" :tour="tour" />
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
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import TourCard from "@/components/TourCard.vue";
import { getLocalCategories, getLocalTours } from "@/services/api";
import { autoTranslate } from "@/services/translate";
import { dummyLocalCategories, dummyLocalTours } from "./dummyLocalTours";

const route = useRoute();
const { locale } = useI18n();
const category = ref(null);
const tours = ref([]);
const loading = ref(true);
const activeTab = ref("daily");

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
  if (!hasMultipleTypes.value) return tours.value;
  return tours.value.filter((t) => {
    if (activeTab.value === "daily") return !isMultiDay(t);
    if (activeTab.value === "packages") return isMultiDay(t);
    return true;
  });
});

const heroImage = computed(() => {
  const images = {
    "manado-city-tour":
      "https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=2400&q=80",
    "marine-bunaken":
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2400&q=80",
    "highland-tomohon":
      "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=2400&q=80",
  };
  return (
    images[route.params.slug] ||
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2400&q=80"
  );
});

const fetchData = async () => {
  loading.value = true;
  try {
    const [catRes, tourRes] = await Promise.all([
      getLocalCategories(),
      getLocalTours({ category: route.params.slug }),
    ]);

    const rawCategory = (catRes.data.data || []).find(
      (c) => c.slug === route.params.slug,
    );
    const rawTours = tourRes.data.data || [];

    if (!rawCategory) {
      const localCat = dummyLocalCategories.find(
        (c) => c.slug === route.params.slug,
      );
      if (localCat) {
        category.value = localCat;
        tours.value = dummyLocalTours.filter(
          (t) => t.category_id === localCat.id,
        );
        return;
      }
    }

    // Auto translate category info if not in Indonesian
    if (locale.value !== "id" && rawCategory) {
      const [translatedName, translatedDesc] = await Promise.all([
        autoTranslate(rawCategory.name, locale.value),
        autoTranslate(rawCategory.description, locale.value),
      ]);
      category.value = {
        ...rawCategory,
        name: translatedName,
        description: translatedDesc,
      };
    } else {
      category.value = rawCategory;
    }

    // Auto translate tour titles and descriptions
    if (locale.value !== "id" && rawTours.length > 0) {
      tours.value = await Promise.all(
        rawTours.map(async (tour) => {
          const [translatedTitle, translatedDescription] = await Promise.all([
            autoTranslate(tour.title, locale.value),
            autoTranslate(tour.description, locale.value),
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
    const localCat = dummyLocalCategories.find(
      (c) => c.slug === route.params.slug,
    );
    category.value = localCat || null;
    tours.value = localCat
      ? dummyLocalTours.filter((t) => t.category_id === localCat.id)
      : [];
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);
watch(() => route.params.slug, fetchData);
watch(locale, fetchData); // Refetch and translate when language changes
</script>
