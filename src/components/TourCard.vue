<template>
  <div
    class="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 overflow-hidden flex flex-col h-full relative"
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
          class="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded-xl uppercase tracking-[0.15em] shadow-lg shadow-blue-600/20 backdrop-blur-md"
        >
          {{ tour.category?.name }}
        </div>
      </div>

      <div class="absolute top-6 right-6">
        <div
          class="flex items-center space-x-1 px-4 py-1.5 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black rounded-xl shadow-lg uppercase tracking-wider"
        >
          <Clock class="w-3 h-3 text-blue-600" />
          <span>{{ durationLabel }}</span>
        </div>
      </div>

      <!-- Quick Action Button (Visible on Hover) -->
      <div
        class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0"
      >
        <router-link
          :to="detailHref"
          class="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center group/btn"
        >
          View Details
          <ArrowRight
            class="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
          />
        </router-link>
      </div>
    </div>

    <!-- Content Body -->
    <div class="p-8 flex-1 flex flex-col">
      <div class="flex items-center space-x-2 mb-3">
        <div class="flex items-center text-blue-600/60">
          <MapPin class="w-3.5 h-3.5" />
        </div>
        <span
          class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
          >{{ tour.location || "North Sulawesi" }}</span
        >
      </div>

      <h3
        class="text-xl font-black text-slate-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors"
      >
        {{ tour.title }}
      </h3>

      <p
        class="text-slate-500 text-xs mb-8 line-clamp-2 leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity"
      >
        {{ tour.description }}
      </p>

      <!-- Footer Price -->
      <div
        class="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between"
      >
        <div class="flex flex-col">
          <span
            class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1"
            >{{ tour.base_price ? "Starting From" : "Contact for Price" }}</span
          >
          <div v-if="tour.base_price" class="flex items-baseline space-x-1">
            <span class="text-xs font-black text-blue-600">IDR</span>
            <span
              class="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors"
              >{{ formatPrice(tour.base_price) }}</span
            >
          </div>
          <div v-else class="flex items-baseline space-x-1">
            <span
              class="text-sm font-black text-blue-600 uppercase tracking-widest"
              >Inquiry Now</span
            >
          </div>
        </div>

        <div
          class="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
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

const { locale } = useI18n();

const durationLabel = computed(() => {
  const t = props.tour || {};
  const isId = locale.value === "id";

  const min = Number(t.duration_hours_min || 0);
  const max = Number(t.duration_hours_max || 0);
  const hours = Number(t.duration_hours || 0);

  if (min && max) return isId ? `${min}-${max} Jam` : `${min}-${max} Hours`;
  if (hours) return isId ? `${hours} Jam` : `${hours} Hours`;
  if (min) return isId ? `${min} Jam` : `${min} Hours`;
  if (max) return isId ? `${max} Jam` : `${max} Hours`;

  const days = t.duration_days ?? 0;
  const nights = t.duration_nights ?? 0;
  return `${days}D / ${nights}N`;
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID").format(price);
};
</script>
