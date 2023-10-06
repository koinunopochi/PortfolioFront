<!-- BlogView.vue -->
<template>
  <div class="all-contents">
    <!-- サイドバー -->
    <SideBar />
    <div class="main projects">
      <div class="header-wrapper">
        <h1>{{ contents.title }}</h1>
        <button v-if="is_admin" class="btn danger" @click="deleteSubmit()">削除</button>
      </div>
      <div class="contents" v-html="processedHtml"></div>
    </div>
    <TableOfContents :items="tableOfContentsItems" />
  </div>
</template>

<script setup lang="ts">
import SideBar from '../components/SideBar.vue';
import TableOfContents from '../components/TableOfContents.vue';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { easyFetch } from '../utils/submit';
import { marked } from 'marked';
import { isAdmin } from '../utils/checkAdmin';

const apiUrl = import.meta.env.VITE_APP_API_DOMAIN;

// const router = useRouter();
const route = useRoute();

// :idパラメータを取得
const projectId = ref<string>(route.params.id as string);

const tableOfContentsItems = ref<{ id: string; name: string }[]>([]);
const rawHtml = ref('');
// const title = ref('');
const contents = ref({
  id: projectId.value,
  title: 'ERROR 404: Page Not Found',
  description: 'ページが見つかりませんでした',
  content: '情報がありません',
});

const is_admin = ref(false);


const getBlog = async () => {
  try {
    const res = await easyFetch(
      'GET',
      new URL(`${apiUrl}/blog/${projectId.value}`),
      {}
    );
    if (res.ok) {
      const blog = await res.json();
      contents.value = blog;
      rawHtml.value = convertedMarkdown(blog.content);
    } else {
      console.error('API Request Failed', await res.text());
    }
  } catch (error) {
    console.error('Failed to fetch contents', error);
  }
};

const convertedMarkdown = (value:string) => {
  return marked(value);
};

const processedHtml = computed(() => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHtml.value, 'text/html');
  let count = 1;

  doc.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((element) => {
    element.id = 'heading-' + count++;
    tableOfContentsItems.value.push({
      id: element.id,
      name: element.textContent as string,
    });
  });

  return doc.body.innerHTML;
});

const deleteSubmit = async () => {
  try {
    const res = await easyFetch(
      'DELETE',
      new URL(`${apiUrl}/blog/${projectId.value}`),
      {}
    );
    if (res.ok) {
      console.log('success');
    } else {
      console.error('API Request Failed', await res.text());
    }
  } catch (error) {
    console.error('Failed to fetch contents', error);
  }
};

onMounted(async() => {
  console.log(projectId.value);
  getBlog();
  is_admin.value = await isAdmin();
});
</script>
<style scoped>
@import '../assets/main.css';
div.contents > ul {
  /* コンテンツの中にある、ulの位置を調整したい */
  list-style: none;
  padding: 10px;
  margin: 10px;

}
div.contents > ul > li {
  /* コンテンツの中にある、ulの位置を調整したい */
  list-style: none;
  padding: 10px;
  margin: 10px;
  
}

.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;  /* 追加 */
}

.btn.danger {
  /* 他のボタンスタイルをここに追加 */
  margin-left: auto;
}

.btn {
  margin: 10px 5px;
  padding: 10px;
  border-radius: 5px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: all 0.3s ease;
}
.danger {
  color: #fff;
  background-color: #ff0000;
  border: 1px solid #ff0000;
}
.danger:hover {
  background-color: #8b0000;
  border: 1px solid #ff0000;
  color: #fff;
}
</style>
<style>
.contents h1,
.contents h2,
.contents h3,
.contents h4,
.contents h5,
.contents h6{
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 10px;
    border-bottom: solid 1px #ddd;
}
.contents{
  margin: 10px 5px;
  padding: 10px;
  border-radius: 5px;
  /* background-color: #f5f5f5; */
  border: 1px solid #ccc;
  cursor: pointer;
  transition: all 0.3s ease;
}
.contents>ul,
.contents>ol{
  margin-bottom: 5px;
  padding-left: 20px;
  padding-bottom: 5px;
  border-radius: 5px;
}
</style>