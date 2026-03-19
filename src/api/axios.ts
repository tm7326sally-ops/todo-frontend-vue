import axios from 'axios';

// APIの基本設定
const api = axios.create({
  // バックエンド（Spring Boot / Render）のURLに書き換えてください
  baseURL: 'https://todo-backend-iemf.onrender.com', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエスト送信時の割り込み処理（Interceptor）
api.interceptors.request.use(
  (config) => {
    // ローカルストレージからトークンを取得
    const token = localStorage.getItem('token');
    
    // トークンがあれば、ヘッダーに「Bearer <トークン>」をセット
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;