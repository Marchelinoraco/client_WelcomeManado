<template>
  <div class="min-h-screen bg-slate-50">
    <section class="relative px-6 lg:px-10 bg-slate-900 overflow-hidden">
      <div class="absolute inset-0 -z-10">
        <div
          class="absolute -top-24 left-1/2 -translate-x-1/2 h-80 w-[36rem] rounded-full bg-red-500/10 blur-3xl"
        ></div>
        <div
          class="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-white/5 blur-3xl"
        ></div>
        <div
          class="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950"
        ></div>
      </div>

      <div
        class="max-w-[95rem] mx-auto pt-28 pb-16 lg:pt-36 lg:pb-20 text-center"
      >
        <div
          class="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 shadow-lg shadow-black/20"
        >
          <ImageIcon class="w-4 h-4 text-red-300" />
          <span
            class="text-xs font-black text-white uppercase tracking-[0.3em]"
          >
            {{ $t("galleryPage.hero.badge") }}
          </span>
        </div>

        <h2
          class="mt-8 text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.95]"
        >
          {{ $t("galleryPage.hero.titlePrefix") }}
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-600"
            >{{ $t("galleryPage.hero.titleHighlight") }}</span
          >
        </h2>

        <p
          class="mt-6 text-white/75 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          {{ $t("galleryPage.hero.description") }}
        </p>

        <div class="mt-10 flex items-center justify-center gap-3">
          <div class="h-px w-12 bg-white/15"></div>
          <div
            class="h-1 w-24 bg-gradient-to-r from-red-500 to-red-700 rounded-full"
          ></div>
          <div class="h-px w-12 bg-white/15"></div>
        </div>
      </div>
    </section>

    <section class="pt-8 lg:pt-10 pb-10">
      <div class="max-w-[95rem] mx-auto px-6 lg:px-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div class="lg:col-span-12">
            <ImageCarousel
              v-model="heroIndex"
              :images="heroImages"
              :alt="$t('galleryPage.hero.carouselAlt')"
              :overlay="true"
              :showThumbnails="false"
              :showCounter="true"
              :showControls="true"
              mainClass="aspect-[16/10] rounded-[2.75rem] border border-white/10 shadow-2xl shadow-slate-900/10"
            >
              <div class="absolute inset-0 flex items-end p-7 lg:p-10">
                <div class="max-w-xl">
                  <div
                    class="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15"
                  >
                    <span
                      class="text-[10px] font-black uppercase tracking-widest text-white/90"
                      >{{ $t("galleryPage.hero.cardBadge") }}</span
                    >
                  </div>
                  <h1
                    class="mt-5 text-4xl lg:text-5xl font-black text-white leading-tight"
                  >
                    {{ $t("galleryPage.hero.cardTitle") }}
                  </h1>
                  <p class="mt-4 text-white/80 font-medium leading-relaxed">
                    {{ $t("galleryPage.hero.cardDescription") }}
                  </p>
                </div>
              </div>
            </ImageCarousel>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-20">
      <div class="max-w-[95rem] mx-auto px-6 lg:px-10">
        <div id="photos">
          <div class="flex items-end justify-between gap-6">
            <div>
              <div
                class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
              >
                {{ $t("galleryPage.sections.collection") }}
              </div>
              <div class="text-2xl lg:text-3xl font-black text-slate-900">
                {{ $t("galleryPage.sections.photosTitle") }}
              </div>
              <div class="mt-2 text-slate-600 font-medium">
                {{ $t("galleryPage.sections.photosDescription") }}
              </div>
            </div>
            <div
              class="hidden sm:flex items-center px-4 py-2 rounded-full bg-white border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500"
            >
              {{ $t("galleryPage.sections.total") }}:
              {{ loadingPhotos ? "..." : photoMeta.total }}
            </div>
          </div>

          <div class="mt-6">
            <div
              v-if="loadingPhotos"
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <div
                v-for="i in 6"
                :key="`p-skel-${i}`"
                class="h-72 rounded-[2rem] bg-white border border-slate-100 animate-pulse"
              ></div>
            </div>

            <div
              v-else-if="photoItems.length === 0"
              class="bg-white border border-slate-100 rounded-[2.5rem] p-10 text-center"
            >
              <div
                class="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto"
              >
                <ImageIcon class="w-6 h-6 text-slate-400" />
              </div>
              <div class="mt-4 text-xl font-black text-slate-900">
                {{ $t("galleryPage.empty.photosTitle") }}
              </div>
              <div class="mt-2 text-slate-500 font-medium">
                {{ $t("galleryPage.empty.photosDescription") }}
              </div>
            </div>

            <div
              v-else
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <GalleryItemCard
                v-for="it in photoItems"
                :key="`photo-${it.id}`"
                :item="it"
                @open="openItem"
              />
            </div>

            <div
              v-if="!loadingPhotos && photoMeta.last_page > 1"
              class="mt-10 flex items-center justify-center gap-3"
            >
              <button
                type="button"
                @click="goPhotoPage(photoPage - 1)"
                :disabled="photoPage <= 1"
                class="px-5 py-3 rounded-2xl bg-white border border-slate-100 text-slate-700 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ $t("galleryPage.pagination.prev") }}
              </button>
              <div
                class="px-5 py-3 rounded-2xl bg-white border border-slate-100 text-xs font-black text-slate-500 uppercase tracking-widest"
              >
                {{
                  $t("galleryPage.pagination.pageOf", {
                    page: photoPage,
                    total: photoMeta.last_page,
                  })
                }}
              </div>
              <button
                type="button"
                @click="goPhotoPage(photoPage + 1)"
                :disabled="photoPage >= photoMeta.last_page"
                class="px-5 py-3 rounded-2xl bg-white border border-slate-100 text-slate-700 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ $t("galleryPage.pagination.next") }}
              </button>
            </div>
          </div>
        </div>

        <div id="videos" class="mt-16">
          <div class="flex items-end justify-between gap-6">
            <div>
              <div
                class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
              >
                {{ $t("galleryPage.sections.collection") }}
              </div>
              <div class="text-2xl lg:text-3xl font-black text-slate-900">
                {{ $t("galleryPage.sections.videosTitle") }}
              </div>
              <div class="mt-2 text-slate-600 font-medium">
                {{ $t("galleryPage.sections.videosDescription") }}
              </div>
            </div>
            <div
              class="hidden sm:flex items-center px-4 py-2 rounded-full bg-white border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500"
            >
              {{ $t("galleryPage.sections.total") }}:
              {{ loadingVideos ? "..." : videoMeta.total }}
            </div>
          </div>

          <div class="mt-6">
            <div
              v-if="loadingVideos"
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <div
                v-for="i in 6"
                :key="`v-skel-${i}`"
                class="h-72 rounded-[2rem] bg-white border border-slate-100 animate-pulse"
              ></div>
            </div>

            <div
              v-else-if="videoItems.length === 0"
              class="bg-white border border-slate-100 rounded-[2.5rem] p-10 text-center"
            >
              <div
                class="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto"
              >
                <Play class="w-6 h-6 text-slate-400" />
              </div>
              <div class="mt-4 text-xl font-black text-slate-900">
                {{ $t("galleryPage.empty.videosTitle") }}
              </div>
              <div class="mt-2 text-slate-500 font-medium">
                {{ $t("galleryPage.empty.videosDescription") }}
              </div>
            </div>

            <div
              v-else
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <GalleryItemCard
                v-for="it in videoItems"
                :key="`video-${it.id}`"
                :item="it"
                @open="openItem"
              />
            </div>

            <div
              v-if="!loadingVideos && videoMeta.last_page > 1"
              class="mt-10 flex items-center justify-center gap-3"
            >
              <button
                type="button"
                @click="goVideoPage(videoPage - 1)"
                :disabled="videoPage <= 1"
                class="px-5 py-3 rounded-2xl bg-white border border-slate-100 text-slate-700 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ $t("galleryPage.pagination.prev") }}
              </button>
              <div
                class="px-5 py-3 rounded-2xl bg-white border border-slate-100 text-xs font-black text-slate-500 uppercase tracking-widest"
              >
                {{
                  $t("galleryPage.pagination.pageOf", {
                    page: videoPage,
                    total: videoMeta.last_page,
                  })
                }}
              </div>
              <button
                type="button"
                @click="goVideoPage(videoPage + 1)"
                :disabled="videoPage >= videoMeta.last_page"
                class="px-5 py-3 rounded-2xl bg-white border border-slate-100 text-slate-700 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ $t("galleryPage.pagination.next") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Teleport to="body">
      <div v-if="activeItem" class="fixed inset-0 z-[1100]">
        <div
          class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          @click="closeModal"
        ></div>
        <div class="absolute inset-0 flex items-center justify-center p-5">
          <div
            class="w-full max-w-4xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20"
          >
            <div class="px-7 py-6 border-b border-slate-100 flex items-start">
              <div class="flex-1 min-w-0">
                <div class="text-xl font-black text-slate-900 truncate">
                  {{ activeItem.title }}
                </div>
                <div
                  v-if="activeItem.video_name || activeItem.youtube_url"
                  class="text-sm font-bold text-slate-500 mt-1 truncate"
                >
                  {{
                    activeItem.video_name ||
                    $t("galleryPage.modal.youtubeFallback")
                  }}
                </div>
              </div>
              <button
                class="w-11 h-11 rounded-2xl bg-slate-50 text-slate-500 hover:bg-slate-100 flex items-center justify-center transition-all shrink-0"
                @click="closeModal"
              >
                <X class="w-5 h-5" />
              </button>
            </div>

            <div class="p-6">
              <div
                v-if="activeYoutubeId"
                class="relative aspect-video rounded-2xl overflow-hidden bg-slate-900"
              >
                <iframe
                  class="absolute inset-0 w-full h-full"
                  :src="`https://www.youtube.com/embed/${activeYoutubeId}`"
                  :title="$t('galleryPage.modal.youtubeFallback')"
                  frameborder="0"
                  allow="
                    accelerometer;
                    autoplay;
                    clipboard-write;
                    encrypted-media;
                    gyroscope;
                    picture-in-picture;
                    web-share;
                  "
                  allowfullscreen
                ></iframe>
              </div>

              <div v-else class="rounded-2xl overflow-hidden bg-slate-100">
                <img
                  v-if="activeCoverSrc"
                  :src="activeCoverSrc"
                  :alt="activeItem.title"
                  class="w-full h-auto object-cover"
                />
              </div>

              <div class="mt-5 flex items-center justify-between gap-3">
                <a
                  v-if="activeItem.youtube_url"
                  :href="activeItem.youtube_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center px-5 py-3 rounded-2xl bg-red-600 text-white font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all active:scale-95"
                >
                  <Play class="w-4 h-4 mr-2" />
                  {{ $t("galleryPage.modal.watchYoutube") }}
                </a>
                <div class="text-xs font-bold text-slate-400">
                  {{ $t("galleryPage.modal.clickOutsideClose") }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { Image as ImageIcon, X, Play } from "lucide-vue-next";
import { getGalleryItems } from "../../services/api";
import { autoTranslate } from "../../services/translate";
import GalleryItemCard from "../../components/GalleryItemCard.vue";
import ImageCarousel from "../../components/ImageCarousel.vue";

const { locale } = useI18n();
const heroIndex = ref(0);
const photoItems = ref([]);
const videoItems = ref([]);
const loadingPhotos = ref(false);
const loadingVideos = ref(false);
const activeItem = ref(null);
const photoPage = ref(1);
const videoPage = ref(1);
const perPage = 9;
const photoMeta = ref({ current_page: 1, last_page: 1, total: 0 });
const videoMeta = ref({ current_page: 1, last_page: 1, total: 0 });
const translatedCache = new Map();

const normalizeGalleryPayload = (payload) => {
  if (Array.isArray(payload)) {
    return {
      items: payload,
      meta: {
        current_page: 1,
        last_page: 1,
        total: payload.length,
      },
    };
  }

  return {
    items: payload?.data || [],
    meta: {
      current_page: payload?.current_page || 1,
      last_page: payload?.last_page || 1,
      total: payload?.total || 0,
    },
  };
};

const translateGalleryItems = async (items) => {
  const lang = locale.value;
  if (lang === "id") return items;

  return Promise.all(
    items.map(async (item) => {
      const cacheKey = `${lang}:${item.id}:${item.title || ""}:${
        item.video_name || ""
      }`;

      if (translatedCache.has(cacheKey)) {
        return translatedCache.get(cacheKey);
      }

      const [title, videoName] = await Promise.all([
        autoTranslate(item.title, lang),
        autoTranslate(item.video_name, lang),
      ]);
      const translated = {
        ...item,
        title,
        video_name: videoName,
      };

      translatedCache.set(cacheKey, translated);
      return translated;
    }),
  );
};

const fetchPhotos = async () => {
  loadingPhotos.value = true;
  try {
    const res = await getGalleryItems({
      active: 1,
      has_youtube: 0,
      page: photoPage.value,
      per_page: perPage,
    });
    const { items, meta } = normalizeGalleryPayload(res?.data?.data);
    photoItems.value = await translateGalleryItems(items);
    photoMeta.value = meta;
    photoPage.value = meta.current_page;
  } catch (e) {
    photoItems.value = [];
    photoMeta.value = { current_page: 1, last_page: 1, total: 0 };
  } finally {
    loadingPhotos.value = false;
  }
};

const fetchVideos = async () => {
  loadingVideos.value = true;
  try {
    const res = await getGalleryItems({
      active: 1,
      has_youtube: 1,
      page: videoPage.value,
      per_page: perPage,
    });
    const { items, meta } = normalizeGalleryPayload(res?.data?.data);
    videoItems.value = await translateGalleryItems(items);
    videoMeta.value = meta;
    videoPage.value = meta.current_page;
  } catch (e) {
    videoItems.value = [];
    videoMeta.value = { current_page: 1, last_page: 1, total: 0 };
  } finally {
    loadingVideos.value = false;
  }
};

onMounted(async () => {
  await Promise.all([fetchPhotos(), fetchVideos()]);
});

watch(locale, async () => {
  activeItem.value = null;
  await Promise.all([fetchPhotos(), fetchVideos()]);
});

const goPhotoPage = async (p) => {
  const next = Math.max(1, Math.min(photoMeta.value.last_page || 1, p));
  if (next === photoPage.value) return;
  photoPage.value = next;
  await fetchPhotos();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const goVideoPage = async (p) => {
  const next = Math.max(1, Math.min(videoMeta.value.last_page || 1, p));
  if (next === videoPage.value) return;
  videoPage.value = next;
  await fetchVideos();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const openItem = (it) => {
  activeItem.value = it;
};

const closeModal = () => {
  activeItem.value = null;
};

const extractYoutubeId = (url) => {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be"))
      return u.pathname.replace("/", "") || null;
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const parts = u.pathname.split("/").filter(Boolean);
    const embedIdx = parts.indexOf("embed");
    if (embedIdx >= 0 && parts[embedIdx + 1]) return parts[embedIdx + 1];
    return null;
  } catch {
    return null;
  }
};

const activeYoutubeId = computed(() =>
  extractYoutubeId(activeItem.value?.youtube_url),
);

const getCoverSrc = (it) => {
  if (it?.image_path) return it.image_path;
  const id = extractYoutubeId(it?.youtube_url);
  if (!id) return "";
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
};

const activeCoverSrc = computed(() => getCoverSrc(activeItem.value));

const heroImages = computed(() => {
  const merged = [...(photoItems.value || []), ...(videoItems.value || [])];
  const urls = merged.map(getCoverSrc).filter(Boolean);
  return urls.slice(0, 6);
});
</script>
