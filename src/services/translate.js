import axios from 'axios';

/**
 * Utilitas untuk menerjemahkan teks secara otomatis menggunakan Google Translate API (Public)
 * Digunakan untuk menerjemahkan data dari API Laravel yang masih berbahasa Indonesia.
 */
export const autoTranslate = async (text, targetLang) => {
  if (!text || targetLang === 'id') return text;

  // Map 'zh' to 'zh-CN' for Google Translate
  const langMap = {
    'en': 'en',
    'zh': 'zh-CN',
    'ko': 'ko'
  };

  const target = langMap[targetLang] || targetLang;

  try {
    const response = await axios.get(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=id&tl=${target}&dt=t&q=${encodeBreadcrumb(text)}`
    );
    
    // Google Translate API returns an array of arrays
    if (response.data && response.data[0]) {
      return response.data[0].map(item => item[0]).join('');
    }
    return text;
  } catch (error) {
    console.error('Auto Translate Error:', error);
    return text; // Fallback to original text if fails
  }
};

// Helper function to handle special characters in URL
function encodeBreadcrumb(text) {
  return encodeURIComponent(text);
}
