<!-- CreateAccount.vue -->
<template>
  <div class="account-container">
    <div class="header">アカウント作成</div>
    <form @submit.prevent="createAccount">
      <div class="input-group">
        <label for="username">ユーザー名:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="input-group">
        <label for="password">パスワード:</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <div class="submit-button">
        <button type="submit">アカウント作成</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { easyFetch } from '../../utils/submit';

const apiUrl = import.meta.env.VITE_APP_API_DOMAIN;

const username = ref('');
const password = ref('');

const createAccount = async () => {
  try {
    const res = await easyFetch('POST', new URL(apiUrl + '/auth/signup'), {
      username: username.value,
      password: password.value,
    });

    alert('アカウントを作成しました。');
  } catch (error) {
    alert('アカウントの作成に失敗しました。');
  }
};
</script>

<style scoped>
.account-container {
  max-width: 400px;
  margin: 80px auto;
  padding: 20px;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.header {
  /* background-color: black; */
  /* color: white; */
  text-align: center;
  padding: 10px 0;
  border-radius: 9px 9px 0 0;
  font-weight: bold;
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.3s;
}

input:focus {
  border-color: green;
}

.submit-button {
  text-align: center;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: green;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: darkgreen;
}
</style>
