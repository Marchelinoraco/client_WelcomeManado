<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900">
    <section class="relative overflow-hidden bg-slate-950 px-6 pb-16 pt-36 lg:px-10 lg:pb-24 lg:pt-44">
      <div class="absolute inset-0">
        <img
          :src="heroImage"
          :alt="itemTitle || 'Travel info detail'"
          class="h-full w-full object-cover opacity-25"
        />
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.25),transparent_40%),linear-gradient(to_bottom,rgba(2,6,23,0.35),rgba(2,6,23,0.95))]"></div>
      </div>

      <div class="relative mx-auto max-w-6xl">
        <nav
          v-if="item"
          class="mb-6 flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-white/55"
          aria-label="Breadcrumb"
        >
          <button type="button" class="transition hover:text-white" @click="router.push({ name: 'TravelInfo' })">
            Travel Info
          </button>
          <ChevronRight class="h-3.5 w-3.5" />
          <button type="button" class="transition hover:text-white" @click="goBack">
            {{ sectionLabel }}
          </button>
          <template v-if="categoryLabel">
            <ChevronRight class="h-3.5 w-3.5" />
            <span>{{ categoryLabel }}</span>
          </template>
          <ChevronRight class="h-3.5 w-3.5" />
          <span class="text-white">{{ itemTitle }}</span>
        </nav>

        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white/90 backdrop-blur transition hover:bg-white/15"
          @click="goBack"
        >
          <ArrowLeft class="h-4 w-4" />
          {{ backLabel }}
        </button>

        <div v-if="loading" class="mt-10 max-w-4xl animate-pulse">
          <div class="h-7 w-36 rounded-full bg-white/10"></div>
          <div class="mt-6 h-14 w-4/5 rounded-3xl bg-white/10"></div>
          <div class="mt-4 h-5 w-2/3 rounded-2xl bg-white/10"></div>
        </div>

        <div v-else-if="errorMessage" class="mt-10 max-w-2xl rounded-[2rem] border border-white/10 bg-white/10 p-8 text-white backdrop-blur">
          <h1 class="text-2xl font-black">Konten tidak tersedia</h1>
          <p class="mt-3 text-sm font-medium text-white/75">{{ errorMessage }}</p>
          <button
            type="button"
            class="mt-6 rounded-2xl bg-white px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-900 transition hover:bg-red-50"
            @click="fetchItem"
          >
            Coba Lagi
          </button>
        </div>

        <div v-else-if="item" class="mt-10 max-w-5xl">
          <div class="inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.3em] text-red-200">
            <Sparkles class="h-4 w-4" />
            {{ sectionLabel }}
          </div>
          <h1 class="mt-6 text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
            {{ itemTitle }}
          </h1>
          <p class="mt-6 max-w-3xl text-base font-medium leading-relaxed text-white/75 md:text-lg">
            {{ itemExcerpt }}
          </p>
        </div>
      </div>
    </section>

    <main class="mx-auto max-w-6xl px-6 py-14 lg:px-10 lg:py-20">
      <div v-if="item" class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article class="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_25px_80px_-50px_rgba(15,23,42,0.35)]">
          <div class="aspect-[16/8] bg-slate-100">
            <img
              :src="heroImage"
              :alt="itemTitle"
              class="h-full w-full object-cover"
            />
          </div>

          <div class="p-7 md:p-10">
            <div class="flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-[0.25em] text-slate-400">
              <span class="rounded-full bg-slate-100 px-3 py-2 text-slate-600">
                {{ sectionLabel }}
              </span>
              <span
                v-if="categoryLabel"
                class="rounded-full bg-red-50 px-3 py-2 text-red-600"
              >
                {{ categoryLabel }}
              </span>
            </div>

            <div
              class="prose prose-slate mt-8 max-w-none prose-headings:font-black prose-p:text-slate-600 prose-p:leading-8 prose-li:text-slate-600"
              v-html="itemDescriptionHtml"
            ></div>
          </div>
        </article>

        <aside class="space-y-6">
          <div class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div class="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
              Travel Info
            </div>
            <h2 class="mt-3 text-2xl font-black tracking-tight text-slate-900">
              {{ itemTitle }}
            </h2>
            <p class="mt-3 text-sm font-medium leading-7 text-slate-600">
              {{ itemExcerpt }}
            </p>
          </div>

          <div class="rounded-[2rem] border border-red-100 bg-gradient-to-br from-red-50 via-white to-orange-50 p-6 shadow-sm">
            <div class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/20">
              <Compass class="h-6 w-6" />
            </div>
            <h3 class="mt-5 text-xl font-black text-slate-900">
              Jelajahi kategori lain
            </h3>
            <p class="mt-2 text-sm font-medium leading-7 text-slate-600">
              Kembali ke daftar kategori untuk membaca rekomendasi travel info lainnya dari WelcomeManado.
            </p>
            <button
              type="button"
              class="mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-slate-800"
              @click="goBack"
            >
              Kembali ke daftar
              <ArrowRight class="h-4 w-4" />
            </button>
          </div>
        </aside>
      </div>

      <section v-if="relatedItems.length > 0" class="mt-14">
        <div class="mb-8 flex items-end justify-between gap-4">
          <div>
            <div class="text-[11px] font-black uppercase tracking-[0.3em] text-red-500">
              Travel Info
            </div>
            <h2 class="mt-3 text-3xl font-black tracking-tight text-slate-900">
              {{ relatedHeading }}
            </h2>
          </div>
          <button
            type="button"
            class="hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-700 transition hover:border-red-200 hover:text-red-600 md:inline-flex"
            @click="goBack"
          >
            {{ backLabel }}
          </button>
        </div>

        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="related in relatedItems"
            :key="related.id"
            role="button"
            tabindex="0"
            class="group cursor-pointer overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-200 focus-visible:ring-offset-2"
            @click="goToRelated(related.id)"
            @keydown.enter="goToRelated(related.id)"
            @keydown.space.prevent="goToRelated(related.id)"
          >
            <div class="aspect-[16/10] overflow-hidden bg-slate-100">
              <img
                :src="related.image_url || fallbackImages[related.type] || fallbackImages.guide"
                :alt="titleByLocale(related)"
                class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div class="p-6">
              <div class="flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-[0.24em] text-slate-400">
                <span class="rounded-full bg-slate-100 px-3 py-2 text-slate-600">
                  {{ labelForType(related.type) }}
                </span>
                <span
                  v-if="labelForCategory(related)"
                  class="rounded-full bg-red-50 px-3 py-2 text-red-600"
                >
                  {{ labelForCategory(related) }}
                </span>
              </div>
              <h3 class="mt-4 text-xl font-black leading-tight text-slate-900 transition group-hover:text-red-600">
                {{ titleByLocale(related) }}
              </h3>
              <p class="mt-3 line-clamp-3 text-sm font-medium leading-7 text-slate-600">
                {{ excerptForItem(related) }}
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Compass,
  Sparkles,
} from "lucide-vue-next";
import { useI18n } from "vue-i18n";
import { getTravelInfoItem, getTravelInfoItems } from "@/services/api";
import { stripHtml } from "@/utils/htmlText";
import { applySeo } from "@/utils/seo";
import { ref } from "vue";

const route = useRoute();
const router = useRouter();
const { locale, t } = useI18n();

const item = ref(null);
const relatedSource = ref([]);
const loading = ref(false);
const errorMessage = ref("");

const fallbackImages = {
  guide:
    "https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=2400&q=80",
  culture:
    "https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=2400&q=80",
  food:
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=2400&q=80",
  shopping:
    "https://images.unsplash.com/photo-1521335629791-ce4aec67dd53?auto=format&fit=crop&w=2400&q=80",
};

const typeConfig = {
  guide: { labelKey: "nav.guide", routeName: "TravelInfo" },
  culture: { labelKey: "nav.history", routeName: "TravelCulture" },
  food: { labelKey: "nav.food", routeName: "TravelFood" },
  shopping: { labelKey: "nav.shopping", routeName: "TravelShopping" },
};

const foodCategoryLabels = {
  main: { id: "Hidangan utama", en: "Main dishes" },
  breakfast: { id: "Sarapan", en: "Breakfast" },
  dessert: { id: "Dessert", en: "Dessert" },
  drinks: { id: "Minuman", en: "Drinks" },
};

const shoppingCategoryLabels = {
  center: { id: "Pusat belanja", en: "Shopping center" },
  souvenir: { id: "Oleh-oleh", en: "Souvenir" },
  minahasa: { id: "Produk Minahasa", en: "Minahasa products" },
};

const currentLocale = computed(() => String(locale.value || "id").toLowerCase());

const titleByLocale = (current) => {
  if (!current) return "";
  if (currentLocale.value.startsWith("en")) return current.title_en || current.title || "";
  if (currentLocale.value.startsWith("ko")) return current.title_ko || current.title || "";
  if (currentLocale.value.startsWith("zh")) return current.title_zh || current.title || "";
  return current.title || "";
};

const itemTitle = computed(() => titleByLocale(item.value));

const descriptionHtmlByLocale = (current) => {
  if (!current) return "";
  if (currentLocale.value.startsWith("en")) return current.description_en || current.description || "";
  if (currentLocale.value.startsWith("ko")) return current.description_ko || current.description || "";
  if (currentLocale.value.startsWith("zh")) return current.description_zh || current.description || "";
  return current.description || "";
};

const itemDescriptionHtml = computed(() => descriptionHtmlByLocale(item.value));

const itemExcerpt = computed(() => stripHtml(itemDescriptionHtml.value).slice(0, 220));

const sectionLabel = computed(() => {
  const type = item.value?.type;
  const config = type ? typeConfig[type] : null;
  return config ? t(config.labelKey) : "Travel Info";
});

const categoryLabel = computed(() => {
  return labelForCategory(item.value);
});

const heroImage = computed(() => item.value?.image_url || fallbackImages[item.value?.type] || fallbackImages.guide);

const backLabel = computed(() => (currentLocale.value.startsWith("en") ? "Back to list" : "Kembali ke daftar"));
const relatedHeading = computed(() =>
  currentLocale.value.startsWith("en") ? "Related Articles" : "Artikel Terkait",
);

const labelForType = (type) => {
  const config = type ? typeConfig[type] : null;
  return config ? t(config.labelKey) : "Travel Info";
};

const labelForCategory = (current) => {
  if (!current?.category_key) return "";

  const labels =
    current.type === "food"
      ? foodCategoryLabels[current.category_key]
      : current.type === "shopping"
        ? shoppingCategoryLabels[current.category_key]
        : null;

  if (!labels) return current.category_key;
  return currentLocale.value.startsWith("en") ? labels.en : labels.id;
};

const excerptForItem = (current) => stripHtml(descriptionHtmlByLocale(current)).slice(0, 140);

const relatedItems = computed(() =>
  relatedSource.value
    .filter((related) => related?.id && related.id !== item.value?.id)
    .slice(0, 3),
);

const goBack = () => {
  const routeName = typeConfig[item.value?.type]?.routeName || "TravelInfo";
  router.push({ name: routeName });
};

const goToRelated = (id) => {
  if (!id) return;
  router.push({ name: "TravelInfoDetail", params: { id } });
};

const applyPageSeo = () => {
  applySeo({
    title: itemTitle.value || "Detail Informasi Perjalanan",
    description: itemExcerpt.value || "Detail informasi perjalanan di Manado.",
    image: heroImage.value,
    url: route.fullPath,
    type: "article",
  });
};

const fetchRelatedItems = async (current) => {
  if (!current?.type) {
    relatedSource.value = [];
    return;
  }

  try {
    const res = await getTravelInfoItems({ type: current.type, active: true });
    const data = Array.isArray(res.data?.data?.data)
      ? res.data.data.data
      : Array.isArray(res.data?.data)
        ? res.data.data
        : [];

    relatedSource.value = data;
  } catch {
    relatedSource.value = [];
  }
};

const fetchItem = async () => {
  loading.value = true;
  errorMessage.value = "";
  try {
    const res = await getTravelInfoItem(route.params.id);
    item.value = res.data?.data || null;

    if (!item.value) {
      errorMessage.value = "Data tidak ditemukan.";
      return;
    }

    await fetchRelatedItems(item.value);
    applyPageSeo();
  } catch (error) {
    item.value = null;
    relatedSource.value = [];
    errorMessage.value = error?.message || "Tidak dapat memuat detail dari server.";
  } finally {
    loading.value = false;
  }
};

watch(() => route.params.id, fetchItem);
watch([itemTitle, itemExcerpt, heroImage], () => {
  if (item.value) applyPageSeo();
});

onMounted(fetchItem);
</script>
