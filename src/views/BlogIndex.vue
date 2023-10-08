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
          <p>{{ content.overview }}</p>
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
    overview: 'ページが見つかりませんでした',
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
.all-contents {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  /* padding: 40px; */
  background-color: #f5f5f5; /* 背景を少しグレーにして白のコンテンツが映えるように */
}

.main {
  width: 80%;
  margin-top: 20px;
  padding: 40px;
  background-color: #fff;
  border-radius: 12px; /* 角をもう少し丸く */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 影を追加 */
  margin-bottom: 20px;
  margin-right: 10px;
}

.main h1 {
  text-align: center;
  margin-bottom: 50px;
  font-size: 2em; /* タイトルのフォントサイズを大きく */
  color: #333; /* タイトルの色を濃く */
}

.contents {
  margin-bottom: 40px; /* コンテンツ間のスペースを増やす */
}

.content {
  border: 1px solid #b0e57c; /* 薄い緑のボーダー */
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s ease; /* クリック時の遷移効果 */
  cursor: pointer;
}

.content:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* ホバー時の影を追加 */
  transform: translateY(-3px); /* ホバー時に少し上に動かす */
}
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
