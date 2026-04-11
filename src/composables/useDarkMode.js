import { ref, watch, onMounted } from "vue";

const isDark = ref(false);

export function useDarkMode() {
  const applyTheme = (dark) => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggle = () => {
    isDark.value = !isDark.value;
  };

  // Initialize on first use
  onMounted(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      isDark.value = true;
    } else if (saved === "light") {
      isDark.value = false;
    } else {
      // Follow system preference
      isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    applyTheme(isDark.value);
  });

  // Watch for changes
  watch(isDark, (val) => {
    localStorage.setItem("theme", val ? "dark" : "light");
    applyTheme(val);
  });

  return { isDark, toggle };
}
