export const dummyCategories = [
  {
    id: 1,
    name: "Manado City Tour",
    slug: "manado-city-tour",
    description: "Jelajahi keindahan kota Manado dan sekitarnya.",
  },
  {
    id: 2,
    name: "Bunaken Marine Park",
    slug: "bunaken-marine-park",
    description: "Nikmati keindahan bawah laut kelas dunia.",
  },
  {
    id: 3,
    name: "Minahasa Highland",
    slug: "minahasa-highland",
    description: "Udara sejuk dan budaya yang kaya di dataran tinggi Minahasa.",
  },
  {
    id: 4,
    name: "Bali Gateway",
    slug: "bali-gateway",
    description: "Destinasi wisata paling ikonik di Indonesia.",
  },
  {
    id: 5,
    name: "Komodo Island",
    slug: "komodo-island",
    description: "Melihat naga purba di habitat aslinya.",
  },
  {
    id: 6,
    name: "Raja Ampat",
    slug: "raja-ampat",
    description: "Surga terakhir di bumi, Papua Barat.",
  },
  {
    id: 7,
    name: "Europe Adventure",
    slug: "europe-adventure",
    description: "Menjelajahi landmark ikonik di benua biru.",
  },
  {
    id: 8,
    name: "Japan Discovery",
    slug: "japan-discovery",
    description: "Perpaduan teknologi modern dan tradisi kuno.",
  },
  {
    id: 9,
    name: "Holy Land Tour",
    slug: "holy-land-tour",
    description: "Perjalanan spiritual yang mendalam dan bermakna.",
  },
];

export const dummyTours = [
  // LOCAL TOURS (category_id 1, 2, 3)
  {
    id: 1,
    category_id: 1,
    title: "Manado City & Culinary Tour",
    slug: "manado-city-culinary",
    summary:
      "Tur satu hari penuh menjelajahi landmark kota Manado dan kuliner otentik.",
    description:
      "Nikmati perjalanan menyeluruh di Kota Manado. Mengunjungi Patung Yesus Memberkati, Klenteng Ban Hin Kiong, dan mencicipi berbagai kuliner khas seperti Tinutuan dan Klappertart.",
    base_price: 750000,
    duration_days: 1,
    duration_nights: 0,
    location: "Manado, Sulawesi Utara",
    category: { slug: "manado-city-tour", name: "Manado City Tour" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "Penjemputan",
        description: "Dijemput di Hotel/Bandara pada pagi hari.",
        hotel_info: "-",
        meals_info: "Sarapan Ringan",
      },
      {
        title: "Landmark Tour",
        description:
          "Mengunjungi Patung Yesus Memberkati and Jembatan Soekarno.",
        hotel_info: "-",
        meals_info: "Makan Siang (Ikan Woku)",
      },
      {
        title: "Shopping & End",
        description:
          "Belanja oleh-oleh di Merciful Building and kembali ke hotel.",
        hotel_info: "Hotel Pilihan",
        meals_info: "Makan Malam",
      },
    ],
  },
  {
    id: 2,
    category_id: 2,
    title: "Bunaken Snorkeling Experience",
    slug: "bunaken-snorkeling",
    summary:
      "Jelajahi biodiversitas laut tertinggi di dunia di Taman Nasional Bunaken.",
    description:
      "Bunaken adalah surga bagi para penyelam and pecinta snorkeling. Dengan dinding karang yang spektakuler and ribuan spesies ikan, pengalaman ini tidak akan terlupakan.",
    base_price: 1200000,
    duration_days: 1,
    duration_nights: 0,
    location: "Pulau Bunaken",
    category: { slug: "bunaken-marine-park", name: "Bunaken Marine Park" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "Berangkat",
        description: "Menuju Dermaga Kalimas and menyeberang ke Bunaken.",
        hotel_info: "-",
        meals_info: "-",
      },
      {
        title: "Snorkeling Session",
        description:
          "Snorkeling di 3 titik terbaik di sekitar Pulau Bunaken and Siladen.",
        hotel_info: "-",
        meals_info: "Makan Siang di Pulau",
      },
      {
        title: "Kembali",
        description: "Kembali ke Manado pada sore hari.",
        hotel_info: "Hotel Pilihan",
        meals_info: "-",
      },
    ],
  },
  {
    id: 3,
    category_id: 3,
    title: "Minahasa Highland Scenic Tour",
    slug: "minahasa-highland-scenic",
    summary: "Menikmati udara sejuk pegunungan and budaya Minahasa.",
    description:
      "Perjalanan ke dataran tinggi Minahasa yang sejuk. Mengunjungi Tomohon, Danau Linow yang berubah warna, and Pagoda Ekayana.",
    base_price: 950000,
    duration_days: 1,
    duration_nights: 0,
    location: "Tomohon, Sulawesi Utara",
    category: { slug: "minahasa-highland", name: "Minahasa Highland" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "Pasar Beriman",
        description: "Mengunjungi pasar ekstrem Tomohon.",
        hotel_info: "-",
        meals_info: "Sarapan",
      },
      {
        title: "Lake & Culture",
        description: "Danau Linow and Rumah Panggung Woloan.",
        hotel_info: "-",
        meals_info: "Makan Siang",
      },
    ],
  },
  {
    id: 10,
    category_id: 1,
    title: "Manado Religious Heritage",
    slug: "manado-religious-heritage",
    summary: "Menelusuri jejak toleransi and sejarah religi di Kota Manado.",
    description:
      "Manado dikenal sebagai kota toleransi. Kunjungi Klenteng Ban Hin Kiong tertua, Gereja Sentrum sejarah, and Masjid Mashyur dalam satu perjalanan budaya.",
    base_price: 600000,
    duration_days: 1,
    duration_nights: 0,
    location: "Manado City",
    category: { slug: "manado-city-tour", name: "Manado City Tour" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1590059005670-36998632a24c?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "Old Town Walk",
        description: "Berjalan santai di kawasan Pecinan and Kampung Arab.",
        hotel_info: "-",
        meals_info: "Mie Cakalang",
      },
    ],
  },
  {
    id: 11,
    category_id: 2,
    title: "Lembeh Strait Macro Safari",
    slug: "lembeh-macro-safari",
    summary: "Surga fotografi makro bawah laut terbaik di dunia.",
    description:
      "Bagi pecinta diving, Selat Lembeh menawarkan biota laut langka and unik (critters) yang tidak ditemukan di tempat lain. Wajib untuk fotografer bawah laut.",
    base_price: 2500000,
    duration_days: 1,
    duration_nights: 0,
    location: "Bitung, Sulawesi Utara",
    category: { slug: "bunaken-marine-park", name: "Bunaken Marine Park" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "2-Tank Dive",
        description: "Dua kali penyelaman di spot makro populer Lembeh.",
        hotel_info: "-",
        meals_info: "Lunch Box",
      },
    ],
  },
  {
    id: 12,
    category_id: 3,
    title: "Tangkoko Wildlife Safari",
    slug: "tangkoko-wildlife",
    summary: "Bertemu Tarsius and Monyet Hitam di habitat aslinya.",
    description:
      "Petualangan menembus hutan Tangkoko untuk melihat primata terkecil di dunia (Tarsius) and monyet endemik Sulawesi (Yaki) yang terancam punah.",
    base_price: 850000,
    duration_days: 1,
    duration_nights: 0,
    location: "Bitung, Sulawesi Utara",
    category: { slug: "minahasa-highland", name: "Minahasa Highland" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "Evening Trek",
        description: "Trekking sore hari saat Tarsius mulai aktif.",
        hotel_info: "-",
        meals_info: "Dinner at local guesthouse",
      },
    ],
  },
  {
    id: 19,
    category_id: 2,
    title: "Siladen Island Snorkeling",
    slug: "siladen-snorkeling",
    summary:
      "Ketenangan and keindahan terumbu karang dangkal di Pulau Siladen.",
    description:
      "Pulau Siladen menawarkan pengalaman snorkeling yang lebih tenang dengan air yang sangat jernih and terumbu karang yang bisa dinikmati langsung dari bibir pantai.",
    base_price: 1100000,
    duration_days: 1,
    duration_nights: 0,
    location: "Pulau Siladen",
    category: { slug: "bunaken-marine-park", name: "Bunaken Marine Park" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "Island Relax",
        description: "Snorkeling and bersantai di pantai pasir putih Siladen.",
        hotel_info: "-",
        meals_info: "Lunch at Resort",
      },
    ],
  },
  {
    id: 20,
    category_id: 3,
    title: "Tondano Lake & Culinary",
    slug: "tondano-lake-culinary",
    summary: "Menikmati ikan air tawar segar di tepi danau terbesar di Sulut.",
    description:
      "Perjalanan menuju Danau Tondano untuk menikmati kuliner Ikan Mujair bakar and pemandangan pegunungan yang asri. Kunjungi juga Benteng Moraya.",
    base_price: 700000,
    duration_days: 1,
    duration_nights: 0,
    location: "Tondano, Sulawesi Utara",
    category: { slug: "minahasa-highland", name: "Minahasa Highland" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "Lake Side Lunch",
        description: "Makan siang di restoran apung Danau Tondano.",
        hotel_info: "-",
        meals_info: "Ikan Mujair Bakar",
      },
    ],
  },
  {
    id: 25,
    category_id: 3,
    title: "Mahawu Volcano Trekking",
    slug: "mahawu-volcano-trekking",
    summary: "Melihat kawah belerang and pemandangan kota Tomohon.",
    description:
      "Trekking ringan menuju puncak Gunung Mahawu. Nikmati udara segar and pemandangan spektakuler kawah mati and kota bunga Tomohon dari ketinggian.",
    base_price: 800000,
    duration_days: 1,
    duration_nights: 0,
    location: "Tomohon, Sulawesi Utara",
    category: { slug: "minahasa-highland", name: "Minahasa Highland" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "Summit Climb",
        description: "Berjalan santai melalui anak tangga menuju kawah.",
        hotel_info: "-",
        meals_info: "Jagung Bakar",
      },
    ],
  },
  {
    id: 26,
    category_id: 2,
    title: "Bunaken Sunset Cruise",
    slug: "bunaken-sunset-cruise",
    summary: "Menikmati senja di perairan Taman Nasional Bunaken.",
    description:
      "Berlayar santai dengan kapal katamaran sambil menunggu matahari terbenam. Jika beruntung, Anda bisa melihat kawanan lumba-lumba melompat.",
    base_price: 1500000,
    duration_days: 1,
    duration_nights: 0,
    location: "Manado Bay",
    category: { slug: "bunaken-marine-park", name: "Bunaken Marine Park" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "Sunset Sailing",
        description: "Berlayar dari Dermaga Kalimas menuju perairan Bunaken.",
        hotel_info: "-",
        meals_info: "Snacks & Drinks",
      },
    ],
  },

  // NATIONAL TOURS (category_id 4, 5, 6)
  {
    id: 4,
    category_id: 4,
    title: "Exotic Bali Paradise Tour",
    slug: "exotic-bali-paradise",
    summary: "Rasakan keajaiban Pulau Dewata dari pantai hingga pura.",
    description:
      "Bali menawarkan segalanya: budaya yang kaya, pantai yang indah, and petualangan yang seru. Tur ini mencakup kunjungan ke Uluwatu, Ubud, and makan malam romantis di Jimbaran.",
    base_price: 4500000,
    duration_days: 4,
    duration_nights: 3,
    location: "Bali, Indonesia",
    category: { slug: "bali-gateway", name: "Bali Gateway" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "Arrival",
        description: "Penjemputan di Bandara Ngurah Rai.",
        hotel_info: "Resort di Seminyak",
        meals_info: "Makan Malam",
      },
      {
        title: "Ubud Cultural",
        description: "Mengunjungi Tegalalang Rice Terrace and Monkey Forest.",
        hotel_info: "Resort di Seminyak",
        meals_info: "B, L, D",
      },
      {
        title: "South Bali",
        description: "Pantai Pandawa and Pura Uluwatu.",
        hotel_info: "Resort di Seminyak",
        meals_info: "B, L, D",
      },
    ],
  },
  {
    id: 5,
    category_id: 5,
    title: "Komodo Dragon Adventure",
    slug: "komodo-dragon-adventure",
    summary: "Menjelajahi habitat naga terakhir di dunia.",
    description:
      "Saksikan keajaiban dunia di Pulau Komodo and Rinca. Nikmati pemandangan spektakuler dari Pulau Padar and bersantai di Pink Beach.",
    base_price: 6500000,
    duration_days: 3,
    duration_nights: 2,
    location: "Labuan Bajo, NTT",
    category: { slug: "komodo-island", name: "Komodo Island" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "Island Hopping",
        description: "Berlayar menuju Pulau Kelor and Pulau Kalong.",
        hotel_info: "Kapal Phinisi",
        meals_info: "L, D",
      },
      {
        title: "Komodo & Padar",
        description: "Trekking di Padar and melihat Komodo.",
        hotel_info: "Kapal Phinisi",
        meals_info: "B, L, D",
      },
    ],
  },
  {
    id: 6,
    category_id: 6,
    title: "Raja Ampat - The Last Paradise",
    slug: "raja-ampat-paradise",
    summary: "Surga bawah laut terindah di dunia.",
    description:
      "Nikmati keindahan gugusan pulau karst and keanekaragaman hayati laut yang luar biasa di Raja Ampat, Papua Barat.",
    base_price: 15000000,
    duration_days: 5,
    duration_nights: 4,
    location: "Raja Ampat, Papua Barat",
    category: { slug: "raja-ampat", name: "Raja Ampat" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1534433852028-323280036128?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "Piaynemo",
        description: "Melihat gugusan pulau dari ketinggian.",
        hotel_info: "Eco Resort",
        meals_info: "B, L, D",
      },
    ],
  },
  {
    id: 13,
    category_id: 4,
    title: "Borobudur & Prambanan Heritage",
    slug: "borobudur-prambanan-heritage",
    summary: "Menyelami kemegahan candi Buddha and Hindu terbesar.",
    description:
      "Kunjungi mahakarya arsitektur kuno di Yogyakarta. Saksikan matahari terbit di Borobudur and pertunjukan Ramayana di Prambanan.",
    base_price: 3500000,
    duration_days: 3,
    duration_nights: 2,
    location: "Yogyakarta, Indonesia",
    category: { slug: "bali-gateway", name: "Bali Gateway" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "Sunrise Borobudur",
        description: "Menikmati fajar di puncak candi Borobudur.",
        hotel_info: "Hotel di Malioboro",
        meals_info: "B, L, D",
      },
    ],
  },
  {
    id: 14,
    category_id: 5,
    title: "Lombok Gili Islands Escape",
    slug: "lombok-gili-escape",
    summary: "Ketenangan total di pulau tanpa kendaraan bermotor.",
    description:
      "Nikmati air laut kristal and pantai pasir putih di Gili Trawangan, Meno, and Air. Sempurna untuk snorkeling and bersantai.",
    base_price: 4000000,
    duration_days: 3,
    duration_nights: 2,
    location: "Lombok, NTB",
    category: { slug: "komodo-island", name: "Komodo Island" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1512100356956-c1227c331f01?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "Gili Hopping",
        description: "Snorkeling di ketiga Gili and melihat penyu.",
        hotel_info: "Beachfront Villa",
        meals_info: "L, D",
      },
    ],
  },
  {
    id: 15,
    category_id: 6,
    title: "Mount Bromo Sunrise Expedition",
    slug: "bromo-sunrise-expedition",
    summary: "Pemandangan kawah vulkanik paling ikonik di Indonesia.",
    description:
      "Naik Jeep 4x4 menembus lautan pasir untuk menyaksikan matahari terbit yang spektakuler dengan latar belakang Gunung Bromo and Semeru.",
    base_price: 2800000,
    duration_days: 2,
    duration_nights: 1,
    location: "Jawa Timur, Indonesia",
    category: { slug: "raja-ampat", name: "Raja Ampat" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1588108778641-76495537557d?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "Midnight Jeep",
        description: "Berangkat tengah malam menuju Penanjakan.",
        hotel_info: "Lodge at Cemoro Lawang",
        meals_info: "B, L",
      },
    ],
  },
  {
    id: 21,
    category_id: 5,
    title: "Wae Rebo Village Adventure",
    slug: "wae-rebo-adventure",
    summary: "Trekking menuju desa adat di atas awan, Flores.",
    description:
      "Rasakan pengalaman tinggal di rumah adat Mbaru Niang di desa Wae Rebo yang terisolasi and indah di pegunungan Flores.",
    base_price: 3200000,
    duration_days: 2,
    duration_nights: 1,
    location: "Flores, NTT",
    category: { slug: "komodo-island", name: "Komodo Island" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "Mountain Trek",
        description: "Trekking menanjak selama 3 jam menuju desa.",
        hotel_info: "Mbaru Niang (Homestay)",
        meals_info: "Traditional Meals",
      },
    ],
  },
  {
    id: 22,
    category_id: 4,
    title: "Belitung Island Hopping",
    slug: "belitung-island-hopping",
    summary: "Menjelajahi pantai berbatu granit and air biru jernih.",
    description:
      "Kunjungi lokasi syuting Laskar Pelangi, mercusuar tua di Pulau Lengkuas, and nikmati kopi legendaris di Tanjung Pandan.",
    base_price: 3000000,
    duration_days: 3,
    duration_nights: 2,
    location: "Belitung, Indonesia",
    category: { slug: "bali-gateway", name: "Bali Gateway" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1534433852028-323280036128?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "Granite Rocks",
        description: "Mengunjungi Pantai Tanjung Tinggi and Pulau Pasir.",
        hotel_info: "Hotel at Tanjung Pandan",
        meals_info: "B, L, D",
      },
    ],
  },
  {
    id: 27,
    category_id: 6,
    title: "Derawan Whale Shark Safari",
    slug: "derawan-whale-shark",
    summary: "Berenang bersama hiu paus and ubur-ubur tanpa sengat.",
    description:
      "Jelajahi surga tersembunyi di Kalimantan Timur. Berenang bersama Whale Shark di Talisayan and ubur-ubur unik di Danau Kakaban.",
    base_price: 4500000,
    duration_days: 4,
    duration_nights: 3,
    location: "Derawan, Kalimantan Timur",
    category: { slug: "raja-ampat", name: "Raja Ampat" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "Whale Shark Spotting",
        description: "Berangkat subuh menuju bagang tempat hiu paus berkumpul.",
        hotel_info: "Water Villa",
        meals_info: "B, L, D",
      },
    ],
  },
  {
    id: 28,
    category_id: 5,
    title: "Toraja Cultural Heritage",
    slug: "toraja-cultural-heritage",
    summary: "Menyelami tradisi pemakaman and budaya unik suku Toraja.",
    description:
      "Kunjungi Lemo, Londa, and Kete Kesu untuk melihat makam di tebing batu and rumah adat Tongkonan yang megah di Sulawesi Selatan.",
    base_price: 3800000,
    duration_days: 4,
    duration_nights: 3,
    location: "Tana Toraja, Sulawesi Selatan",
    category: { slug: "komodo-island", name: "Komodo Island" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "Stone Grave Visit",
        description: "Melihat patung Tau-Tau di tebing batu Lemo.",
        hotel_info: "Heritage Hotel",
        meals_info: "B, L, D",
      },
    ],
  },

  // INTERNATIONAL TOURS (category_id 7, 8, 9)
  {
    id: 7,
    category_id: 7,
    title: "Europe Highlights Express",
    slug: "europe-highlights",
    summary: "Menjelajahi Paris, Swiss, and Italia dalam satu perjalanan.",
    description:
      "Nikmati keindahan Menara Eiffel, salju di Mount Titlis, and kemegahan Colosseum di Italia.",
    base_price: 35000000,
    duration_days: 10,
    duration_nights: 9,
    location: "Prancis, Swiss, Italia",
    category: { slug: "europe-adventure", name: "Europe Adventure" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "City of Light",
        description: "Menjelajahi Paris and Seine River Cruise.",
        hotel_info: "Hotel Bintang 4",
        meals_info: "B, D",
      },
    ],
  },
  {
    id: 8,
    category_id: 8,
    title: "Classic Japan Cherry Blossom",
    slug: "classic-japan",
    summary: "Nikmati keindahan bunga Sakura di Tokyo, Kyoto, and Osaka.",
    description:
      "Jepang adalah destinasi impian. Dari gemerlap lampu Tokyo hingga ketenangan pura di Kyoto. Tur ini dirancang khusus untuk memberikan pengalaman budaya Jepang yang mendalam.",
    base_price: 25000000,
    duration_days: 7,
    duration_nights: 6,
    location: "Jepang",
    category: { slug: "japan-discovery", name: "Japan Discovery" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "Arrival Tokyo",
        description: "Check-in hotel di Shinjuku.",
        hotel_info: "Hotel Bintang 4",
        meals_info: "D",
      },
      {
        title: "Mount Fuji",
        description: "Mengunjungi Danau Kawaguchi and Gunung Fuji.",
        hotel_info: "Hotel Bintang 4",
        meals_info: "B, L",
      },
      {
        title: "Bullet Train to Kyoto",
        description: "Naik Shinkansen menuju kota budaya Kyoto.",
        hotel_info: "Ryokan Tradisional",
        meals_info: "B, D",
      },
    ],
  },
  {
    id: 9,
    category_id: 9,
    title: "Holy Land Spiritual Journey",
    slug: "holy-land-spiritual",
    summary: "Ziarah rohani ke tempat-tempat suci di Yerusalem and sekitarnya.",
    description:
      "Perjalanan spiritual yang mendalam mengunjungi Bethlehem, Nazareth, and Danau Galilea.",
    base_price: 32000000,
    duration_days: 12,
    duration_nights: 11,
    location: "Israel, Yordania, Mesir",
    category: { slug: "holy-land-tour", name: "Holy Land Tour" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1548135039-35d13ef30b24?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "Old City Jerusalem",
        description: "Mengunjungi Via Dolorosa and Garden Tomb.",
        hotel_info: "Hotel Bintang 4",
        meals_info: "B, L, D",
      },
    ],
  },
  {
    id: 16,
    category_id: 8,
    title: "South Korea K-Pop Experience",
    slug: "korea-kpop-experience",
    summary: "Menjelajahi lokasi syuting K-Drama and budaya modern Seoul.",
    description:
      "Kunjungi Gyeongbokgung Palace, N Seoul Tower, and kawasan Myeongdong yang ramai. Pengalaman wajib bagi pecinta budaya Korea.",
    base_price: 18000000,
    duration_days: 6,
    duration_nights: 5,
    location: "Seoul, Korea Selatan",
    category: { slug: "japan-discovery", name: "Japan Discovery" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "Seoul City Tour",
        description: "Mengunjungi Istana Gyeongbokgung menggunakan Hanbok.",
        hotel_info: "Hotel di Myeongdong",
        meals_info: "B, L, D",
      },
    ],
  },
  {
    id: 17,
    category_id: 7,
    title: "Turkey Fairy Chimneys Tour",
    slug: "turkey-fairy-chimneys",
    summary: "Naik balon udara di Cappadocia and sejarah Istanbul.",
    description:
      "Saksikan keindahan Blue Mosque, Hagia Sophia, and pemandangan spektakuler Cappadocia dari balon udara.",
    base_price: 22000000,
    duration_days: 8,
    duration_nights: 7,
    location: "Turki",
    category: { slug: "europe-adventure", name: "Europe Adventure" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "Cappadocia Sunrise",
        description: "Naik balon udara saat matahari terbit.",
        hotel_info: "Cave Hotel",
        meals_info: "B, L, D",
      },
    ],
  },
  {
    id: 18,
    category_id: 9,
    title: "Singapore City Lights & Gardens",
    slug: "singapore-city-lights",
    summary: "Wisata modern di kota singa yang futuristik.",
    description:
      "Jelajahi Gardens by the Bay, Marina Bay Sands, and Universal Studios Singapore. Perjalanan singkat yang penuh kesan.",
    base_price: 8500000,
    duration_days: 3,
    duration_nights: 2,
    location: "Singapura",
    category: { slug: "holy-land-tour", name: "Holy Land Tour" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "Sentosa Island",
        description: "Bermain sepuasnya di Universal Studios Singapore.",
        hotel_info: "Hotel di Orchard",
        meals_info: "B, D",
      },
    ],
  },
  {
    id: 23,
    category_id: 7,
    title: "Switzerland Alps Scenic Train",
    slug: "swiss-alps-scenic",
    summary: "Menikmati salju abadi and kereta panorama di Pegunungan Alpen.",
    description:
      "Naik Glacier Express menembus keindahan pegunungan Alpen, kunjungi Zermatt dengan latar belakang Gunung Matterhorn yang ikonik.",
    base_price: 42000000,
    duration_days: 7,
    duration_nights: 6,
    location: "Swiss",
    category: { slug: "europe-adventure", name: "Europe Adventure" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "Glacier Express",
        description: "Perjalanan kereta panorama dari St. Moritz ke Zermatt.",
        hotel_info: "Alpine Resort",
        meals_info: "B, L, D",
      },
    ],
  },
  {
    id: 24,
    category_id: 8,
    title: "Taiwan Night Market & Culture",
    slug: "taiwan-night-market",
    summary: "Surga kuliner malam and keindahan alam di Taiwan.",
    description:
      "Jelajahi gemerlap Taipei 101, nikmati jajanan di Shilin Night Market, and keindahan alam Sun Moon Lake.",
    base_price: 12000000,
    duration_days: 5,
    duration_nights: 4,
    location: "Taiwan",
    category: { slug: "japan-discovery", name: "Japan Discovery" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "Taipei 101",
        description: "Melihat pemandangan kota Taipei dari ketinggian.",
        hotel_info: "City Center Hotel",
        meals_info: "B, L, D",
      },
    ],
  },
  {
    id: 29,
    category_id: 9,
    title: "Egypt Pyramids & Nile Cruise",
    slug: "egypt-pyramids-nile",
    summary: "Menjelajahi keajaiban dunia kuno di sepanjang Sungai Nil.",
    description:
      "Kunjungi Piramida Giza, Sphinx, and berlayar dengan kapal pesiar mewah di Sungai Nil untuk melihat kuil-kuil megah Luxor and Karnak.",
    base_price: 28000000,
    duration_days: 9,
    duration_nights: 8,
    location: "Mesir",
    category: { slug: "holy-land-tour", name: "Holy Land Tour" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "Giza Pyramids",
        description: "Melihat Piramida Agung and Sphinx di pagi hari.",
        hotel_info: "Nile Cruise Ship",
        meals_info: "B, L, D",
      },
    ],
  },
  {
    id: 30,
    category_id: 7,
    title: "Australia Great Barrier Reef",
    slug: "australia-barrier-reef",
    summary: "Menjelajahi sistem terumbu karang terbesar di dunia.",
    description:
      "Nikmati pengalaman snorkeling or diving di Great Barrier Reef, kunjungi Sydney Opera House, and Blue Mountains yang indah.",
    base_price: 38000000,
    duration_days: 10,
    duration_nights: 9,
    location: "Australia",
    category: { slug: "europe-adventure", name: "Europe Adventure" },
    galleries: [
      {
        image_path:
          "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&q=80",
      },
    ],
    itineraries: [
      {
        title: "Reef Diving",
        description: "Diving and snorkeling di Outer Great Barrier Reef.",
        hotel_info: "Resort at Cairns",
        meals_info: "B, L, D",
      },
    ],
  },
];
