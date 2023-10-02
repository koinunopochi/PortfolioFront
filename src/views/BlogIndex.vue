<!-- BlogIndex.vue -->
<template>
  <div class="all-contents">
    <!-- サイドバー -->
    <SideBar />
    <div class="main projects">
      <h1>Projects・Blogs</h1>
      <div class="contents" v-for="content in contents" :key="content._id">
        <div class="content" :id="content._id" @click="move(content._id)">
          <h3>{{ content.title }}</h3>
          <h4>概要</h4>
          <p>{{ content.description }}</p>
        </div>
      </div>
    </div>
    <TableOfContents :items="tableOfContentsItems" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { easyFetch } from '../utils/submit';
import SideBar from '../components/SideBar.vue';
import TableOfContents from '../components/TableOfContents.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const tableOfContentsItems = ref<{ id: string; name: string }[]>([]);
const apiUrl = import.meta.env.VITE_APP_API_DOMAIN;

const contents = ref([
  {
    _id: '1afodivjadf',
    title: 'ERROR 404: Page Not Found',
    description: 'ページが見つかりませんでした',
  },
]);

const getContents = async () => {
  try {
    const res = await easyFetch('GET', new URL(`${apiUrl}/blog`), {});
    if (res.ok) {
      contents.value = await res.json();
      for (const content of contents.value) {
        tableOfContentsItems.value.push({
          id: content._id,
          name: content.title,
        });
      }
      console.log(contents.value);
      console.log(tableOfContentsItems);
    } else {
      console.error('API Request Failed', await res.text());
    }
  } catch (error) {
    console.error('Failed to fetch contents', error);
  }
};

getContents();

const move = (id: string) => {
  console.log(id);
  router.push(`/project-blog/${id}`);
};
</script>
<style scoped>
@import '../assets/main.css';
</style>
<style scoped>
.contents {
  /* 線を入れる */
  border: solid 3px #a7ff9d;
  /* 余白を入れる */
  padding: 10px;
  /* 角を丸くする */
  border-radius: 8px;
  margin-bottom: 20px;
  /* 中央に配置 */
  text-align: center;
}
.contents:hover {
  background-color: #a7ff9d;
}
</style>
