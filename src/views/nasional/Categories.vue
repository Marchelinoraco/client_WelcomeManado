<template>
  <div class="min-h-screen bg-slate-50">
    <section class="relative overflow-hidden bg-slate-950 px-6 pb-16 pt-36 lg:px-10 lg:pb-24 lg:pt-44">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=80"
          class="h-full w-full object-cover opacity-20"
          alt="National Destinations"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-slate-900/25 via-slate-900/60 to-slate-950"></div>
      </div>

      <div class="relative mx-auto max-w-7xl">
        <div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.3em] text-red-200 backdrop-blur">
          <Globe2 class="h-4 w-4" />
          {{ $t("nav.national") }}
        </div>
        <h1 class="mt-6 max-w-4xl text-5xl font-black tracking-tight text-white md:text-7xl">
          {{ $t("categoryLanding.national.titlePrefix") }}
          <span class="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            {{ $t("categoryLanding.national.titleHighlight") }}
          </span>
        </h1>
        <p class="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/75">
          {{ $t("categoryLanding.national.description") }}
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
          {{ $t("categoryLanding.national.emptyDescription") }}
        </p>
      </div>

      <div v-else class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <router-link
          v-for="category in categories"
          :key="category.id"
          :to="`/nasional/${category.slug}`"
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
                {{ $t("categoryLanding.national.badge") }}
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
import { ArrowRight, Globe2 } from "lucide-vue-next";
import { getNationalCategories } from "@/services/api";
import { autoTranslate } from "@/services/translate";
import { stripHtml } from "@/utils/htmlText";
import { dummyNasionalCategories } from "./dummyNasionalTours";

const { locale } = useI18n();
const categories = ref([]);
const loading = ref(false);

const fallbackImages = {
  "bali-lombok":
    "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=1600&q=80",
  "komodo-flores":
    "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=80",
  "raja-ampat-papua":
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
};

const categoryImage = (slug) =>
  fallbackImages[slug] ||
  "https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1600&q=80";

const categoryDescription = (category) => stripHtml(category?.description || "");

const fetchCategories = async () => {
  loading.value = true;
  try {
    const res = await getNationalCategories();
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
    categories.value = dummyNasionalCategories;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchCategories);
watch(locale, fetchCategories);
</script>
