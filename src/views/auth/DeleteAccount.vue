<!-- DeleteAccount.vue -->
<template>
  <table>
    <tr>
      <th>username</th>
      <th>role</th>
    </tr>
    <tr v-for="user in users" :key="user.username">
      <td>{{ user.username }}</td>
      <td>{{ user.role }}</td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { easyFetch } from '../../utils/submit';

const users = ref(
  [] as {
    username: string;
    role: string;
  }[]
);

const apiUrl = import.meta.env.VITE_APP_API_DOMAIN;

const getUsers = async () => {
  const res = await easyFetch('GET', new URL(apiUrl + '/auth/user'));
  users.value = res.data.userInfo; // ここで 'userInfo' を指定します。
};

onMounted(() => {
  getUsers();
});
</script>
