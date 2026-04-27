<template>
  <div
    class="selection:bg-orange-100 selection:text-orange-700 font-sans min-h-screen bg-slate-50"
  >
    <header
      class="relative pt-40 pb-20 lg:pt-52 lg:pb-32 px-6 lg:px-10 overflow-hidden bg-slate-900"
    >
      <div class="absolute inset-0">
        <div class="w-full h-full relative bg-slate-950">
          <template v-for="(img, index) in heroImages" :key="img">
            <div
              class="absolute inset-0 w-full h-full transition-opacity duration-[2000ms] ease-in-out"
              :class="currentHeroIndex === index ? 'opacity-100' : 'opacity-0'"
            >
              <img
                :src="img"
                class="h-full w-full object-cover opacity-40"
                alt="Hero"
              />
            </div>
          </template>
        </div>
        <div
          class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"
        ></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto text-center">
        <div
          class="inline-flex items-center space-x-3 mb-6 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20"
        >
          <Utensils class="w-4 h-4 text-orange-400" />
          <span
            class="text-xs font-black text-white uppercase tracking-[0.3em]"
            >{{ $t("nav.food") }}</span
          >
        </div>
        <h1
          class="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-8"
        >
          {{ $t("food.title").split("&")[0] }} &
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500"
            >{{ $t("food.title").split("&")[1] || "CUISINE" }}</span
          >
        </h1>
        <p
          class="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          {{ $t("food.description") }}
        </p>
      </div>
    </header>

    <main class="py-20 lg:py-32 px-6 lg:px-10 max-w-7xl mx-auto">
      <div v-if="loading" class="space-y-10">
        <div v-for="k in 3" :key="k">
          <div class="mb-12 text-left max-w-3xl border-l-4 border-orange-200 pl-6">
            <div class="h-8 w-72 bg-slate-100 rounded-2xl animate-pulse"></div>
            <div class="w-16 h-1 bg-orange-200 rounded-full mt-4"></div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article
              v-for="i in 6"
              :key="i"
              class="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div class="animate-pulse">
                <div class="w-14 h-14 bg-slate-100 rounded-2xl mb-6"></div>
                <div class="h-5 bg-slate-100 rounded-xl w-3/4 mb-4"></div>
                <div class="h-4 bg-slate-100 rounded-xl w-full mb-2"></div>
                <div class="h-4 bg-slate-100 rounded-xl w-5/6"></div>
              </div>
            </article>
          </div>
        </div>
      </div>

      <div v-else-if="errorMessage" class="p-10 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
        <h2 class="text-xl font-black text-slate-900">Gagal memuat konten</h2>
        <p class="text-slate-500 font-bold mt-3">{{ errorMessage }}</p>
        <div class="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            class="h-11 px-6 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-colors"
            @click="fetchItems"
          >
            Coba Lagi
          </button>
        </div>
      </div>

      <div v-else-if="categories.length === 0" class="p-12 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
        <h3 class="text-2xl font-black text-slate-900">Belum ada konten</h3>
        <p class="text-slate-500 font-bold mt-2">Konten Travel Food bisa ditambahkan dari panel admin.</p>
      </div>

      <div v-else>
        <div
          v-for="(category, catIndex) in categories"
          :key="catIndex"
          class="mb-24 last:mb-0"
        >
          <div class="mb-12 text-left max-w-3xl border-l-4 border-orange-500 pl-6">
            <h2
              class="text-3xl md:text-4xl font-black text-slate-900 mb-2 tracking-tight uppercase italic"
            >
              {{ $t("food.categories." + category.key) }}
            </h2>
            <div class="w-16 h-1 bg-orange-200 rounded-full mt-4"></div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article
              v-for="it in category.items"
              :key="it.id"
              role="button"
              tabindex="0"
              class="group cursor-pointer bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-orange-900/10 transition-all duration-500 border border-slate-100 flex flex-col items-start text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200 focus-visible:ring-offset-2"
              @click="goToDetail(it)"
              @keydown.enter="goToDetail(it)"
              @keydown.space.prevent="goToDetail(it)"
            >
              <div
                class="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-500 transition-all duration-500"
              >
                <ChefHat
                  class="w-7 h-7 text-orange-500 group-hover:text-white transition-colors"
                />
              </div>

              <h3
                class="text-xl font-black text-slate-900 leading-tight mb-4 group-hover:text-orange-600 transition-colors"
              >
                {{ titleByLocale(it) }}
              </h3>

              <div
                class="card-desc text-slate-500 text-sm font-medium leading-relaxed mb-8"
                v-html="descriptionByLocale(it)"
              ></div>

              <div
                class="mt-auto w-full flex items-center justify-between pt-6 border-t border-slate-100 group-hover:border-orange-100 transition-colors"
              >
                <span
                  class="text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-orange-600 transition-colors"
                  >Taste it</span
                >
                <div
                  class="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-orange-500 flex items-center justify-center transition-all duration-300"
                >
                  <ArrowRight
                    class="w-5 h-5 text-slate-400 group-hover:text-white -rotate-45 group-hover:rotate-0 transition-all duration-500"
                  />
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { Utensils, ChefHat, ArrowRight } from "lucide-vue-next";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { getTravelInfoItems, getHeroImages } from "@/services/api";

const { locale } = useI18n();
const router = useRouter();

const items = ref([]);
const loading = ref(false);
const errorMessage = ref("");
const categoryOrder = ["main", "breakfast", "dessert", "drinks"];

const heroImages = ref(['https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2400&q=80'])
const currentHeroIndex = ref(0)
let heroInterval = null

const fetchHeroImages = async () => {
  try {
    const res = await getHeroImages()
    const data = res.data?.data || []
    if (data.length > 0) heroImages.value = data.map(item => item.image_url)
  } catch { /* keep default */ }
}

const categories = computed(() => {
  const grouped = categoryOrder
    .map((key) => ({
      key,
      items: items.value.filter((it) => it.category_key === key),
    }))
    .filter((c) => c.items.length > 0);

  grouped.forEach((c) => {
    c.items.sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0));
  });

  return grouped;
});

const titleByLocale = (it) => {
  const loc = String(locale.value || "id").toLowerCase();
  if (loc.startsWith("en")) return it?.title_en || it?.title || "";
  if (loc.startsWith("ko")) return it?.title_ko || it?.title || "";
  if (loc.startsWith("zh")) return it?.title_zh || it?.title || "";
  return it?.title || "";
};

const descriptionByLocale = (it) => {
  const loc = String(locale.value || "id").toLowerCase();
  if (loc.startsWith("en")) return it?.description_en || it?.description || "";
  if (loc.startsWith("ko")) return it?.description_ko || it?.description || "";
  if (loc.startsWith("zh")) return it?.description_zh || it?.description || "";
  return it?.description || "";
};

const goToDetail = (it) => {
  if (!it?.id) return;
  router.push({ name: "TravelInfoDetail", params: { id: it.id } });
};

const fetchItems = async () => {
  loading.value = true;
  errorMessage.value = "";
  try {
    const res = await getTravelInfoItems({ type: "food", active: true });
    const data = Array.isArray(res.data?.data?.data)
      ? res.data.data.data
      : res.data?.data || [];
    items.value = data;
  } catch (e) {
    items.value = [];
    errorMessage.value = e?.message || "Tidak dapat memuat data dari server.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchItems()
  fetchHeroImages()
  heroInterval = setInterval(() => {
    if (heroImages.value.length > 1) {
      currentHeroIndex.value = (currentHeroIndex.value + 1) % heroImages.value.length
    }
  }, 5000)
})

onUnmounted(() => {
  if (heroInterval) clearInterval(heroInterval)
})
</script>

<style scoped>
.card-desc {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-desc :deep(p) {
  margin: 0 0 0.5rem;
  line-height: 1.7;
}
.card-desc :deep(p:last-child) {
  margin-bottom: 0;
}
.card-desc :deep(ul),
.card-desc :deep(ol) {
  margin: 0 0 0.5rem 1.25rem;
}
.card-desc :deep(ul) { list-style-type: disc; }
.card-desc :deep(ol) { list-style-type: decimal; }
.card-desc :deep(strong) { font-weight: 700; }
.card-desc :deep(h2),
.card-desc :deep(h3) { font-size: 0.875rem; font-weight: 700; }
</style>
