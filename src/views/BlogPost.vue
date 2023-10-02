<!-- BlogPost.vue -->
<template>
  <div class="main">
    <h1>BlogPost</h1>
    <div class="form">
      <div class="form-item">
        <label for="title">タイトル</label>
        <input type="text" id="title" v-model="title" />
      </div>
      <div class="form-item">
        <label for="description">概要</label>
        <input type="text" id="description" v-model="description" />
      </div>
      <div class="form-item">
        <label for="content">本文</label>
        <textarea id="content" v-model="content"></textarea>
      </div>
      <div class="form-item">
        <button @click="submit">送信</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { easyFetch } from '../utils/submit';

const apiUrl = import.meta.env.VITE_APP_API_DOMAIN;

const title = ref('');
const description = ref('');
const content = ref('');

const submit = async() => {
  try{
    const res = await easyFetch('POST', new URL(apiUrl+'/blog'), {
      title: title.value,
      description: description.value,
      content: content.value
    });
    if (res.ok) {
      console.log('success');
    } else {
      console.error('API Request Failed', await res.text());
    }
  } catch (error) {
    console.error('Failed to fetch contents', error);
  }
};
</script>
<style scoped>
.main {
  background-color: #fff; /* Mainの背景色 */
  padding: 20px; /* パディングを適用 */
  border-radius: 10px; /* 角を丸める */
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1); /* 影をつける */
  max-width: 600px; /* 最大幅を設定 */
  margin: auto; /* 中央寄せ */
}
input[type='text'],
textarea{
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  margin-bottom: 20px;
}
.form-item {
  margin-bottom: 20px; /* form-itemの間隔を設定 */
}

button {
  padding: 10px 20px; /* ボタンのパディングを設定 */
  background-color: #4CAF50; /* ボタンの背景色を設定 */
  color: white; /* テキストの色を設定 */
  border: none; /* ボーダーを無効に */
  cursor: pointer; /* カーソルをポインターに */
  border-radius: 5px; /* ボタンの角を丸める */
}

button:hover {
  background-color: #45a049; /* ホバー時の背景色を設定 */
}
</style>
