<template>
  <div
    class="group relative overflow-hidden rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all"
  >
    <button type="button" class="w-full text-left" @click="$emit('open', item)">
      <div class="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          v-if="coverSrc"
          :src="coverSrc"
          :alt="item?.title || 'Gallery image'"
          class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
          loading="lazy"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent opacity-80"
        ></div>

        <div class="absolute left-5 right-5 bottom-5">
          <div class="flex items-center justify-between gap-3">
            <div class="min-w-0">
              <div class="text-white font-black text-lg leading-tight truncate">
                {{ item?.title }}
              </div>
              <div
                v-if="item?.video_name || item?.youtube_url"
                class="text-white/80 text-xs font-bold mt-1 truncate"
              >
                {{ item?.video_name || "Video YouTube" }}
              </div>
            </div>

            <div
              v-if="item?.youtube_url"
              class="shrink-0 w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all"
            >
              <Play class="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { Play } from "lucide-vue-next";

const props = defineProps({
  item: Object,
});

defineEmits(["open"]);

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

const coverSrc = computed(() => {
  if (props.item?.image_path) return props.item.image_path;
  const id = extractYoutubeId(props.item?.youtube_url);
  if (!id) return "";
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
});
</script>
