<template>
  <div
    class="selection:bg-red-100 selection:text-red-700 font-sans min-h-screen bg-slate-50"
  >
    <div
      v-if="isLoading"
      class="flex items-center justify-center min-h-screen"
    >
      <div
        class="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"
      ></div>
    </div>

    <div v-else-if="hotel">
      <!-- Hero Section -->
      <div class="relative min-h-[72vh] lg:min-h-[82vh] group overflow-hidden">
        <img
          :src="hotel.heroImage"
          :alt="hotel.name"
          class="absolute inset-0 w-full h-full object-cover object-center scale-[1.03]"
        />
        <div
          class="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/15 to-transparent"
        ></div>
        <div
          class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-transparent"
        ></div>

        <div
          class="relative z-10 flex min-h-[72vh] lg:min-h-[82vh] items-end"
        >
          <div class="w-full max-w-7xl mx-auto px-6 lg:px-10 pb-10 lg:pb-16">
            <router-link
              to="/hotels"
              class="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white/80 hover:text-white hover:bg-white/15 mb-6 transition-colors uppercase tracking-widest text-xs font-bold backdrop-blur-md"
            >
              <ArrowLeft class="w-4 h-4 mr-2" />
              {{ $t("hotelDetail.back") }}
            </router-link>

            <div class="max-w-4xl">
              <div class="flex items-center space-x-2 mb-4">
                <div class="flex">
                  <Star
                    v-for="i in hotel.stars"
                    :key="i"
                    class="w-5 h-5 text-amber-500 fill-amber-500"
                  />
                </div>
                <span class="text-white font-bold ml-2">{{
                  $t("hotelDetail.starsLabel", { stars: hotel.stars })
                }}</span>
              </div>

              <h1
                class="text-4xl md:text-6xl xl:text-7xl font-black text-white tracking-tighter leading-[0.95] mb-4"
              >
                {{ hotel.name }}
              </h1>

              <div class="flex items-center text-white/85 space-x-2">
                <MapPin class="w-5 h-5 text-red-400 shrink-0" />
                <span class="text-lg font-medium">{{
                  hotel._location || hotel.location
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <!-- Left Column (Overview) -->
          <div class="lg:col-span-2 space-y-12">
            <section>
              <h2
                class="text-2xl font-black text-slate-900 mb-6 uppercase tracking-widest relative inline-block"
              >
                {{ $t("hotelDetail.overview") }}
                <div
                  class="absolute -bottom-2 left-0 w-1/2 h-1 bg-red-600 rounded-full"
                ></div>
              </h2>
              <div
                class="hotel-rich-content text-slate-600 text-lg leading-relaxed font-medium"
                v-html="hotel._descriptionHtml || hotel.descriptionHtml"
              ></div>
            </section>

            <section v-if="hotel.galleryImages?.length" class="space-y-6">
              <h2
                class="text-2xl font-black text-slate-900 uppercase tracking-widest relative inline-block"
              >
                Galeri Hotel
                <div
                  class="absolute -bottom-2 left-0 w-1/2 h-1 bg-red-600 rounded-full"
                ></div>
              </h2>

              <ImageCarousel
                v-model="galleryIndex"
                :images="hotel.galleryImages"
                :alt="hotel.name"
                main-class="aspect-[4/3] md:aspect-[16/10] rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm"
                thumbnail-class="w-20 h-20 sm:w-24 sm:h-24"
                :show-thumbnails="hotel.galleryImages.length > 1"
                :show-controls="hotel.galleryImages.length > 1"
                :show-counter="hotel.galleryImages.length > 1"
              />
            </section>

            <section
              v-if="hotel.amenities?.length"
              class="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-slate-200"
            >
              <div
                v-for="amenity in hotel.amenities"
                :key="amenity.id || amenity.label"
                class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center"
              >
                <component
                  :is="amenity.iconComponent"
                  class="w-8 h-8 text-red-600 mb-3"
                />
                <span class="font-bold text-slate-700 text-sm">
                  {{ amenity._label || amenity.label }}
                </span>
              </div>
            </section>
          </div>

          <!-- Right Column (Booking details) -->
          <div class="lg:col-span-1">
            <div
              class="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 sticky top-32"
            >
              <h3 class="text-xl font-black text-slate-900 mb-2">
                {{ $t("hotelDetail.booking.title") }}
              </h3>
              <p class="text-slate-500 text-sm mb-8 font-medium">
                {{ $t("hotelDetail.booking.subtitle") }}
              </p>

              <div class="space-y-4 mb-8">
                <div
                  class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl"
                >
                  <span class="text-slate-500 font-medium text-sm">{{
                    $t("hotelDetail.booking.checkIn")
                  }}</span>
                  <span class="font-bold text-slate-900 text-sm">14:00 PM</span>
                </div>
                <div
                  class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl"
                >
                  <span class="text-slate-500 font-medium text-sm">{{
                    $t("hotelDetail.booking.checkOut")
                  }}</span>
                  <span class="font-bold text-slate-900 text-sm">12:00 PM</span>
                </div>
              </div>

              <a
                :href="
                  'https://wa.me/6282173738822?text=Halo%20Welcome%20Manado,%20saya%20tertarik%20untuk%20memesan%20kamar%20di%20' +
                  hotel.name
                "
                target="_blank"
                class="w-full py-5 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-colors flex items-center justify-center shadow-lg shadow-red-600/20 active:scale-95"
              >
                <MessageCircle class="w-5 h-5 mr-3" />
                {{ $t("hotelDetail.booking.cta") }}
              </a>

              <p class="text-center text-xs text-slate-400 font-medium mt-6">
                {{ $t("hotelDetail.booking.fastResponse") }}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>

    <div
      v-else
      class="min-h-screen flex items-center justify-center px-6 text-center"
    >
      <div class="max-w-lg">
        <h1 class="text-3xl font-black text-slate-900 mb-3">
          Hotel tidak ditemukan
        </h1>
        <p class="text-slate-500 text-lg mb-8">
          Data hotel ini belum tersedia atau slug hotel berubah setelah admin
          memperbarui data.
        </p>
        <router-link
          to="/hotels"
          class="inline-flex items-center justify-center rounded-2xl bg-red-600 px-6 py-4 text-sm font-black uppercase tracking-widest text-white transition-colors hover:bg-red-700"
        >
          <ArrowLeft class="w-4 h-4 mr-2" />
          Kembali ke daftar hotel
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import ImageCarousel from "@/components/ImageCarousel.vue";
import { getHotelDetail, getHotels } from "@/services/api";
import { translateText } from "@/services/translate";
import { applySeo } from "@/utils/seo";
import { stripHtml } from "@/utils/htmlText";
import {
  Star,
  MapPin,
  ArrowLeft,
  MessageCircle,
  Coffee,
  Wifi,
  Car,
  Wind,
  CircleCheck,
  Waves,
  Dumbbell,
  Utensils,
  Tv,
  Bath,
  Plane,
  Users,
  ShieldCheck,
} from "lucide-vue-next";

const route = useRoute();
const { locale, t } = useI18n();
const hotel = ref(null);
const isLoading = ref(true);
const galleryIndex = ref(0);
const translatedCache = new Map();

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1551882547-ff40c0d588fa?auto=format&fit=crop&w=2400&q=80";

const FALLBACK_AMENITIES = [
  {
    id: "breakfast",
    labelKey: "hotelDetail.amenities.breakfast",
    icon: "breakfast",
  },
  { id: "wifi", labelKey: "hotelDetail.amenities.wifi", icon: "wifi" },
  { id: "parking", labelKey: "hotelDetail.amenities.parking", icon: "parking" },
  { id: "ac", labelKey: "hotelDetail.amenities.ac", icon: "ac" },
];

const AMENITY_ICON_MAP = {
  ac: Wind,
  air_conditioner: Wind,
  air_conditioning: Wind,
  airport: Plane,
  airport_transfer: Plane,
  bath: Bath,
  bathroom: Bath,
  breakfast: Coffee,
  car: Car,
  check: CircleCheck,
  default: CircleCheck,
  dining: Utensils,
  food: Utensils,
  gym: Dumbbell,
  meeting: Users,
  parking: Car,
  pool: Waves,
  restaurant: Utensils,
  security: ShieldCheck,
  shuttle: Plane,
  spa: Waves,
  swimming_pool: Waves,
  tv: Tv,
  wifi: Wifi,
};

const localeKey = (value) => {
  const loc = String(value || "").toLowerCase();
  if (loc.startsWith("ko")) return "ko";
  if (loc.startsWith("zh")) return "zh";
  if (loc.startsWith("en")) return "en";
  return "id";
};

const getLocalizedDescriptionFromRaw = (rawHotel, loc) => {
  const key = localeKey(loc);
  if (key === "en") return rawHotel.description_en || rawHotel.description || "";
  if (key === "ko") return rawHotel.description_ko || rawHotel.description || "";
  if (key === "zh") return rawHotel.description_zh || rawHotel.description || "";
  return rawHotel.description || "";
};

const hasHtmlContent = (value) => /<[^>]+>/.test(String(value || ""));

const plainTextToHtml = (value) => {
  const text = String(value || "").trim();
  if (!text) return "";

  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br>")}</p>`)
    .join("");
};

const slugifyAmenity = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const getLocalizedAmenityLabel = (item, loc) => {
  if (typeof item === "string") return item;
  if (item?.labelKey) return t(item.labelKey);

  const key = localeKey(loc);
  if (key === "en") {
    return item?.name_en || item?.label_en || item?.name || item?.label || "";
  }
  if (key === "ko") {
    return item?.name_ko || item?.label_ko || item?.name || item?.label || "";
  }
  if (key === "zh") {
    return item?.name_zh || item?.label_zh || item?.name || item?.label || "";
  }
  return item?.name_id || item?.label_id || item?.name || item?.label || "";
};

const resolveAmenityIcon = (amenity) => {
  const explicitIcon = slugifyAmenity(amenity.icon);
  const labelKey = slugifyAmenity(amenity.label);
  return (
    AMENITY_ICON_MAP[explicitIcon] ||
    AMENITY_ICON_MAP[labelKey] ||
    AMENITY_ICON_MAP.default
  );
};

const getAmenitySource = (rawHotel) => {
  if (Array.isArray(rawHotel?.facilities)) return rawHotel.facilities;
  if (Array.isArray(rawHotel?.amenities)) return rawHotel.amenities;
  if (Array.isArray(rawHotel?.hotel_facilities)) return rawHotel.hotel_facilities;
  if (Array.isArray(rawHotel?.facility)) return rawHotel.facility;
  if (Array.isArray(rawHotel?.amenity)) return rawHotel.amenity;
  if (Array.isArray(rawHotel?.fasilitas)) return rawHotel.fasilitas;

  const stringSource =
    rawHotel?.facilities ||
    rawHotel?.amenities ||
    rawHotel?.hotel_facilities ||
    rawHotel?.facility ||
    rawHotel?.amenity ||
    rawHotel?.fasilitas;

  if (typeof stringSource === "string") {
    return stringSource
      .split(/[\n,;|]+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  const objectSource =
    rawHotel?.facilities ||
    rawHotel?.amenities ||
    rawHotel?.hotel_facilities ||
    rawHotel?.facility ||
    rawHotel?.amenity ||
    rawHotel?.fasilitas;

  if (objectSource && typeof objectSource === "object") {
    return Object.entries(objectSource)
      .filter(([, value]) => Boolean(value))
      .map(([key, value]) => {
        if (typeof value === "string") return value;
        if (value && typeof value === "object") return value;
        return key;
      });
  }

  return FALLBACK_AMENITIES;
};

const normalizeAmenity = (item, index, loc) => {
  const source = item?.facility || item?.amenity || item;
  const label = getLocalizedAmenityLabel(source, loc);
  const cleanLabel = String(label || "").trim();

  if (!cleanLabel) return null;

  const normalized = {
    id:
      source?.id ||
      source?.slug ||
      source?.key ||
      slugifyAmenity(cleanLabel) ||
      index,
    label: cleanLabel,
    labelBase: source?.name || source?.label || cleanLabel,
    hasLocalizedLabel:
      localeKey(loc) === "en"
        ? Boolean(source?.name_en || source?.label_en)
        : localeKey(loc) === "ko"
          ? Boolean(source?.name_ko || source?.label_ko)
          : localeKey(loc) === "zh"
            ? Boolean(source?.name_zh || source?.label_zh)
            : true,
    icon:
      source?.icon ||
      source?.icon_name ||
      source?.type ||
      source?.slug ||
      source?.key ||
      cleanLabel,
  };

  return {
    ...normalized,
    iconComponent: resolveAmenityIcon(normalized),
  };
};

const normalizeAmenities = (rawHotel) => {
  const uniqueAmenities = new Map();

  getAmenitySource(rawHotel)
    .map((item, index) => normalizeAmenity(item, index, locale.value))
    .filter(Boolean)
    .forEach((amenity, index) => {
      const key = amenity.id || slugifyAmenity(amenity.label) || index;
      if (!uniqueAmenities.has(key)) {
        uniqueAmenities.set(key, amenity);
      }
    });

  return Array.from(uniqueAmenities.values());
};

const unwrapHotelPayload = (payload) => {
  if (!payload) return null;
  if (payload.data && !Array.isArray(payload.data)) return unwrapHotelPayload(payload.data);
  return payload;
};

const normalizeHotel = (rawHotel) => {
  if (!rawHotel) return null;
  const localizedDescription = getLocalizedDescriptionFromRaw(rawHotel, locale.value);
  const activeLocaleKey = localeKey(locale.value);

  const galleryImages = Array.from(
    new Set(
      [
        rawHotel.primary_image,
        rawHotel.thumbnail,
        rawHotel.image,
        ...(Array.isArray(rawHotel.images)
          ? rawHotel.images
              .sort((a, b) => {
                if (a?.is_primary === b?.is_primary) return 0;
                return a?.is_primary ? -1 : 1;
              })
              .map((img) => img?.image_path)
          : []),
      ]
        .map((image) => String(image || "").trim())
        .filter(Boolean),
    ),
  ).slice(0, 5);

  const heroImage = galleryImages[0] || FALLBACK_IMAGE;

  return {
    id: rawHotel.id,
    slug: rawHotel.slug,
    name: rawHotel.name || "Hotel",
    description: localizedDescription,
    descriptionBase: rawHotel.description || "",
    descriptionText: stripHtml(localizedDescription),
    descriptionHtml: hasHtmlContent(localizedDescription)
      ? localizedDescription || ""
      : plainTextToHtml(localizedDescription),
    hasLocalizedDescription:
      activeLocaleKey === "en"
        ? Boolean(rawHotel.description_en)
        : activeLocaleKey === "ko"
          ? Boolean(rawHotel.description_ko)
          : activeLocaleKey === "zh"
            ? Boolean(rawHotel.description_zh)
            : true,
    location: rawHotel.location || "",
    stars: Number(rawHotel.stars || 0),
    image: heroImage,
    heroImage,
    galleryImages: galleryImages.length ? galleryImages : [FALLBACK_IMAGE],
    amenities: normalizeAmenities(rawHotel),
  };
};

const findHotelFromCollection = async (slugOrId) => {
  const res = await getHotels();
  const arr = Array.isArray(res.data?.data?.data)
    ? res.data.data.data
    : Array.isArray(res.data?.data)
      ? res.data.data
      : [];

  const matched = arr.find(
    (item) => String(item.slug) === String(slugOrId) || String(item.id) === String(slugOrId),
  );

  return normalizeHotel(matched || null);
};

const loadHotel = async () => {
  isLoading.value = true;
  galleryIndex.value = 0;

  try {
    const slugId = route.params.id;
    let baseHotel = null;

    try {
      const response = await getHotelDetail(slugId);
      baseHotel = normalizeHotel(unwrapHotelPayload(response.data));
    } catch (error) {
      baseHotel = null;
    }

    if (!baseHotel) {
      baseHotel = await findHotelFromCollection(slugId);
    }

    if (!baseHotel) {
      hotel.value = null;
      applySeo({
        title: "Detail Hotel",
        description:
          "Lihat detail hotel, lokasi, fasilitas, dan informasi pemesanan hotel di WelcomeManado.",
        url: route.fullPath,
        type: "article",
      });
      return;
    }

    const lang = locale.value;
    const cacheKey = `${lang}:${baseHotel.slug || slugId}`;

    if (translatedCache.has(cacheKey)) {
      hotel.value = translatedCache.get(cacheKey);
      applySeo({
        title: hotel.value.name,
        description: hotel.value._description || hotel.value.descriptionText,
        image: hotel.value.heroImage,
        url: route.fullPath,
        type: "article",
      });
      return;
    }

    const canTranslateDescription =
      localeKey(lang) !== "id" &&
      !baseHotel.hasLocalizedDescription &&
      !hasHtmlContent(baseHotel.descriptionBase);

    const [desc, loc, translatedAmenities] = await Promise.all([
      canTranslateDescription
        ? translateText(stripHtml(baseHotel.descriptionBase), lang, "auto")
        : Promise.resolve(undefined),
      translateText(baseHotel.location, lang, "auto"),
      Promise.all(
        baseHotel.amenities.map(async (amenity) => {
          if (localeKey(lang) === "id" || amenity.hasLocalizedLabel) {
            return amenity;
          }

          const translatedLabel = await translateText(
            amenity.labelBase || amenity.label,
            lang,
            "auto",
          );

          return {
            ...amenity,
            _label: translatedLabel || amenity.label,
          };
        }),
      ),
    ]);

    const value = {
      ...baseHotel,
      _description: desc,
      _descriptionHtml: canTranslateDescription
        ? plainTextToHtml(desc)
        : undefined,
      _location: loc,
      amenities: translatedAmenities,
    };

    translatedCache.set(cacheKey, value);
    hotel.value = value;
    applySeo({
      title: value.name,
      description: value._description || value.descriptionText,
      image: value.heroImage,
      url: route.fullPath,
      type: "article",
    });
  } finally {
    isLoading.value = false;
    window.scrollTo(0, 0);
  }
};

onMounted(() => {
  loadHotel();
});

watch(
  () => [route.params.id, locale.value],
  () => {
    loadHotel();
  },
);
</script>

<style scoped>
.hotel-rich-content :deep(p) {
  margin: 0 0 1rem;
}

.hotel-rich-content :deep(ul),
.hotel-rich-content :deep(ol) {
  margin: 0 0 1rem 1.5rem;
}

.hotel-rich-content :deep(li) {
  margin-bottom: 0.5rem;
}

.hotel-rich-content :deep(h1),
.hotel-rich-content :deep(h2),
.hotel-rich-content :deep(h3),
.hotel-rich-content :deep(h4) {
  color: rgb(15 23 42);
  font-weight: 900;
  line-height: 1.2;
  margin: 0 0 1rem;
}

.hotel-rich-content :deep(a) {
  color: rgb(220 38 38);
  text-decoration: underline;
}
</style>
