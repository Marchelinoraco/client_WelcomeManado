<template>
  <div class="selection:bg-orange-100 selection:text-orange-700 font-sans min-h-screen bg-slate-50">
    
    <!-- Hero Header -->
    <header class="relative pt-40 pb-20 lg:pt-52 lg:pb-32 px-6 lg:px-10 overflow-hidden bg-slate-900">
      <div class="absolute inset-0 z-0 scale-105 animate-pulse" style="animation-duration: 20s">
        <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=2400&q=80" 
             class="w-full h-full object-cover opacity-30" alt="Manado Food" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
      </div>
      
      <div class="relative z-10 max-w-7xl mx-auto text-center">
        <div class="inline-flex items-center space-x-3 mb-6 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20">
          <Utensils class="w-4 h-4 text-orange-400" />
          <span class="text-xs font-black text-white uppercase tracking-[0.3em]">{{ $t('nav.food') }}</span>
        </div>
        <h1 class="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-8">
          {{ $t('food.title').split('&')[0] }} & <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">{{ $t('food.title').split('&')[1] || 'CUISINE' }}</span>
        </h1>
        <p class="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed font-medium">
          {{ $t('food.description') }}
        </p>
      </div>
    </header>

    <!-- Content Section -->
    <main class="py-20 lg:py-32 px-6 lg:px-10 max-w-7xl mx-auto">
      
      <div v-for="(category, catIndex) in foodCategories" :key="catIndex" class="mb-24 last:mb-0">
        <div class="mb-12 text-left max-w-3xl border-l-4 border-orange-500 pl-6">
          <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-2 tracking-tight uppercase italic">
            {{ $t('food.categories.' + category.key) }}
          </h2>
          <div class="w-16 h-1 bg-orange-200 rounded-full mt-4"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <!-- Food Card -->
          <article 
            v-for="(item, index) in category.items" 
            :key="index"
            class="group bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-orange-900/10 transition-all duration-500 border border-slate-100 flex flex-col items-start text-left"
          >
            <div class="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-500 transition-all duration-500">
              <ChefHat class="w-7 h-7 text-orange-500 group-hover:text-white transition-colors" />
            </div>
            
            <h3 class="text-xl font-black text-slate-900 leading-tight mb-4 group-hover:text-orange-600 transition-colors">
              {{ $t('food.items.' + item.key) }}
            </h3>
            
            <p class="text-slate-500 text-sm font-medium leading-relaxed mb-8">
              {{ $t('food.items.' + item.key + '_desc') }}
            </p>
            
            <div class="mt-auto w-full flex items-center justify-between pt-6 border-t border-slate-100 group-hover:border-orange-100 transition-colors">
               <span class="text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-orange-600 transition-colors">Taste it</span>
               <div class="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-orange-500 flex items-center justify-center transition-all duration-300">
                  <ArrowRight class="w-5 h-5 text-slate-400 group-hover:text-white -rotate-45 group-hover:rotate-0 transition-all duration-500" />
               </div>
            </div>
          </article>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { Utensils, ChefHat, ArrowRight } from 'lucide-vue-next';
import { foodCategories } from '../data/manadoFood';
</script>
