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
          class="flex mb-6 text-xs font-bold uppercase tracking-widest text-blue-400"
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
          class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"
        ></div>
      </div>

      <div v-else-if="category">
        <!-- List of Tours -->
        <div
          v-if="tours.length > 0"
          class="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          <TourCard v-for="tour in tours" :key="tour.id" :tour="tour" />
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
import TourCard from "../components/TourCard.vue";
import { getTours, getCategories } from "../services/api";
import { autoTranslate } from "../services/translate";

const route = useRoute();
const { locale } = useI18n();
const category = ref(null);
const tours = ref([]);
const loading = ref(true);

const heroImage = computed(() => {
  const images = {
    "manado-city-tour":
      "https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=2400&q=80",
    "bunaken-marine-park":
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2400&q=80",
    "minahasa-highland":
      "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=2400&q=80",
    "bali-gateway":
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2400&q=80",
    "komodo-island":
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=2400&q=80",
    "raja-ampat":
      "https://images.unsplash.com/photo-1534433852028-323280036128?auto=format&fit=crop&w=2400&q=80",
    "europe-adventure":
      "https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&w=2400&q=80",
    "japan-discovery":
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2400&q=80",
    "holy-land-tour":
      "https://images.unsplash.com/photo-1548135039-35d13ef30b24?auto=format&fit=crop&w=2400&q=80",
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
      getCategories(),
      getTours({ category: route.params.slug }),
    ]);

    const rawCategory = catRes.data.data.find(
      (c) => c.slug === route.params.slug,
    );
    const rawTours = tourRes.data.data;

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
  } catch (error) {
    console.error("Error fetching category data:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);
watch(() => route.params.slug, fetchData);
watch(locale, fetchData); // Refetch and translate when language changes
</script>
