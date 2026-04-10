<template>
  <div :class="wrapperClass">
    <div
      class="relative overflow-hidden"
      :class="mainClass"
      tabindex="0"
      @keydown.left.prevent="prev"
      @keydown.right.prevent="next"
    >
      <img
        :src="currentImage"
        :alt="alt"
        class="absolute inset-0 w-full h-full object-cover"
        :class="imgClass"
        draggable="false"
      />

      <div v-if="overlay" class="absolute inset-0">
        <div
          class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"
        ></div>
      </div>

      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute inset-0 pointer-events-auto">
          <slot />
        </div>
      </div>

      <div
        v-if="showControls && normalizedImages.length > 1"
        class="absolute inset-0 flex items-center justify-between px-4"
      >
        <button
          type="button"
          class="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
          @click="prev"
        >
          <ChevronLeft class="w-6 h-6" />
        </button>
        <button
          type="button"
          class="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
          @click="next"
        >
          <ChevronRight class="w-6 h-6" />
        </button>
      </div>

      <div
        v-if="showCounter && normalizedImages.length > 1"
        class="absolute top-5 right-5 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white text-[10px] font-black uppercase tracking-widest"
      >
        {{ displayIndex }} / {{ normalizedImages.length }}
      </div>

      <div
        v-if="
          showThumbnails &&
          thumbnailsPlacement === 'inside-bottom' &&
          normalizedImages.length > 1
        "
        class="absolute bottom-5 left-5 right-5"
      >
        <div
          class="p-3 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 overflow-x-auto"
        >
          <div class="flex gap-3">
            <button
              v-for="(img, idx) in normalizedImages"
              :key="`${img}-${idx}`"
              type="button"
              class="relative rounded-2xl overflow-hidden border shrink-0 transition-colors"
              :class="[
                thumbnailClass,
                idx === safeIndex
                  ? 'border-red-400 ring-2 ring-red-400/30'
                  : 'border-white/20 hover:border-white/40',
              ]"
              @click="setIndex(idx)"
            >
              <img :src="img" :alt="alt" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="
        showThumbnails &&
        thumbnailsPlacement === 'below' &&
        normalizedImages.length > 1
      "
      class="mt-4 flex gap-3 overflow-x-auto pb-1"
    >
      <button
        v-for="(img, idx) in normalizedImages"
        :key="`${img}-${idx}`"
        type="button"
        class="relative rounded-2xl overflow-hidden border shrink-0 transition-colors"
        :class="[
          thumbnailClass,
          idx === safeIndex
            ? 'border-red-600 ring-2 ring-red-600/20'
            : 'border-slate-200 hover:border-slate-300',
        ]"
        @click="setIndex(idx)"
      >
        <img :src="img" :alt="alt" class="w-full h-full object-cover" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

const props = defineProps({
  images: { type: Array, default: () => [] },
  modelValue: { type: Number, default: 0 },
  alt: { type: String, default: "Image" },
  wrapperClass: { type: String, default: "" },
  mainClass: { type: String, default: "aspect-square rounded-2xl" },
  imgClass: { type: String, default: "" },
  overlay: { type: Boolean, default: false },
  showThumbnails: { type: Boolean, default: true },
  showControls: { type: Boolean, default: true },
  showCounter: { type: Boolean, default: true },
  thumbnailsPlacement: { type: String, default: "below" },
  thumbnailClass: { type: String, default: "w-20 h-20" },
  placeholder: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2400&q=80",
  },
});

const emit = defineEmits(["update:modelValue"]);

const normalizedImages = computed(() => {
  const arr = Array.isArray(props.images) ? props.images : [];
  const cleaned = arr.map((x) => String(x || "").trim()).filter(Boolean);
  return cleaned.length ? cleaned : [props.placeholder];
});

const safeIndex = computed(() => {
  const max = normalizedImages.value.length - 1;
  const raw = Number(props.modelValue || 0);
  if (Number.isNaN(raw)) return 0;
  return Math.min(Math.max(raw, 0), max);
});

const currentImage = computed(() => normalizedImages.value[safeIndex.value]);
const displayIndex = computed(() => safeIndex.value + 1);

const setIndex = (idx) => {
  emit("update:modelValue", idx);
};

const prev = () => {
  const total = normalizedImages.value.length;
  if (total <= 1) return;
  setIndex((safeIndex.value - 1 + total) % total);
};

const next = () => {
  const total = normalizedImages.value.length;
  if (total <= 1) return;
  setIndex((safeIndex.value + 1) % total);
};
</script>
