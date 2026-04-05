export const dummyNasionalCategories = [
  {
    id: 4,
    name: "Bali Gateway",
    slug: "bali-gateway",
    description:
      "Destinasi wisata paling ikonik di Indonesia dengan keindahan pantai dan budaya yang kental.",
    overview:
      "Bali menawarkan perpaduan sempurna antara budaya, alam, dan kuliner. Dari Ubud yang artistik hingga sunset dramatis di Tanah Lot, setiap sudutnya memberi pengalaman yang berkesan.",
    highlights: [
      "Ubud: teras sawah, seni, dan suasana pedesaan",
      "Kunjungan pura ikonik dan spot sunset terbaik",
      "Itinerary fleksibel untuk keluarga maupun group",
    ],
  },
  {
    id: 5,
    name: "Komodo Island",
    slug: "komodo-island",
    description:
      "Melihat naga purba di habitat aslinya dan keindahan alam bawah laut Flores.",
    overview:
      "Komodo dikenal dengan petualangan island hopping yang premium. Trekking di Pulau Padar, berenang di Pink Beach, dan melihat Komodo Dragon menjadikan pengalaman ini sangat eksklusif.",
    highlights: [
      "Island hopping: Padar, Pink Beach, Komodo Island",
      "Snorkeling/diving di spot laut terbaik Labuan Bajo",
      "Opsional liveaboard dengan kapal pinisi",
    ],
  },
  {
    id: 6,
    name: "Raja Ampat",
    slug: "raja-ampat",
    description:
      "Surga terakhir di bumi dengan keanekaragaman hayati laut terkaya di dunia.",
    overview:
      "Raja Ampat adalah destinasi impian pecinta laut. Panorama karst Piaynemo/Wayag, air sebening kristal, serta snorkeling dan diving kelas dunia menjadikannya 'the last paradise'.",
    highlights: [
      "Viewpoint karst ikonik (Piaynemo/Wayag)",
      "Snorkeling/diving: terumbu karang dan biota laut",
      "Akomodasi eco resort/homestay dengan nuansa alam",
    ],
  },
];

export const dummyNasionalTours = [
  // Bali Gateway (category_id 4)
  {
    id: 41,
    category_id: 4,
    title: "Best of Bali: Ubud & Tanah Lot",
    slug: "best-of-bali",
    summary: "Jelajahi pusat budaya Ubud dan matahari terbenam di Tanah Lot.",
    description:
      "Perjalanan melalui jantung budaya Bali. Kunjungi Teras Sawah Tegalalang di Ubud, Hutan Monyet, dan nikmati pemandangan ikonik Pura Tanah Lot di atas tebing.",
    base_price: 2850000,
    duration_days: 3,
    duration_nights: 2,
    location: "Bali, Indonesia",
    category: { slug: "bali-gateway", name: "Bali Gateway" },
    interest_tags: ["culture", "history", "shopping", "nature"],
    price_details: [
      { pax_range: "2-3 Pax", price_per_pax: 3500000 },
      { pax_range: "4-6 Pax", price_per_pax: 2850000 },
      { pax_range: "7-10 Pax", price_per_pax: 2400000 },
    ],
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        id: 20,
        day_number: 1,
        title: "Ubud Discovery",
        description: "Tegalalang Rice Terrace and Ubud Monkey Forest.",
        hotel_info: "Ubud Resort",
        meals_info: "Lunch",
      },
      {
        id: 21,
        day_number: 2,
        title: "Temple & Sunset",
        description: "Ulun Danu Beratan and Tanah Lot Sunset.",
        hotel_info: "Seminyak Hotel",
        meals_info: "Breakfast, Dinner",
      },
      {
        id: 22,
        day_number: 3,
        title: "Beach Day & Farewell",
        description: "Melasti Beach and transfer to airport.",
        hotel_info: "-",
        meals_info: "Breakfast",
      },
    ],
  },

  // Komodo Island (category_id 5)
  {
    id: 51,
    category_id: 5,
    title: "Komodo Liveaboard Adventure",
    slug: "komodo-liveaboard",
    summary: "Berlayar di Taman Nasional Komodo dan bertemu Naga Purba.",
    description:
      "Pengalaman menginap di kapal pinisi sambil menjelajahi Pulau Padar, Pantai Merah (Pink Beach), dan Pulau Komodo untuk melihat habitat asli Naga Komodo.",
    base_price: 5500000,
    duration_days: 3,
    duration_nights: 2,
    location: "Labuan Bajo, Flores",
    category: { slug: "komodo-island", name: "Komodo Island" },
    interest_tags: ["nature", "islands", "snorkeling", "diving"],
    price_details: [
      { pax_range: "2-4 Pax", price_per_pax: 6500000 },
      { pax_range: "5-8 Pax", price_per_pax: 5500000 },
      { pax_range: "9+ Pax", price_per_pax: 4800000 },
    ],
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        id: 30,
        day_number: 1,
        title: "Island Hopping",
        description: "Kelor Island snorkeling and Padar Island trekking.",
        hotel_info: "Luxury Cabin Boat",
        meals_info: "Lunch, Dinner",
      },
      {
        id: 31,
        day_number: 2,
        title: "The Dragon Encounter",
        description: "Komodo Island trek and Pink Beach relaxation.",
        hotel_info: "Luxury Cabin Boat",
        meals_info: "B, L, D",
      },
      {
        id: 32,
        day_number: 3,
        title: "Manta Point",
        description: "Swimming with Manta Rays and return to Labuan Bajo.",
        hotel_info: "-",
        meals_info: "B, L",
      },
    ],
  },

  // Raja Ampat (category_id 6)
  {
    id: 61,
    category_id: 6,
    title: "Raja Ampat: The Last Paradise",
    slug: "raja-ampat-paradise",
    summary: "Keanekaragaman hayati laut terkaya di dunia.",
    description:
      "Jelajahi kepulauan karst Wayag atau Piaynemo yang menakjubkan. Raja Ampat menawarkan pengalaman snorkeling dan diving yang tak tertandingi.",
    base_price: 12500000,
    duration_days: 4,
    duration_nights: 3,
    location: "Raja Ampat, Papua Barat",
    category: { slug: "raja-ampat", name: "Raja Ampat" },
    interest_tags: ["nature", "islands", "snorkeling", "diving"],
    price_details: [
      { pax_range: "2-4 Pax", price_per_pax: 14500000 },
      { pax_range: "5-8 Pax", price_per_pax: 12500000 },
      { pax_range: "9+ Pax", price_per_pax: 11000000 },
    ],
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1534433852028-323280036128?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        id: 40,
        day_number: 1,
        title: "Waisai Arrival",
        description: "Ferry from Sorong and check-in at homestay/resort.",
        hotel_info: "Eco Resort",
        meals_info: "Dinner",
      },
      {
        id: 41,
        day_number: 2,
        title: "Piaynemo Viewpoint",
        description: "Climbing to the top for the iconic karst view.",
        hotel_info: "Eco Resort",
        meals_info: "B, L, D",
      },
      {
        id: 42,
        day_number: 3,
        title: "Friwen Wall Snorkeling",
        description: "Discovering underwater beauty and bird watching.",
        hotel_info: "Eco Resort",
        meals_info: "B, L, D",
      },
      {
        id: 43,
        day_number: 4,
        title: "Back to Sorong",
        description: "Transfer back to airport.",
        hotel_info: "-",
        meals_info: "B, L",
      },
    ],
  },
];
