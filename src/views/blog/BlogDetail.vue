<template>
  <div class="selection:bg-red-100 selection:text-red-700 font-sans min-h-screen bg-slate-50">
    <!-- Loading State -->
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
      <div class="inline-block animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-red-600"></div>
    </div>

    <!-- Content -->
    <div v-else-if="post">
      <!-- Hero Section -->
      <header class="relative pt-32 pb-16 lg:pt-40 lg:pb-24 px-6 lg:px-10 overflow-hidden bg-slate-900">
        <div class="absolute inset-0 z-0">
          <img
            :src="post.featured_image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=2400&q=80'"
            :alt="getPostTitle()"
            class="w-full h-full object-cover opacity-40"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/90 to-slate-900/70"></div>
        </div>

        <div class="relative z-10 max-w-4xl mx-auto">
          <!-- Category Badge -->
          <div v-if="post.category" class="mb-6">
            <span class="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-white backdrop-blur-md">
              <Tag class="w-4 h-4 text-red-400" />
              <span class="text-xs font-black uppercase tracking-[0.24em]">
                {{ getCategoryName() }}
              </span>
            </span>
          </div>

          <!-- Title -->
          <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-8">
            {{ getPostTitle() }}
          </h1>

          <!-- Meta Info -->
          <div class="flex flex-wrap items-center gap-6 text-white/70">
            <div class="flex items-center gap-2">
              <User class="w-5 h-5" />
              <span class="font-medium">{{ post.author || 'Admin' }}</span>
            </div>
            <div class="flex items-center gap-2">
              <Calendar class="w-5 h-5" />
              <span class="font-medium">{{ formatDate(post.published_at || post.created_at) }}</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Article + Sidebar Layout -->
      <div class="py-16 lg:py-24 px-6 lg:px-10">
        <div class="max-w-7xl mx-auto">
          <div class="flex flex-col lg:flex-row gap-12 xl:gap-16 items-start">

            <!-- Main Article Content -->
            <article class="flex-1 min-w-0">
              <!-- Excerpt -->
              <div v-if="getPostExcerpt()" class="mb-12 p-8 bg-red-50 border-l-4 border-red-600 rounded-r-2xl">
                <p class="text-lg text-slate-700 leading-relaxed font-medium italic">
                  {{ getPostExcerpt() }}
                </p>
              </div>

              <!-- Content -->
              <div class="blog-content" v-html="getPostContent()"></div>

              <!-- Share Section -->
              <div class="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
                <h3 class="text-xl font-black text-slate-900 dark:text-white mb-6">{{ $t('blogDetail.share.title') }}</h3>
                <div class="flex flex-wrap gap-3">
                  <a
                    :href="`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-blue-700 transition-colors"
                  >
                    <Share2 class="w-4 h-4" />
                    Facebook
                  </a>
                  <a
                    :href="`https://wa.me/?text=${encodeURIComponent(getPostTitle() + ' ' + currentUrl)}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full font-bold text-sm hover:bg-green-700 transition-colors"
                  >
                    <Share2 class="w-4 h-4" />
                    WhatsApp
                  </a>
                  <button
                    @click="copyLink"
                    class="flex items-center gap-2 px-6 py-3 bg-slate-600 text-white rounded-full font-bold text-sm hover:bg-slate-700 transition-colors"
                  >
                    <Copy class="w-4 h-4" />
                    {{ copied ? $t('blogDetail.share.copied') : $t('blogDetail.share.copy') }}
                  </button>
                </div>
              </div>

              <!-- Back to Blog -->
              <div class="mt-10">
                <router-link
                  to="/blog"
                  class="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-full font-bold text-sm hover:bg-red-700 transition-colors uppercase tracking-wider"
                >
                  <ArrowLeft class="w-5 h-5" />
                  {{ $t('blogDetail.backToBlog') }}
                </router-link>
              </div>
            </article>

            <!-- Sidebar: Related Articles -->
            <aside v-if="relatedPosts.length > 0" class="w-full lg:w-80 xl:w-96 flex-shrink-0 lg:sticky lg:top-28">
              <div class="mb-6 flex items-center gap-3">
                <div class="w-1 h-6 bg-red-600 rounded-full"></div>
                <h2 class="text-lg font-black text-slate-900 text-black uppercase tracking-widest">
                  {{ $t('blogDetail.related.title') }}
                </h2>
              </div>

              <div class="space-y-4">
                <!-- First related post — featured card -->
                <article
                  class="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700"
                >
                  <div class="relative aspect-[16/9] overflow-hidden">
                    <img
                      :src="relatedPosts[0].featured_image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80'"
                      :alt="getRelatedPostTitle(relatedPosts[0])"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div v-if="relatedPosts[0].category" class="absolute top-3 left-3">
                      <span class="px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                        {{ relatedPosts[0].category?.name }}
                      </span>
                    </div>
                  </div>
                  <div class="p-5">
                    <div class="text-xs text-slate-400 dark:text-slate-500 mb-2">
                      Post by {{ relatedPosts[0].author || 'admin' }} · {{ formatDate(relatedPosts[0].published_at || relatedPosts[0].created_at) }}
                    </div>
                    <h3 class="font-black text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-red-600 transition-colors">
                      {{ getRelatedPostTitle(relatedPosts[0]) }}
                    </h3>
                    <router-link
                      :to="'/blog/' + relatedPosts[0].slug"
                      class="inline-flex items-center gap-1.5 text-xs font-black text-red-600 hover:text-red-700 uppercase tracking-widest transition-colors"
                    >
                      {{ $t('blogDetail.related.readMore') }}
                      <ArrowRight class="w-3.5 h-3.5" />
                    </router-link>
                  </div>
                </article>

                <!-- Remaining related posts — compact list -->
                <article
                  v-for="relatedPost in relatedPosts.slice(1)"
                  :key="relatedPost.id"
                  class="group flex gap-4 bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 dark:border-slate-700"
                >
                  <div class="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      :src="relatedPost.featured_image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=400&q=80'"
                      :alt="getRelatedPostTitle(relatedPost)"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="text-[10px] text-slate-400 dark:text-slate-500 mb-1">
                      {{ formatDate(relatedPost.published_at || relatedPost.created_at) }}
                    </div>
                    <h3 class="text-sm font-black text-slate-900 dark:text-white leading-tight mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                      {{ getRelatedPostTitle(relatedPost) }}
                    </h3>
                    <router-link
                      :to="'/blog/' + relatedPost.slug"
                      class="inline-flex items-center gap-1 text-[10px] font-black text-red-600 hover:text-red-700 uppercase tracking-widest transition-colors"
                    >
                      {{ $t('blogDetail.related.readMore') }}
                      <ArrowRight class="w-3 h-3" />
                    </router-link>
                  </div>
                </article>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="min-h-screen flex items-center justify-center px-6">
      <div class="text-center">
        <h2 class="text-4xl font-black text-slate-900 mb-4">{{ $t('blogDetail.notFound.title') }}</h2>
        <p class="text-lg text-slate-600 mb-8">{{ $t('blogDetail.notFound.description') }}</p>
        <router-link
          to="/blog"
          class="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-full font-bold text-sm hover:bg-red-700 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft class="w-5 h-5" />
          {{ $t('blogDetail.backToBlog') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Tag, User, Calendar, Share2, Copy, ArrowRight, ArrowLeft } from 'lucide-vue-next';
import { getBlogPostDetail, getBlogPosts } from '@/services/api';

const route = useRoute();
const { locale } = useI18n();

const post = ref(null);
const relatedPosts = ref([]);
const loading = ref(true);
const copied = ref(false);

const currentUrl = computed(() => window.location.href);

const getCategoryName = () => {
  if (!post.value?.category) return '';
  const key = locale.value === 'en' ? 'name_en' : locale.value === 'ko' ? 'name_ko' : locale.value === 'zh' ? 'name_zh' : 'name';
  return post.value.category[key] || post.value.category.name;
};

const getPostTitle = () => {
  if (!post.value) return '';
  const key = locale.value === 'en' ? 'title_en' : locale.value === 'ko' ? 'title_ko' : locale.value === 'zh' ? 'title_zh' : 'title';
  return post.value[key] || post.value.title;
};

const getPostExcerpt = () => {
  if (!post.value) return '';
  const key = locale.value === 'en' ? 'excerpt_en' : locale.value === 'ko' ? 'excerpt_ko' : locale.value === 'zh' ? 'excerpt_zh' : 'excerpt';
  return post.value[key] || post.value.excerpt || '';
};

const getPostContent = () => {
  if (!post.value) return '';
  const key = locale.value === 'en' ? 'content_en' : locale.value === 'ko' ? 'content_ko' : locale.value === 'zh' ? 'content_zh' : 'content';
  return post.value[key] || post.value.content || '';
};

const getRelatedPostTitle = (relatedPost) => {
  const key = locale.value === 'en' ? 'title_en' : locale.value === 'ko' ? 'title_ko' : locale.value === 'zh' ? 'title_zh' : 'title';
  return relatedPost[key] || relatedPost.title;
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString(locale.value === 'id' ? 'id-ID' : locale.value === 'ko' ? 'ko-KR' : locale.value === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(currentUrl.value);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (error) {
    console.error('Failed to copy:', error);
  }
};

const fetchPost = async () => {
  loading.value = true;
  try {
    const res = await getBlogPostDetail(route.params.slug);
    post.value = res.data?.data || null;
    
    // Fetch related posts
    if (post.value?.category_id) {
      const relatedRes = await getBlogPosts({
        category_id: post.value.category_id,
        per_page: 3,
        published_only: true,
      });
      relatedPosts.value = (relatedRes.data?.data?.data || []).filter(p => p.id !== post.value.id).slice(0, 3);
    }
  } catch (error) {
    console.error('Error fetching post:', error);
    post.value = null;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPost();
});
</script>

<style scoped>
/* ── Base typography ── */
.blog-content :deep(h2) {
  font-size: 1.75rem;
  font-weight: 900;
  color: rgb(15 23 42);
  margin: 2rem 0 0.75rem;
  line-height: 1.25;
  letter-spacing: -0.02em;
}
.blog-content :deep(h3) {
  font-size: 1.35rem;
  font-weight: 900;
  color: rgb(15 23 42);
  margin: 1.5rem 0 0.5rem;
  line-height: 1.25;
}
.blog-content :deep(p) {
  margin: 0 0 1rem;
  line-height: 1.85;
  color: rgb(71 85 105);
  overflow: hidden;
}
.blog-content :deep(a) {
  color: rgb(220 38 38);
  text-decoration: underline;
}
.blog-content :deep(strong) {
  font-weight: 700;
  color: rgb(15 23 42);
}
.blog-content :deep(em) {
  font-style: italic;
}
.blog-content :deep(ul),
.blog-content :deep(ol) {
  margin: 0 0 1rem 1.5rem;
  color: rgb(71 85 105);
}
.blog-content :deep(ul) { list-style-type: disc; }
.blog-content :deep(ol) { list-style-type: decimal; }
.blog-content :deep(li) {
  margin-bottom: 0.4rem;
  line-height: 1.75;
}
.blog-content :deep(blockquote) {
  border-left: 4px solid rgb(220 38 38);
  padding: 0.75rem 1.25rem;
  margin: 1.25rem 0;
  background: rgb(254 242 242);
  border-radius: 0 0.75rem 0.75rem 0;
  color: rgb(71 85 105);
  font-style: italic;
}

/* ── Dark mode ── */

/* ── CKEditor figure/image ── */
.blog-content :deep(figure.image) {
  display: block;
  clear: both;
  margin: 1.25rem auto;
  max-width: 100%;
}
.blog-content :deep(figure.image img) {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 0.75rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}
.blog-content :deep(figure.image figcaption) {
  font-size: 0.85rem;
  color: rgb(100 116 139);
  margin-top: 0.5rem;
  font-style: italic;
  text-align: center;
}

/* Alignment classes */
.blog-content :deep(figure.image.image-style-align-left) {
  float: left;
  margin-right: 1.5rem;
  margin-left: 0;
}
.blog-content :deep(figure.image.image-style-align-right) {
  float: right;
  margin-left: 1.5rem;
  margin-right: 0;
}
.blog-content :deep(figure.image.image-style-align-center),
.blog-content :deep(figure.image.image-style-block-align-center) {
  margin-left: auto;
  margin-right: auto;
}
.blog-content :deep(figure.image.image-style-side) {
  float: right;
  margin-left: 1.5rem;
  width: 50% !important;
}

/* Inline image */
.blog-content :deep(span.image-inline) {
  display: inline-block;
}
.blog-content :deep(span.image-inline img) {
  border-radius: 0.5rem;
  width: auto;
}

.blog-content :deep(img) {
  max-width: 100%;
  border-radius: 0.75rem;
}
</style>
