<template>
  <div class="min-h-screen bg-slate-50">
    <section class="relative overflow-hidden bg-slate-950 px-6 pb-16 pt-36 lg:px-10 lg:pb-24 lg:pt-44">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=2400&q=80"
          class="h-full w-full object-cover opacity-25"
          alt="Manado Tours"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/55 to-slate-950"></div>
      </div>

      <div class="relative mx-auto max-w-7xl">
        <div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.3em] text-red-200 backdrop-blur">
          <MapPin class="h-4 w-4" />
          {{ $t("nav.localTours") }}
        </div>
        <h1 class="mt-6 max-w-4xl text-5xl font-black tracking-tight text-white md:text-7xl">
          {{ $t("categoryLanding.local.titlePrefix") }}
          <span class="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            {{ $t("categoryLanding.local.titleHighlight") }}
          </span>
        </h1>
        <p class="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/75">
          {{ $t("categoryLanding.local.description") }}
        </p>
      </div>
    </section>

    <main class="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <div v-if="loading" class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="i in 6"
          :key="i"
          class="h-72 animate-pulse rounded-[2rem] bg-white shadow-sm"
        ></div>
      </div>

      <div
        v-else-if="categories.length === 0"
        class="rounded-[2rem] border border-dashed border-slate-200 bg-white p-16 text-center"
      >
        <h2 class="text-2xl font-black text-slate-900">
          {{ $t("categoryLanding.emptyTitle") }}
        </h2>
        <p class="mt-3 font-medium text-slate-500">
          {{ $t("categoryLanding.local.emptyDescription") }}
        </p>
      </div>

      <div v-else class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <router-link
          v-for="category in categories"
          :key="category.id"
          :to="`/category/${category.slug}`"
          class="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/10"
        >
          <div class="relative aspect-[16/10] overflow-hidden bg-slate-100">
            <img
              :src="categoryImage(category.slug)"
              :alt="category.name"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
            <div class="absolute bottom-5 left-5 right-5">
              <div class="inline-flex items-center rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-white/80 backdrop-blur">
                {{ $t("categoryLanding.local.badge") }}
              </div>
              <h2 class="mt-3 text-2xl font-black tracking-tight text-white">
                {{ category.name }}
              </h2>
            </div>
          </div>
          <div class="p-6">
            <p class="line-clamp-3 text-sm font-medium leading-7 text-slate-600">
              {{ categoryDescription(category) }}
            </p>
            <div class="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
              <span class="text-[11px] font-black uppercase tracking-[0.24em] text-slate-400 transition-colors group-hover:text-red-600">
                {{ $t("categoryLanding.exploreCategory") }}
              </span>
              <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-all group-hover:bg-red-600 group-hover:text-white">
                <ArrowRight class="h-4 w-4 -rotate-45 transition-transform group-hover:rotate-0" />
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { ArrowRight, MapPin } from "lucide-vue-next";
import { getLocalCategories } from "@/services/api";
import { autoTranslate } from "@/services/translate";
import { stripHtml } from "@/utils/htmlText";
import { dummyLocalCategories } from "./dummyLocalTours";

const { locale } = useI18n();
const categories = ref([]);
const loading = ref(false);

const fallbackImages = {
  "manado-city-tour":
    "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1600&q=80",
  "marine-bunaken":
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80",
  "highland-tomohon":
    "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1600&q=80",
};

const categoryImage = (slug) =>
  fallbackImages[slug] ||
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80";

const categoryDescription = (category) => stripHtml(category?.description || "");

const fetchCategories = async () => {
  loading.value = true;
  try {
    const res = await getLocalCategories();
    const data = Array.isArray(res.data?.data) ? res.data.data : [];

    if (locale.value !== "id") {
      categories.value = await Promise.all(
        data.map(async (category) => ({
          ...category,
          name: await autoTranslate(category.name, locale.value),
          description: await autoTranslate(
            stripHtml(category.description),
            locale.value,
          ),
        })),
      );
    } else {
      categories.value = data;
    }
  } catch {
    categories.value = dummyLocalCategories;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchCategories);
watch(locale, fetchCategories);
</script>
