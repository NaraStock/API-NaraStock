const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.NEWS_API_KEY;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
const BACKEND_URL = 'http://localhost:5000/articles';

const fetchAndUpload = async () => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us', {
      headers: { 'X-Api-Key': API_KEY },
    });

    const articles = response.data.articles;

    for (let i = 0; i < Math.min(5, articles.length); i++) {
      const { title, content, description } = articles[i];

      const articleData = {
        title: title || 'Tanpa Judul',
        content: content || description || 'Tidak ada konten',
      };

      const upload = await axios.post(BACKEND_URL, articleData, {
        headers: {
          Authorization: `Bearer ${ADMIN_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(`✅ Upload artikel ${i + 1}:`, upload.data.article.title);
    }
  } catch (error) {
    console.error('❌ Gagal:', error.response?.data || error.message);
  }
};

fetchAndUpload();
