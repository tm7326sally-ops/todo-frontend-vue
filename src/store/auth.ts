import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // --- State ---
  const isAuthenticated = ref(false)
  const username = ref('')
  const token = ref('')

  // --- Actions ---
  const login = (newToken: string, newUsername: string) => {
    token.value = newToken
    username.value = newUsername
    isAuthenticated.value = true
  }

  const logout = () => {
    token.value = ''
    username.value = ''
    isAuthenticated.value = false
  }

  return {
    isAuthenticated,
    username,
    token,
    login,
    logout
  }
}, {
  persist: true // リロードしても token 等を保持する設定
})