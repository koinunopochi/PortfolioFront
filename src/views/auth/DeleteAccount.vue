<!-- DeleteAccount.vue -->
<template>
  <table>
    <tr>
      <th>username</th>
      <th>role</th>
      <th>delete</th>
    </tr>
    <tr
      v-for="user in users"
      :key="user.username"
      :class="{ admin: user.role === 'admin', user: user.role === 'user' }"
    >
      <td>{{ user.username }}</td>
      <td>{{ user.role }}</td>
      <td>
        <button @click="confirmDelete(user.username)" class="btn danger">delete</button>
      </td>
    </tr>
  </table>
</template>

<style scoped>
/* 表の基本スタイル */
table {
  margin: 80px auto;
  border-collapse: collapse;
  width: 80%;
}

th,
td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}

th {
  background-color: black;
  color: white;
}

/* roleがadminの場合のスタイル */
tr.admin {
  background-color: green;
  color: white;
}

/* roleがuserの場合のスタイル */
tr.user {
  background-color: white;
  color: black;
}
</style>

<!-- 以降のscript部分はそのまま -->

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
  const res_json = await res.json();
  users.value = res_json; // ここで 'userInfo' を指定します。
};
const deleteUser = async (username: string) => {
  const res = await easyFetch('DELETE', new URL(apiUrl + '/auth/delete'), {
    username,
  });
  const res_json = await res.json();
  console.log(res_json);
  getUsers();
};
// 本当に削除してよいか確認する
const confirmDelete = (username: string) => {
  const result = prompt('本当に削除してよいですか？');
  console.log(result);
  
  // キャンセルがクリックされた場合
  if (result === null) {
    console.log('キャンセルされました');
    return;
  }

  // 入力された結果が username と異なる場合
  if (result !== username) {
    console.log('ユーザー名が正しくありません');
    return;
  }

  // ここで削除の処理を実行
  deleteUser(username);
};

onMounted(() => {
  getUsers();
});
</script>
