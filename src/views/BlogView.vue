<!-- BlogView.vue -->
<template>
  <div class="all-contents">
    <!-- サイドバー -->
    <SideBar />
    <div class="main projects md">
      <div class="header-wrapper">
        <h1>{{ contents.title }}</h1>

        <button v-if="is_admin" class="btn danger" @click="deleteSubmit()">
          削除
        </button>
        <div class="flex end column">
          <span>作成日：{{ contents.date }}</span>
          <span>更新日：{{ contents.update_date }}</span>
        </div>
      </div>

      <div class="tag-contents">
        <p
          class="category"
          :class="contents.category"
          v-if="['info', 'blog', 'project'].includes(contents.category)"
        >
          {{ contents.category }}
        </p>
        <div class="tags">
          <span v-for="tag in contents.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
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
import getLinksFromHTML from '../utils/updateClass';
import formatJapaneseDate from '../utils/date';

const apiUrl = import.meta.env.VITE_APP_API_DOMAIN;

// const router = useRouter();
const route = useRoute();

// :idパラメータを取得
const projectId = ref<string>(route.params.id as string);

const tableOfContentsItems = ref<{ id: string; name: string }[]>([]);
const rawHtml = ref('');
// const title = ref('');
// const category = ref('');
const contents = ref({
  id: projectId.value,
  title: 'ERROR 404: Page Not Found',
  category: 'ERROR',
  tags: ['ERROR'],
  description: 'ページが見つかりませんでした',
  content: '情報がありません',
  date: 'ERROR',
  update_date: 'ERROR',
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
      const convertedMarkdown = marked(blog.content);
      const convertedLinks = await getLinksFromHTML(
        convertedMarkdown,
        'same-link'
      );
      rawHtml.value = convertedLinks;
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

onMounted(async () => {
  console.log(projectId.value);
  await getBlog();
  contents.value.date = formatJapaneseDate(contents.value.date);
  contents.value.update_date = formatJapaneseDate(contents.value.update_date);
  is_admin.value = await isAdmin();
});
</script>
<style scoped>
@import '../assets/main.css';
.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; /* 追加 */
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
@import '../assets/blog.css';
</style>
<style scoped>
@media (max-width: 768px) {
  .all-contents {
    /* 配置を中央に */
    display: flex;
    justify-content: center;
    .main {
      /* 100％ */
      width: 100%;
      /* 余白を削除 */
      margin: 0;
      padding: 20px 3%;
    }
  }
}
</style>
