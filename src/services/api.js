import axios from "axios";
import { dummyCategories, dummyTours } from "../data/dummyTours";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Set to true to use dummy data instead of API
const USE_DUMMY = import.meta.env.VITE_USE_DUMMY === "true";

export const getCategories = async () => {
  if (USE_DUMMY) {
    return { data: { data: dummyCategories } };
  }
  return api.get("/categories");
};

export const getTours = async (params = {}) => {
  if (USE_DUMMY) {
    let filteredTours = [...dummyTours];

    // Simple filter for Home.vue categories (local, national, international)
    if (params.category) {
      // Add slug mapping for backward compatibility with old hardcoded links
      const slugMap = {
        "marine-bunaken": "bunaken-marine-park",
        "manado-city-tour": "manado-city-tour",
        "highland-tomohon": "minahasa-highland",
        "bali-lombok": "bali-gateway",
        "komodo-flores": "komodo-island",
        "raja-ampat-papua": "raja-ampat",
        australia: "holy-land-tour", // Example mapping
        europe: "europe-adventure",
        asia: "japan-discovery",
      };

      const targetSlug = slugMap[params.category] || params.category;
      filteredTours = dummyTours.filter((t) => t.category.slug === targetSlug);
    }

    // Grouping for Home.vue
    const result = {
      local: dummyTours.filter((t) => [1, 2, 3].includes(t.category_id)),
      national: dummyTours.filter((t) => [4, 5, 6].includes(t.category_id)),
      international: dummyTours.filter((t) =>
        [7, 8, 9].includes(t.category_id),
      ),
    };

    return { data: { data: params.category ? filteredTours : result } };
  }
  return api.get("/tours", { params });
};

export const getTourDetail = async (slug) => {
  if (USE_DUMMY) {
    const tour = dummyTours.find((t) => t.slug === slug);
    return { data: { data: tour || dummyTours[0] } };
  }
  return api.get(`/tours/${slug}`);
};

export const getLocalCategories = async () => {
  if (USE_DUMMY) {
    return {
      data: { data: dummyCategories.filter((c) => c.type === "local") },
    };
  }
  return api.get("/wisatalokal/categories");
};

export const getLocalTours = async (params = {}) => {
  if (USE_DUMMY) {
    const categorySlug = params.category;
    const list = dummyTours.filter((t) => t.category?.type === "local");
    if (!categorySlug) return { data: { data: list } };
    return {
      data: { data: list.filter((t) => t.category?.slug === categorySlug) },
    };
  }
  return api.get("/wisatalokal/tours", { params });
};

export const getLocalTourDetail = async (slug) => {
  if (USE_DUMMY) return getTourDetail(slug);
  return api.get(`/wisatalokal/tours/${slug}`);
};

export const getNationalCategories = async () => {
  if (USE_DUMMY) {
    return {
      data: { data: dummyCategories.filter((c) => c.type === "national") },
    };
  }
  return api.get("/nasional/categories");
};

export const getNationalTours = async (params = {}) => {
  if (USE_DUMMY) {
    const categorySlug = params.category;
    const list = dummyTours.filter((t) => t.category?.type === "national");
    if (!categorySlug) return { data: { data: list } };
    return {
      data: { data: list.filter((t) => t.category?.slug === categorySlug) },
    };
  }
  return api.get("/nasional/tours", { params });
};

export const getNationalTourDetail = async (slug) => {
  if (USE_DUMMY) return getTourDetail(slug);
  return api.get(`/nasional/tours/${slug}`);
};

export const getInternationalRegions = async () => {
  if (USE_DUMMY) {
    return {
      data: { data: dummyCategories.filter((c) => c.type === "international") },
    };
  }
  return api.get("/internasional/regions");
};

export const getInternationalTours = async (params = {}) => {
  if (USE_DUMMY) {
    const categorySlug = params.category;
    const list = dummyTours.filter((t) => t.category?.type === "international");
    if (!categorySlug) return { data: { data: list } };
    return {
      data: { data: list.filter((t) => t.category?.slug === categorySlug) },
    };
  }
  return api.get("/internasional/tours", { params });
};

export const getInternationalTourDetail = async (slug) => {
  if (USE_DUMMY) return getTourDetail(slug);
  return api.get(`/internasional/tours/${slug}`);
};

export default api;
