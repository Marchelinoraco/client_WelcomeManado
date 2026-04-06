import axios from 'axios';

/**
 * Utilitas untuk menerjemahkan teks secara otomatis menggunakan Google Translate API (Public)
 * Digunakan untuk menerjemahkan data dari API Laravel yang masih berbahasa Indonesia.
 */
export const translateText = async (text, targetLang, sourceLang = 'auto') => {
  if (!text) return text;

  const langMap = {
    en: 'en',
    id: 'id',
    zh: 'zh-CN',
    ko: 'ko',
  };

  const target = langMap[targetLang] || targetLang;
  const source = sourceLang === 'auto' ? 'auto' : (langMap[sourceLang] || sourceLang);

  try {
    const response = await axios.get(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encodeBreadcrumb(text)}`
    );

    if (response.data && response.data[0]) {
      return response.data[0].map((item) => item[0]).join('');
    }

    return text;
  } catch (error) {
    console.error('Auto Translate Error:', error);
    return text;
  }
};

export const autoTranslate = async (text, targetLang) => {
  if (!text || targetLang === 'id') return text;

  return translateText(text, targetLang, 'id');
};

// Helper function to handle special characters in URL
function encodeBreadcrumb(text) {
  return encodeURIComponent(text);
}
