<script setup lang="ts">
import { ref } from 'vue';
import api from '../api/axios';
import { useRouter } from 'vue-router';
// アイコンをインポート
import { mdiAccountPlus, mdiLock, mdiArrowLeft } from '@mdi/js';

const username = ref('');
const password = ref('');
const email = ref('');
const loading = ref(false);
const router = useRouter();

const handleRegister = async () => {
  loading.value = true;
  try {
    await api.post('/api/auth/signup', {
      username: username.value,
      password: password.value,
      email: email.value
    });

    alert('ユーザー登録が完了しました！ログインしてください。');
    router.push('/login');
  } catch (error) {
    alert('登録に失敗しました。ユーザー名が既に使用されている可能性があります。');
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-row justify="center" class="mt-10">
    <v-col cols="12" sm="8" md="4">
      <v-card elevation="4" class="pa-6">
        <v-card-title class="text-h5 text-center mb-4">
            新規ユーザー登録
        </v-card-title>
        
        <v-form @submit.prevent="handleRegister">
          <v-text-field
            v-model="username"
            label="希望のユーザー名"
            :prepend-inner-icon="mdiAccountPlus"
            variant="outlined"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="パスワード"
            :prepend-inner-icon="mdiLock"
            type="password"
            variant="outlined"
            class="mt-2"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            label="メールアドレス"
            :prepend-inner-icon="mdiEmail"
            type="email"
            variant="outlined"
            class="mt-2"
            required
          ></v-text-field>

          <v-btn
            type="submit"
            color="teal-darken-1"
            block
            size="large"
            class="mt-6"
            :loading="loading"
          >
            アカウントを作成する
          </v-btn>
        </v-form>

        <v-card-text class="text-center mt-4">
          <v-btn variant="text" :prepend-icon="mdiArrowLeft" to="/login" color="grey-darken-1">
            ログイン画面に戻る
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>