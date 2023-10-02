<!-- BlogView.vue -->
<template>
  <div class="all-contents">
    <!-- サイドバー -->
    <SideBar />
    <div class="main projects">
      <h1>{{ contents.title }}</h1>
      <div class="contents" v-html="processedHtml"></div>
    </div>
    <TableOfContents :items="tableOfContentsItems" />
  </div>
</template>

<script setup lang="ts">
import SideBar from '../components/SideBar.vue';
import TableOfContents from '../components/TableOfContents.vue';
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { easyFetch } from '../utils/submit';

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

onMounted(() => {
  console.log(projectId.value);
  getBlog();
});

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
      rawHtml.value = blog.content;
    } else {
      console.error('API Request Failed', await res.text());
    }
  } catch (error) {
    console.error('Failed to fetch contents', error);
  }
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
</script>
<style scoped>
@import '../assets/main.css';
</style>
