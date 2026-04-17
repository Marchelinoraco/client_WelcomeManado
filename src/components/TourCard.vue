<template>
  <div
    class="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm dark:shadow-slate-900/40 hover:shadow-2xl hover:shadow-red-900/10 transition-all duration-500 overflow-hidden flex flex-col h-full relative"
  >
    <!-- Image Header -->
    <div class="relative h-72 overflow-hidden">
      <div
        class="absolute inset-0 bg-slate-200 animate-pulse"
        v-if="!tour.galleries?.length"
      ></div>
      <img
        v-else
        :src="tour.galleries[0].image_path"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        :alt="tour.title"
      />

      <!-- Overlays -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      ></div>

      <!-- Floating Badges -->
      <div class="absolute top-6 left-6 flex flex-col gap-2">
        <div
          class="px-4 py-1.5 bg-red-600 text-white text-[10px] font-black rounded-xl uppercase tracking-[0.15em] shadow-lg shadow-red-600/20 backdrop-blur-md"
        >
          {{ tour.category?.name }}
        </div>
      </div>

      <div class="absolute top-6 right-6">
        <div
          class="flex items-center space-x-1 px-4 py-1.5 bg-white/95 dark:bg-slate-950/90 border border-white/70 dark:border-slate-700/80 backdrop-blur-md text-slate-900 dark:text-white text-[10px] font-black rounded-xl shadow-lg shadow-slate-900/10 uppercase tracking-wider"
        >
          <Clock class="w-3 h-3 text-red-600 dark:text-red-400" />
          <span>{{ durationLabel }}</span>
        </div>
      </div>

      <!-- Quick Action Button (Visible on Hover) -->
      <div
        class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0"
      >
        <router-link
          :to="detailHref"
          class="bg-white dark:bg-slate-950 text-slate-900 dark:text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl dark:shadow-slate-950/50 hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center group/btn"
        >
          {{ t("tour.viewDetails") }}
          <ArrowRight
            class="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
          />
        </router-link>
      </div>
    </div>

    <!-- Content Body -->
    <div class="p-8 flex-1 flex flex-col">
      <div class="flex items-center space-x-2 mb-3">
        <div class="flex items-center text-red-600/60">
          <MapPin class="w-3.5 h-3.5" />
        </div>
        <span
          class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest"
          >{{ tour.location || "North Sulawesi" }}</span
        >
      </div>

      <h3
        class="text-xl font-black text-slate-900 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-red-600 transition-colors"
      >
        {{ tour.title }}
      </h3>

      <p
        class="text-slate-500 dark:text-slate-400 text-xs mb-8 line-clamp-2 leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity"
      >
        {{ cleanDescription }}
      </p>

      <div
        class="mt-auto pt-6 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between"
      >
        <div class="flex flex-col">
          <span
            class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1"
            >{{ ctaLabel }}</span
          >
          <span
            class="text-base font-black text-slate-900 dark:text-white group-hover:text-red-600 transition-colors"
            >{{ subtitleLabel }}</span
          >
        </div>

        <div
          class="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-300"
        >
          <ArrowUpRight class="w-6 h-6" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MapPin, Clock, ArrowRight } from "lucide-vue-next";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { stripHtml } from "@/utils/htmlText";

const props = defineProps({
  tour: {
    type: Object,
    required: true,
  },
  detailBasePath: {
    type: String,
    default: "/tour",
  },
});

const detailHref = computed(() => {
  const base = props.detailBasePath.endsWith("/")
    ? props.detailBasePath.slice(0, -1)
    : props.detailBasePath;
  return `${base}/${props.tour.slug}`;
});

const { locale, t } = useI18n();
const isId = computed(() => locale.value === "id");

const ctaLabel = computed(() => (isId.value ? "Info" : "Info"));
const subtitleLabel = computed(() => t("tour.viewDetails"));
const cleanDescription = computed(() => stripHtml(props.tour?.description || ""));

const durationLabel = computed(() => {
  const t = props.tour || {};

  const min = Number(t.duration_hours_min || 0);
  const max = Number(t.duration_hours_max || 0);
  const hours = Number(t.duration_hours || 0);

  if (min && max)
    return isId.value ? `${min}-${max} Jam` : `${min}-${max} Hours`;
  if (hours) return isId.value ? `${hours} Jam` : `${hours} Hours`;
  if (min) return isId.value ? `${min} Jam` : `${min} Hours`;
  if (max) return isId.value ? `${max} Jam` : `${max} Hours`;

  const days = t.duration_days ?? 0;
  const nights = t.duration_nights ?? 0;
  return `${days}D / ${nights}N`;
});
</script>
