<!-- BlogPost.vue -->
<template>
  <div class="all-content">
    <div class="main">
      <h1>BlogPost</h1>
      <div class="form">
        <div class="form-item">
          <label for="docSelect">更新docs</label>
          <br />
          <select id="docSelect" v-model="selectedDocId">
            <option value="new">新規作成</option>
            <option v-for="doc in contents" :key="doc._id" :value="doc._id">
              {{ doc.title || 'No Title' }}
              <!-- タイトルが空の場合 'No Title' を表示 -->
            </option>
          </select>
        </div>
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
          <p class="error-message">{{ error_message }}</p>
        </div>
      </div>
    </div>
    <div class="main md">
      <h1 v-if="title != ''">{{ title }}</h1>
      <h3 v-if="description != ''">概要</h3>
      <p>{{ description }}</p>
      <div v-html="convertedMarkdown"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import { easyFetch } from '../utils/submit';
import { marked } from 'marked';
const apiUrl = import.meta.env.VITE_APP_API_DOMAIN;

const title = ref('');
const description = ref('');
const content = ref('');

const selectedDocId = ref('new'); // 選択されたドキュメントのID

const contents = ref([
  {
    _id: '1afodivjadf',
    title: 'ERROR 404: Page Not Found',
    overview: 'ページが見つかりませんでした',
  },
]);

const error_message = ref('');

const isCheckContents = () => {
  if (title.value == '' || description.value == '' || content.value == '') {
    return false;
  }
  return true;
};

const submit = async () => {
  try {
    if (!isCheckContents()) {
      error_message.value = ' この値は必須です';
      return;
    }else{
      error_message.value = '';
    }
    let method: 'POST' | 'PUT' | 'GET' | 'DELETE' = 'POST';
    let url = '/blog'
    if (selectedDocId.value != 'new') {
      method = 'PUT';
      url = "/blog/"+selectedDocId.value
    }
    const res = await easyFetch(method, new URL(apiUrl + url), {
      title: title.value,
      overview: description.value,
      content: content.value,
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
const convertedMarkdown = ref('');

// watchとの違いが不明
watchEffect(() => {
  convertedMarkdown.value = marked(content.value);
});

const getContents = async () => {
  try {
    const res = await easyFetch('GET', new URL(`${apiUrl}/blog`), {});
    if (res.ok) {
      contents.value = await res.json();
      console.log(contents.value);
    } else {
      console.error('API Request Failed', await res.text());
    }
  } catch (error) {
    console.error('Failed to fetch contents', error);
  }
};

onMounted(() => {
  getContents();
});
</script>
<style scoped>
.all-content {
  display: flex;
  justify-content: space-between;
  align-items: stretch; /* これを追加 */
  gap: 20px;
  max-width: 90%;
  margin: 50px auto 0 auto;
}

.main,
.md {
  flex: 1;
  min-width: 0;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
}

.md {
  align-self: stretch; /* これを追加 */
}

input[type='text'],
textarea {
  font-size: 10px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  margin-bottom: 20px;
}
textarea {
  height: 200px;
}
.form-item {
  margin-bottom: 20px; /* form-itemの間隔を設定 */
}

button {
  padding: 10px 20px; /* ボタンのパディングを設定 */
  background-color: #4caf50; /* ボタンの背景色を設定 */
  color: white; /* テキストの色を設定 */
  border: none; /* ボーダーを無効に */
  cursor: pointer; /* カーソルをポインターに */
  border-radius: 5px; /* ボタンの角を丸める */
  width: 100%;
}

button:hover {
  background-color: #45a049; /* ホバー時の背景色を設定 */
}
.error-message {
  color: red;
}
</style>
<style scoped>
@import '../assets/main.css';
</style>
