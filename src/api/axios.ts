import axios from 'axios';
import { useAuthStore } from '../store/auth';

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
    // const token = localStorage.getItem('token');
    
    // // トークンがあれば、ヘッダーに「Bearer <トークン>」をセット
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    // インターセプターの中でストアを呼び出す
    const authStore = useAuthStore();
  
    // ストア内のトークンを確認
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const authStore = useAuthStore();
      authStore.logout(); // ストアをクリア
      window.location.href = '/login'; // ログイン画面へ強制遷移
    }
    return Promise.reject(error);
  }
);

export default api;