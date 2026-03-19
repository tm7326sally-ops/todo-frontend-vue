import { reactive } from 'vue';

// ログイン状態を管理するオブジェクト
export const authState = reactive({
  token: localStorage.getItem('token') || '',
  username: localStorage.getItem('username') || '',
  isAuthenticated: !!localStorage.getItem('token'), // トークンがあれば true

  // ログイン成功時に呼ぶメソッド
  login(token: string, username: string) {
    this.token = token;
    this.username = username;
    this.isAuthenticated = true;
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  },

  // ログアウト時に呼ぶメソッド
  logout() {
    this.token = '';
    this.username = '';
    this.isAuthenticated = false;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
});