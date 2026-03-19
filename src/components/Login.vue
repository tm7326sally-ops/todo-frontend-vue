<script setup lang="ts">
import { ref } from 'vue';
import api from '../api/axios';
//import { authState } from '../store/auth';
import { useAuthStore } from '../store/auth'; // Piniaストアをインポート
import { useRouter } from 'vue-router';         // ルーターをインポート
import { mdiAccount, mdiLock } from '@mdi/js';  // アイコンの実体をインポート

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const loading = ref(false);
const router = useRouter(); // ルーターを使えるようにする
const authStore = useAuthStore(); // ストアを使用可能にする

const handleLogin = async () => {
  // 2. 修正： .ref = true ではなく .value = true です
  loading.value = true;
  try {
    errorMessage.value = '';
    console.log('ログイン試行中...');

    const res = await api.post('/api/auth/login', {
      username: username.value,
      password: password.value
    });

    console.log('ログイン成功！レスポンス:', res.data);
    
    // 成功したらトークンを保存
    //authState.login(res.data.token, username.value);

    // レスポンスからトークンとユーザー名を取得してストアに保存
    authStore.login(res.data.token, res.data.username);

    // 成功したら TODO リスト画面へ強制的に移動する
    router.push('/todos');

  } catch (error: any) {
    console.error('ログインエラー詳細:', error.response || error);
    // console.error('Login failed', error);
    errorMessage.value = 'ユーザー名またはパスワードが正しくありません。';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-row justify="center" class="mt-10">
    <v-col cols="12" sm="8" md="4">
      <v-card elevation="4" class="pa-6">
        <v-card-title class="text-h5 text-center mb-4">ログイン</v-card-title>
        
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="username"
            label="ユーザー名"
            :prepend-inner-icon="mdiAccount"
            required
            variant="outlined"
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="パスワード"
            :prepend-inner-icon="mdiLock"
            type="password"
            required
            variant="outlined"
            class="mt-2"
          ></v-text-field>

          <v-alert v-if="errorMessage" type="error" density="compact" class="mt-4">
            {{ errorMessage }}
          </v-alert>

          <v-btn
            type="submit"
            color="teal-darken-1"
            block
            size="large"
            class="mt-6"
            :loading="loading"
          >
            ログイン
          </v-btn>
        </v-form>

        <v-card-text class="text-center mt-4">
          アカウントをお持ちでないですか？
          <router-link to="/signup" class="text-teal-darken-1 font-weight-bold">
            新規登録
          </router-link>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>