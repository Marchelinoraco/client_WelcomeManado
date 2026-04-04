import { createI18n } from "vue-i18n";
import en from "./locales/en";
import id from "./locales/id";
import zh from "./locales/zh";
import ko from "./locales/ko";

const messages = {
  en,
  id,
  zh,
  ko,
};

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem("locale") || "id",
  fallbackLocale: "en",
  messages,
});

export default i18n;
