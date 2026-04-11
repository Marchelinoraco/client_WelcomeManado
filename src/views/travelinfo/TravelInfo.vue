<template>
  <div
    class="selection:bg-red-100 selection:text-red-700 font-sans min-h-screen bg-slate-50"
  >
    <header
      class="relative pt-40 pb-20 lg:pt-52 lg:pb-32 px-6 lg:px-10 overflow-hidden bg-slate-900"
    >
      <div
        class="absolute inset-0 z-0 scale-105 animate-pulse"
        style="animation-duration: 20s"
      >
        <img
          src="https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=2400&q=80"
          class="w-full h-full object-cover opacity-30"
          alt="Manado Guide"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"
        ></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto text-center">
        <div
          class="inline-flex items-center space-x-3 mb-6 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20"
        >
          <Compass class="w-4 h-4 text-red-400" />
          <span
            class="text-xs font-black text-white uppercase tracking-[0.3em]"
            >{{ $t("guide.hero.badge") }}</span
          >
        </div>
        <h1
          class="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-8"
        >
          {{ $t("guide.hero.title1") }}
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600"
            >{{ $t("guide.hero.title2") }}</span
          >
        </h1>
        <p
          class="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          {{ $t("guide.hero.description") }}
        </p>
      </div>
    </header>

    <main class="py-20 lg:py-32 px-6 lg:px-10 max-w-7xl mx-auto">
      <div class="mb-16 text-center max-w-2xl mx-auto">
        <h2 class="text-3xl font-black text-slate-900 mb-4 tracking-tight">
          {{ $t("guide.section.title") }}
        </h2>
        <div class="w-20 h-1 bg-red-600 rounded-full mx-auto"></div>
      </div>

      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <article
          v-for="i in 8"
          :key="i"
          class="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100"
        >
          <div class="animate-pulse">
            <div class="w-12 h-12 bg-slate-100 rounded-full mb-5"></div>
            <div class="h-5 bg-slate-100 rounded-xl w-3/4 mb-3"></div>
            <div class="h-4 bg-slate-100 rounded-xl w-full mb-2"></div>
            <div class="h-4 bg-slate-100 rounded-xl w-5/6"></div>
          </div>
        </article>
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

      <div v-else-if="items.length === 0" class="p-12 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
        <h3 class="text-2xl font-black text-slate-900">Belum ada konten</h3>
        <p class="text-slate-500 font-bold mt-2">Konten Manado Guide bisa ditambahkan dari panel admin.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <article
          v-for="it in items"
          :key="it.id"
          class="group bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-red-900/10 transition-all duration-500 border border-slate-100 flex flex-col items-start text-left"
        >
          <div
            class="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
          >
            <Map class="w-6 h-6 text-red-600" />
          </div>

          <h3
            class="text-xl font-black text-slate-900 leading-tight mb-3 group-hover:text-red-600 transition-colors"
          >
            {{ titleByLocale(it) }}
          </h3>

          <p class="text-slate-500 text-sm font-medium leading-relaxed mb-6 line-clamp-4">
            {{ descriptionByLocale(it) }}
          </p>

          <div
            class="mt-auto w-full flex items-center justify-between pt-4 border-t border-slate-100 group-hover:border-red-100 transition-colors"
          >
            <span
              class="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-red-600 transition-colors"
              >{{ $t("common.explore") }}</span
            >
            <div
              class="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-red-600 flex items-center justify-center transition-colors"
            >
              <ArrowRight
                class="w-4 h-4 text-slate-400 group-hover:text-white -rotate-45 group-hover:rotate-0 transition-all duration-300"
              />
            </div>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup>
import { Compass, Map, ArrowRight } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { getTravelInfoItems } from "@/services/api";

const { locale } = useI18n();

const items = ref([]);
const loading = ref(false);
const errorMessage = ref("");

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

const fetchItems = async () => {
  loading.value = true;
  errorMessage.value = "";
  try {
    const res = await getTravelInfoItems({ type: "guide", active: true });
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

onMounted(fetchItems);
</script>
