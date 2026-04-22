import axios from 'axios';
async function translateText(text, targetLang, sourceLang = 'auto') {
  if (!text) return text;
  try {
    const response = await axios.get(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
    );
    if (response.data && response.data[0]) {
      return response.data[0].map((item) => item[0]).join('');
    }
    return text;
  } catch (error) {
    return text;
  }
}
translateText('Kamar bebas alkohol (sesuai permintaan)', 'en', 'auto').then(console.log);
