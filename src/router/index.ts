import { createRouter, createWebHistory } from 'vue-router';
//import { authState } from '../store/auth';
import { useAuthStore } from '../store/auth';
import TodoList from '../components/TodoList.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue'; 

const routes = [
  { path: '/', redirect: '/todos' },
  { path: '/login', component: Login },
  { path: '/signup', component: Register },
  { 
    path: '/todos', 
    component: TodoList,
    meta: { requiresAuth: true } // 認証が必要なフラグ
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ナビゲーションガード（プロの実装：ページ遷移前のチェック）
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore(); // ここでストアを呼び出す

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // 認証が必要なページなのにログインしてなければログイン画面へ
    next('/login');
  } else if ((to.path === '/login' || to.path === '/signup') && authStore.isAuthenticated) {
    // ログイン済みならログイン・登録画面には行かせずTODOへ
    next('/todos');
  } else {
    next();
  }
});

export default router;