<!-- BlogIndex.vue -->
<template>
  <div class="all-contents justify-c-sp-b flex-row flex-start ">
    <!-- サイドバー -->
    <SideBar />
    <div class="main projects mt-20 mb-20 mr-10 p-40 ">
      <h1>Projects・Blogs</h1>
      <div class="mb-20"> 
        ブログやプロジェクトなどの一覧です。クリックすることで、詳細ページに遷移することができます！！
      </div>
      <div class="btn info mx-w120 mb-20" @click="switchUp()">
        <button v-if="!is_up">更新時間：昇順</button>
        <button v-if="is_up">更新時間：降順</button>
      </div>

      <div class="mb-40" v-for="content in contents" :key="content._id">
        <div class="content" :id="content._id" @click="move(content._id)">
          <h3>{{ content.title }}</h3>
          <p>{{ content.overview }}</p>
          <div class="tag-contents">
            <p
              class="category"
              :class="content.category"
              v-if="['info', 'blog', 'project'].includes(content.category)"
            >
              {{ content.category }}
            </p>
            <div class="tags">
              <span v-for="tag in content.tags" :key="tag" class="tag">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TableOfContents :items="tableOfContentsItems" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { easyFetch } from '../utils/submit';
import SideBar from '../components/SideBar.vue';
import TableOfContents from '../components/TableOfContents.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const tableOfContentsItems = ref<{ id: string; name: string }[]>([]);
const apiUrl = import.meta.env.VITE_APP_API_DOMAIN;

const is_up = ref(localStorage.getItem('is_up') || 'false');

const contents = ref([
  {
    _id: '1afodivjadf',
    title: 'ERROR 404: Page Not Found',
    overview: 'ページが見つかりませんでした',
    category: 'ERROR',
    tags: ['ERROR'],
    update_date: 'ERROR',
    date: 'ERROR',
  },
]);

const getContents = async () => {
  try {
    const res = await easyFetch('GET', new URL(`${apiUrl}/blog/overviews`), {});
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

const move = (id: string) => {
  console.log(id);
  router.push(`/project-blog/${id}`);
};

const switchUp = () => {
  let isUp = localStorage.getItem('is_up');

  // is_upがローカルストレージに存在しない場合、またはfalseの場合
  if (isUp === null || isUp === 'false') {
    isUp = 'true';
    // 降順 -> 昇順
    // 更新時間でソート
    contents.value.sort((a, b) => {
      if (a.update_date < b.update_date) return -1;
      if (a.update_date > b.update_date) return 1;
      return 0;
    });
  } else {
    isUp = 'false';
    // 昇順 -> 降順
    // 更新時間でソート
    contents.value.sort((a, b) => {
      if (a.update_date < b.update_date) return 1;
      if (a.update_date > b.update_date) return -1;
      return 0;
    });
  }

  // 更新されたis_upの値をローカルストレージに保存
  localStorage.setItem('is_up', isUp);
  // is_upの値を更新
  is_up.value = isUp === 'true';
};

onMounted(() => {
  getContents();
  const isUp = localStorage.getItem('is_up');
  if (isUp === null || isUp === 'false') {
    is_up.value = false;
  } else {
    is_up.value = true;
  }
});
</script>
<style scoped>
.main {
  width: 80%;
  background-color: #fff;
  border-radius: 12px; /* 角をもう少し丸く */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 影を追加 */
}

.main h1 {
  text-align: center;
  margin-bottom: 50px;
  font-size: 2em; /* タイトルのフォントサイズを大きく */
  color: #333; /* タイトルの色を濃く */
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
      margin-right: 0px !important;
      /* padding: 20px 3%; */
    }
  }
}
</style>
<style>
@import '../assets/blog.css';
</style>
