<template>
  <div class="min-h-screen bg-gray-50 selection:bg-blue-100 selection:text-blue-700">
    <!-- Contact Hero -->
    <section class="bg-blue-900 py-24 text-white text-center">
      <h1 class="text-5xl md:text-7xl font-black tracking-tighter uppercase italic mb-6">Contact <span class="text-blue-500">Us</span></h1>
      <p class="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light px-4">Got questions about your next adventure? Our team is here to help you every step of the way.</p>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-32">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        <!-- Contact Info Cards -->
        <div class="space-y-8 lg:col-span-1">
          <div v-for="(info, index) in contactInfo" :key="index" class="bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group border border-gray-100">
            <div class="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <component :is="info.icon" class="w-6 h-6" />
            </div>
            <h3 class="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">{{ info.label }}</h3>
            <p class="text-lg font-bold text-gray-900 leading-tight">{{ info.value }}</p>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-2 bg-white rounded-[2rem] p-10 md:p-16 shadow-2xl border border-gray-100">
          <h2 class="text-3xl font-black text-gray-900 mb-10 tracking-tighter uppercase italic">Send us a <span class="text-blue-600">Message</span></h2>
          
          <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-3">
              <label class="text-[10px] font-black uppercase tracking-widest text-gray-400">Full Name</label>
              <input v-model="form.name" type="text" placeholder="John Doe" class="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-300 font-medium" required />
            </div>
            <div class="space-y-3">
              <label class="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address</label>
              <input v-model="form.email" type="email" placeholder="john@example.com" class="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-300 font-medium" required />
            </div>
            <div class="space-y-3 md:col-span-2">
              <label class="text-[10px] font-black uppercase tracking-widest text-gray-400">Subject</label>
              <input v-model="form.subject" type="text" placeholder="Tell us what you're interested in" class="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-300 font-medium" required />
            </div>
            <div class="space-y-3 md:col-span-2">
              <label class="text-[10px] font-black uppercase tracking-widest text-gray-400">Message</label>
              <textarea v-model="form.message" rows="5" placeholder="Share your travel plans or questions..." class="w-full bg-gray-50 border-none rounded-3xl px-6 py-4 focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-300 font-medium resize-none" required></textarea>
            </div>
            <div class="md:col-span-2 pt-4">
              <button type="submit" class="w-full md:w-auto px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-full transition-all uppercase tracking-widest shadow-2xl shadow-blue-600/20 active:scale-95">
                Send Message &rarr;
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Mail, Phone, MapPin } from 'lucide-vue-next';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'info@welcomemanado.com' },
  { icon: Phone, label: 'Phone', value: '+62 821-7373-8822' },
  { icon: MapPin, label: 'Office', value: 'Manado, North Sulawesi' }
];

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const handleSubmit = () => {
  alert('Thank you for your message! Our team will contact you soon.');
  form.value = { name: '', email: '', subject: '', message: '' };
};
</script>
