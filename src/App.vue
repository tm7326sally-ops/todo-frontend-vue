<script setup lang="ts">
//import { authState } from './store/auth';
import { useAuthStore } from './store/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore(); // ストアを初期化
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<template>
  <v-app>
    <v-app-bar color="teal-darken-1" elevation="2">
      <v-app-bar-title>Todo Application</v-app-bar-title>
      
      <v-spacer></v-spacer>

      <div v-if="authStore.isAuthenticated" class="d-flex align-center mr-4">
        <span class="mr-3">{{ authStore.username }} さん</span>
        <v-btn variant="outlined" color="white" @click="handleLogout" size="small">
          ログアウト
        </v-btn>
      </div>
      <div v-else class="mr-4">
        <v-btn to="/login" variant="text">ログイン</v-btn>
        <v-btn to="/signup" variant="text">新規登録</v-btn>
      </div>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
/* Vuetifyがレイアウトを管理してくれるため、
  以前の .container や header などの CSS は削除してOKです！
*/
</style>