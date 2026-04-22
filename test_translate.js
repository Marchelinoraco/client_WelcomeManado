import axios from 'axios';
async function translateText(text, targetLang, sourceLang = 'auto') {
  if (!text) return text;
  const target = targetLang;
  const source = sourceLang;
  try {
    const response = await axios.get(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encodeURIComponent(text)}`
    );
    if (response.data && response.data[0]) {
      return response.data[0].map((item) => item[0]).join('');
    }
    return text;
  } catch (error) {
    console.error('Auto Translate Error:', error.message);
    return text;
  }
}
translateText('Kolam Renang', 'en', 'auto').then(console.log);
