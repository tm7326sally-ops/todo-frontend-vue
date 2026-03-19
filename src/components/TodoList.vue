<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../api/axios';
// アイコンを使用するためにインポート
import { mdiPlus, mdiDelete, mdiCheckCircle, mdiCircleOutline } from '@mdi/js';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const todos = ref<Todo[]>([]);
const newTodoTitle = ref('');
const loading = ref(false);

const fetchTodos = async () => {
  loading.value = true;
  try {
    const res = await api.get('/api/todos');
    todos.value = res.data;
  } catch (error) {
    console.error('データの取得に失敗しました', error);
  } finally {
    loading.value = false;
  }
};

const addTodo = async () => {
  if (!newTodoTitle.value.trim()) return;
  try {
    const res = await api.post('/api/todos', { title: newTodoTitle.value });
    todos.value.push(res.data);
    newTodoTitle.value = '';
  } catch (error) {
    alert('追加に失敗しました');
  }
};

const toggleTodo = async (id: number) => {
  try {
    await api.put(`/api/todos/${id}/toggle`);
    const todo = todos.value.find(t => t.id === id);
    if (todo) todo.completed = !todo.completed;
  } catch (error) {
    alert('更新に失敗しました');
  }
};

const deleteTodo = async (id: number) => {
  try {
    await api.delete(`/api/todos/${id}`);
    todos.value = todos.value.filter(t => t.id !== id);
  } catch (error) {
    alert('削除に失敗しました');
  }
};

onMounted(fetchTodos);
</script>

<template>
  <v-row justify="center">
    <v-col cols="12" md="8" lg="6">
      <v-card elevation="2" class="pa-4">
        <v-card-title class="text-h5 font-weight-bold mb-4">
          マイタスク
        </v-card-title>

        <v-text-field
          v-model="newTodoTitle"
          label="新しいタスクを追加..."
          variant="outlined"
          clearable
          @keyup.enter="addTodo"
        >
          <template #append-inner>
            <v-btn
              color="teal-darken-1"
              variant="text"
              :icon="mdiPlus"
              @click="addTodo"
            ></v-btn>
          </template>
        </v-text-field>

        <v-progress-linear
          v-if="loading"
          indeterminate
          color="teal-darken-1"
          class="mb-4"
        ></v-progress-linear>

        <v-list v-if="todos.length > 0" lines="one">
          <template v-for="(todo, index) in todos" :key="todo.id">
            <v-divider v-if="index !== 0"></v-divider>
            
            <v-list-item class="py-2">
              <template #prepend>
                <v-btn
                  variant="text"
                  :icon="todo.completed ? mdiCheckCircle : mdiCircleOutline"
                  :color="todo.completed ? 'success' : 'grey-darken-1'"
                  @click="toggleTodo(todo.id)"
                ></v-btn>
              </template>

              <v-list-item-title 
                :class="{ 'text-decoration-line-through text-grey': todo.completed }"
                class="text-body-1"
              >
                {{ todo.title }}
              </v-list-item-title>

              <template #append>
                <v-btn
                  variant="text"
                  color="red-lighten-1"
                  :icon="mdiDelete"
                  @click="deleteTodo(todo.id)"
                ></v-btn>
              </template>
            </v-list-item>
          </template>
        </v-list>

        <v-alert
          v-else-if="!loading"
          type="info"
          variant="tonal"
          class="mt-4"
        >
          現在、登録されているタスクはありません。
        </v-alert>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
/* Vuetifyが提供するユーティリティクラス（text-decoration-line-throughなど）を
   活用しているため、独自のCSSはほとんど不要になりました！ */
</style>