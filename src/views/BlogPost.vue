<!-- BlogPost.vue -->
<template>
  <div class="all-content">
    <div class="main">
      <h1>BlogPost</h1>
      <div class="form">
        <div class="form-item">
          <label for="docSelect">更新docs</label>
          <br />
          <select id="docSelect" class="docSelect" v-model="selectedDocId">
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
          <label for="category">カテゴリー</label>
          <input type="text" id="category" v-model="category" />
        </div>
        <div class="form-item">
          <label for="tags">タグ</label>
          <input type="text" id="tags" v-model="tags" />
        </div>
        <div class="form-item">
          <label for="content">本文</label>
          <textarea
            id="content"
            v-model="content"
            @input="autoResizeTextarea"
          ></textarea>
        </div>
        <div class="form-item">
          <button @click="submit">保存</button>
          <p class="error-message">{{ error_message }}</p>
        </div>
      </div>
    </div>
    <div class="main md">
      <h1 v-if="title != ''">{{ title }}</h1>
      <div class="tag-contents">
        <p
          :class="category"
          v-if="['info', 'blog', 'project'].includes(category)"
        >
          {{ category }}
        </p>
        <div class="tags">
          <span v-for="tag in tagsArray" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
      </div>
      <h3 v-if="description != ''">概要</h3>
      <p>{{ description }}</p>
      <div class="contents" v-html="convertedMarkdown"></div>
    </div>
  </div>
  <InformationModal
    :type="type"
    v-model:isOpen="showModal"
    :content="message"
  />
</template>
<script setup lang="ts">
import { onMounted, ref, watchEffect, watch } from 'vue';
import { easyFetch } from '../utils/submit';
import { marked } from 'marked';
import getLinksFromHTML from '../utils/updateClass';
import InformationModal from '../components/InformationModal.vue';

const apiUrl = import.meta.env.VITE_APP_API_DOMAIN;

const type = ref('success');
const showModal = ref(false);
const message = ref('');

const title = ref('');
const description = ref('');
const category = ref('');
const tags = ref('');
const content = ref(`### 使用技術
- Vue.js
### 機能
- ブログの作成
- ブログの編集
### 工夫した点
### 苦労した点
### 今後の課題`);

const selectedDocId = ref('new'); // 選択されたドキュメントのID
const tagsArray = ref<string[]>([]);
const contents = ref([
  {
    _id: '1afodivjadf',
    title: 'ERROR 404: Page Not Found',
    overview: 'ページが見つかりませんでした',
    category: 'ERROR',
    tags: ['ERROR'],
    content: 'ページが見つかりませんでした',
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
    } else {
      error_message.value = '';
    }
    let method: 'POST' | 'PUT' | 'GET' | 'DELETE' = 'POST';
    let url = '/blog';
    if (selectedDocId.value != 'new') {
      method = 'PUT';
      url = '/blog/' + selectedDocId.value;
    }

    const res = await easyFetch(method, new URL(apiUrl + url), {
      title: title.value,
      overview: description.value,
      category: category.value,
      tags: tagsArray.value,
      content: content.value,
    });
    if (res.ok) {
      console.log('success');
    } else {
      console.error('API Request Failed', await res.text());
    }
    showModal.value = true;
    message.value = '保存に成功しました。';
  } catch (error) {
    type.value = 'error';
    showModal.value = true;
    message.value = '保存に失敗しました。';
    console.error('Failed to fetch contents', error);
  }
};
const convertedMarkdown = ref('');

// watchとの違いが不明
watch(content, async (newValue) => {
  const converted = marked(newValue);
  convertedMarkdown.value = converted;
  convertedMarkdown.value = await getLinksFromHTML(
    convertedMarkdown.value,
    'same-link'
  );
});

watch(tags, (newValue) => {
  tagsArray.value = newValue.split(',');
});

const getContents = async () => {
  try {
    const res = await easyFetch('GET', new URL(`${apiUrl}/blog/overviews`), {});
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

watch(selectedDocId, async (newValue, oldValue) => {
  // ここに変更時のロジックを書く
  if (newValue === 'new') {
    title.value = '';
    description.value = '';
    category.value = '';
    tags.value = '';
    content.value = `### 使用技術
- Vue.js
### 機能
- ブログの作成
- ブログの編集
### 工夫した点
### 苦労した点
### 今後の課題`;
  } else {
    await getBlogContent();
    const selectedDoc = contents.value.find((doc) => doc._id == newValue);
    if (selectedDoc) {
      title.value = selectedDoc.title;
      description.value = selectedDoc.overview;
      category.value = selectedDoc.category;
      tags.value = selectedDoc.tags.join(',');
    }
  }
});

const getBlogContent = async () => {
  try {
    const re = await easyFetch(
      'GET',
      new URL(`${apiUrl}/blog/${selectedDocId.value}`),
      {}
    );
    if (re.ok) {
      const blog = await re.json();
      content.value = blog.content;
    }
  } catch (error) {
    console.error('Failed to fetch contents', error);
  }
};

const autoResizeTextarea = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement;
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
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
  font-size: 16px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  margin-bottom: 20px;
}
textarea {
  min-height: 500px;
  overflow-y: hidden; /* スクロールバーを非表示にする */
  resize: none; /* ユーザーが手動でリサイズするのを防ぐ */
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

.docSelect {
  width: 100%; /* select要素の横幅を親要素に合わせる */
  box-sizing: border-box; /* paddingとborderを含めて横幅を100%にする */
  border: none; /* 既存のボーダーを削除 */
  border-bottom: 1px solid #ddd; /* 下線を引く */
  font-size: 12px;
  padding: 10px;
}
</style>
<style scoped>
@import '../assets/main.css';
</style>
<style>
@import '../assets/blog.css';
</style>
