<template>
  <div class="selection:bg-red-100 selection:text-red-700 font-sans min-h-screen bg-slate-50">
    <!-- Hero Header -->
    <header class="relative pt-40 pb-20 lg:pt-52 lg:pb-32 px-6 lg:px-10 overflow-hidden bg-slate-900">
      <div class="absolute inset-0 z-0 scale-105 animate-pulse" style="animation-duration: 20s">
        <img
          :src="heroImage?.image_url || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=2400&q=80'"
          class="w-full h-full object-cover opacity-30"
          alt="Blog"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto text-center">
        <div class="inline-flex items-center space-x-3 mb-6 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20">
          <BookOpen class="w-4 h-4 text-red-400" />
          <span class="text-xs font-black text-white uppercase tracking-[0.3em]">{{ $t('blogPage.hero.badge') }}</span>
        </div>
        <h1 class="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-8">
          {{ $t('blogPage.hero.title1') }}
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">{{ $t('blogPage.hero.title2') }}</span>
        </h1>
        <p class="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-medium">
          {{ $t('blogPage.hero.description') }}
        </p>
      </div>
    </header>

    <!-- Content Section -->
    <main class="py-20 lg:py-32 px-6 lg:px-10 max-w-7xl mx-auto">
      <!-- Search & Filter Section -->
      <div class="mb-20 space-y-10">
        <div class="max-w-2xl mx-auto">
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search class="w-6 h-6 text-slate-400 group-focus-within:text-red-600 transition-colors" />
            </div>
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="$t('blogPage.search.placeholder')"
              class="w-full pl-16 pr-6 py-5 bg-white border border-slate-200 rounded-[2rem] shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-red-900/10 focus:outline-none focus:ring-4 focus:ring-red-600/10 focus:border-red-600 transition-all text-slate-800 font-medium text-lg placeholder:text-slate-400"
            />
          </div>
        </div>

        <!-- Category Tabs -->
        <div class="flex flex-wrap justify-center gap-3">
          <button
            @click="selectedCategory = null"
            class="px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 border"
            :class="selectedCategory === null
              ? 'bg-red-600 text-white border-red-600 shadow-xl shadow-red-600/20'
              : 'bg-white text-slate-500 border-slate-200 hover:border-red-600 hover:text-red-600'"
          >
            {{ $t('blogPage.categories.all') }}
          </button>
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="selectedCategory = cat.id"
            class="px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 border"
            :class="selectedCategory === cat.id
              ? 'bg-red-600 text-white border-red-600 shadow-xl shadow-red-600/20'
              : 'bg-white text-slate-500 border-slate-200 hover:border-red-600 hover:text-red-600'"
          >
            {{ getCategoryName(cat) }}
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-red-600"></div>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredPosts.length === 0" class="text-center py-20 flex flex-col items-center justify-center">
        <div class="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <BookOpen class="w-10 h-10 text-slate-300" />
        </div>
        <h3 class="text-3xl font-black text-slate-900 mb-3 tracking-tight">
          {{ $t('blogPage.empty.title') }}
        </h3>
        <p class="text-slate-500 font-medium text-lg max-w-md">
          {{ $t('blogPage.empty.description') }}
        </p>
      </div>

      <!-- Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-10 items-stretch">
        <!-- Blog Card -->
        <article
          v-for="post in filteredPosts"
          :key="post.id"
          class="group bg-white rounded-[2.25rem] overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-red-900/10 transition-all duration-500 border border-slate-100 flex h-full flex-col hover:-translate-y-1"
        >
          <div class="relative aspect-[4/3] overflow-hidden">
            <img
              :src="post.featured_image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80'"
              :alt="getPostTitle(post)"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

            <div v-if="post.category" class="absolute inset-x-0 bottom-0 p-6">
              <div class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/55 px-4 py-2 text-white backdrop-blur-md">
                <Tag class="w-4 h-4 text-red-400" />
                <span class="text-[11px] font-black uppercase tracking-[0.24em]">
                  {{ getCategoryName(post.category) }}
                </span>
              </div>
            </div>
          </div>

          <div class="p-7 lg:p-8 flex-1 flex flex-col text-left">
            <div class="flex items-center justify-between gap-4 mb-4">
              <span class="inline-flex items-center rounded-full bg-red-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-red-600">
                {{ post.author || 'Admin' }}
              </span>
              <span class="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
                {{ formatDate(post.published_at || post.created_at) }}
              </span>
            </div>

            <h3 class="text-2xl font-black text-slate-900 mb-3 leading-tight group-hover:text-red-600 transition-colors">
              {{ getPostTitle(post) }}
            </h3>

            <p class="blog-excerpt text-slate-500 text-sm leading-7 mb-8 flex-1 font-medium">
              {{ getPostExcerpt(post) }}
            </p>

            <div class="pt-6 border-t border-slate-100 mt-auto flex items-center justify-between gap-4">
              <router-link
                :to="'/blog/' + post.slug"
                class="text-sm font-bold text-red-600 hover:text-red-700 uppercase tracking-[0.2em] transition-colors"
              >
                {{ $t('blogPage.card.readMore') }}
              </router-link>
              <router-link
                :to="'/blog/' + post.slug"
                class="flex items-center justify-center w-14 h-14 bg-slate-50 rounded-2xl group-hover:bg-red-600 text-slate-400 group-hover:text-white transition-colors duration-300 shrink-0"
              >
                <ArrowRight class="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </router-link>
            </div>
          </div>
        </article>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.last_page > 1" class="mt-16 flex justify-center items-center gap-2">
        <button
          @click="goToPage(pagination.current_page - 1)"
          :disabled="pagination.current_page === 1"
          class="px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-white border border-slate-200 text-slate-700 hover:border-red-600 hover:text-red-600"
        >
          {{ $t('blogPage.pagination.prev') }}
        </button>
        
        <div class="flex gap-2">
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            class="w-12 h-12 rounded-full font-bold text-sm transition-all"
            :class="page === pagination.current_page
              ? 'bg-red-600 text-white shadow-xl shadow-red-600/20'
              : 'bg-white border border-slate-200 text-slate-700 hover:border-red-600 hover:text-red-600'"
          >
            {{ page }}
          </button>
        </div>

        <button
          @click="goToPage(pagination.current_page + 1)"
          :disabled="pagination.current_page === pagination.last_page"
          class="px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-white border border-slate-200 text-slate-700 hover:border-red-600 hover:text-red-600"
        >
          {{ $t('blogPage.pagination.next') }}
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { BookOpen, Search, Tag, ArrowRight } from 'lucide-vue-next';
import { getBlogCategories, getBlogPosts } from '@/services/api';
import api from '@/services/api';

const { locale } = useI18n();

const searchQuery = ref('');
const selectedCategory = ref(null);
const categories = ref([]);
const posts = ref([]);
const loading = ref(true);
const heroImage = ref(null);
const pagination = ref({
  current_page: 1,
  last_page: 1,
  per_page: 12,
  total: 0,
});

const getCategoryName = (category) => {
  const key = locale.value === 'en' ? 'name_en' : locale.value === 'ko' ? 'name_ko' : locale.value === 'zh' ? 'name_zh' : 'name';
  return category[key] || category.name;
};

const getPostTitle = (post) => {
  const key = locale.value === 'en' ? 'title_en' : locale.value === 'ko' ? 'title_ko' : locale.value === 'zh' ? 'title_zh' : 'title';
  return post[key] || post.title;
};

const getPostExcerpt = (post) => {
  const key = locale.value === 'en' ? 'excerpt_en' : locale.value === 'ko' ? 'excerpt_ko' : locale.value === 'zh' ? 'excerpt_zh' : 'excerpt';
  return post[key] || post.excerpt || '';
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

const fetchCategories = async () => {
  try {
    const res = await getBlogCategories();
    categories.value = res.data?.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

const fetchPosts = async (page = 1) => {
  loading.value = true;
  try {
    const params = {
      page,
      per_page: 12,
      published_only: true,
    };
    if (selectedCategory.value) {
      params.category_id = selectedCategory.value;
    }
    if (searchQuery.value) {
      params.q = searchQuery.value;
    }
    const res = await getBlogPosts(params);
    posts.value = res.data?.data?.data || [];
    pagination.value = {
      current_page: res.data?.data?.current_page || 1,
      last_page: res.data?.data?.last_page || 1,
      per_page: res.data?.data?.per_page || 12,
      total: res.data?.data?.total || 0,
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
  } finally {
    loading.value = false;
  }
};

const filteredPosts = computed(() => posts.value);

const visiblePages = computed(() => {
  const current = pagination.value.current_page;
  const last = pagination.value.last_page;
  const pages = [];
  
  if (last <= 7) {
    for (let i = 1; i <= last; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push('...');
      pages.push(last);
    } else if (current >= last - 3) {
      pages.push(1);
      pages.push('...');
      for (let i = last - 4; i <= last; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = current - 1; i <= current + 1; i++) pages.push(i);
      pages.push('...');
      pages.push(last);
    }
  }
  
  return pages;
});

const goToPage = (page) => {
  if (page >= 1 && page <= pagination.value.last_page) {
    fetchPosts(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

onMounted(async () => {
  try {
    const res = await api.get('/blog/hero-image');
    heroImage.value = res.data?.data || null;
  } catch (e) {
    heroImage.value = null;
  }
  await fetchCategories();
  await fetchPosts();
});

watch([selectedCategory, searchQuery], () => {
  fetchPosts(1);
});
</script>

<style scoped>
.blog-excerpt {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}
</style>
