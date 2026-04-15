const SITE_NAME = "WelcomeManado";
const SITE_URL = import.meta.env.VITE_SITE_URL || "https://welcomemanado.my.id";
const DEFAULT_DESCRIPTION =
  "WelcomeManado menghadirkan paket tour Manado, hotel, galeri, dan informasi perjalanan terbaik untuk wisatawan lokal maupun internasional.";
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80";

const ensureMeta = (selector, attributes) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });
  return el;
};

const ensureLink = (selector, attributes) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("link");
    document.head.appendChild(el);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });
  return el;
};

export const getSiteUrl = () => SITE_URL.replace(/\/$/, "");

export const getAbsoluteUrl = (path = "/") => {
  if (/^https?:\/\//i.test(path)) return path;
  const base = getSiteUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
};

export const buildTitle = (title) =>
  title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Tour, Hotel, dan Paket Wisata Manado`;

export const applySeo = ({
  title,
  description,
  image,
  url,
  type = "website",
  robots = "index,follow",
  keywords,
} = {}) => {
  const finalTitle = buildTitle(title);
  const finalDescription = description || DEFAULT_DESCRIPTION;
  const finalImage = image || DEFAULT_IMAGE;
  const finalUrl = getAbsoluteUrl(url || window.location.pathname);

  document.title = finalTitle;

  ensureMeta('meta[name="description"]', {
    name: "description",
    content: finalDescription,
  });
  ensureMeta('meta[name="robots"]', { name: "robots", content: robots });
  ensureMeta('meta[name="theme-color"]', {
    name: "theme-color",
    content: "#0f172a",
  });

  if (keywords) {
    ensureMeta('meta[name="keywords"]', { name: "keywords", content: keywords });
  }

  ensureMeta('meta[property="og:title"]', {
    property: "og:title",
    content: finalTitle,
  });
  ensureMeta('meta[property="og:description"]', {
    property: "og:description",
    content: finalDescription,
  });
  ensureMeta('meta[property="og:type"]', {
    property: "og:type",
    content: type,
  });
  ensureMeta('meta[property="og:url"]', {
    property: "og:url",
    content: finalUrl,
  });
  ensureMeta('meta[property="og:site_name"]', {
    property: "og:site_name",
    content: SITE_NAME,
  });
  ensureMeta('meta[property="og:image"]', {
    property: "og:image",
    content: finalImage,
  });
  ensureMeta('meta[name="twitter:card"]', {
    name: "twitter:card",
    content: "summary_large_image",
  });
  ensureMeta('meta[name="twitter:title"]', {
    name: "twitter:title",
    content: finalTitle,
  });
  ensureMeta('meta[name="twitter:description"]', {
    name: "twitter:description",
    content: finalDescription,
  });
  ensureMeta('meta[name="twitter:image"]', {
    name: "twitter:image",
    content: finalImage,
  });
  ensureLink('link[rel="canonical"]', {
    rel: "canonical",
    href: finalUrl,
  });
};

