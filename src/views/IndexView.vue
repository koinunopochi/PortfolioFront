<template>
  <div class="home-container">
    <!-- ヘッダーセクション -->
    <section class="header-section">
      <h1 class="header-title">岡山晃大</h1>
      <p class="header-subtitle">
        ～　明治学院大学　社会学部　社会福祉学科　３年　～
      </p>
    </section>

    <!-- 自己紹介セクション -->
    <section class="intro-section">
      <p class="intro-text">
        こんにちは！岡山晃大です。フルスタックエンジニアを目指して現在学習中の人間です！！
      </p>
      <div class="centered-container">
        <div class="content-card" @click="goToProject('/about-me')">
          <h3 class="title">About Me</h3>
          <p class="description">詳細はこちらから＞＞</p>
        </div>
      </div>
    </section>

    <!-- 最新のプロジェクトセクション -->
    <section class="projects-section">
      <h2 class="section-title">最新のプロジェクト</h2>
      <div class="project-cards">
        <!-- プロジェクトのカードを繰り返し表示 -->
        <div
          class="content-card"
          v-for="project in recentProjects"
          :key="project._id"
          @click="goToProject('/project-blog', '/' + project._id)"
        >
          <h3 class="title">{{ project.title }}</h3>
          <p class="description">{{ project.overview }}</p>
        </div>
        <div class="centered-container">
          <div class="content-card" @click="goToProject('/project-blog')">
            <h3 class="title">Project・Blog</h3>
            <p class="description">詳細はこちらから＞＞</p>
          </div>
        </div>
      </div>
    </section>
    <!-- contact -->
    <section class="contact-section">
      <h3 class="section-title">Contact</h3>
      <p class="intro-text">
        お問い合わせはこちらからお願いします！
      </p>
      <div class="centered-container">
        <div class="content-card" @click="goToProject('/contact')">
          <h3 class="title">Contact</h3>
          <p class="description">詳細はこちらから＞＞</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { easyFetch } from '../utils/submit';
import { useRouter } from 'vue-router';

const router = useRouter();

const apiUrl = import.meta.env.VITE_APP_API_DOMAIN;
const recentProjects = ref([
  { _id: 1, title: 'error', overview: 'プロジェクト取得に失敗しました' },
]);

const getBlogOverviews = async () => {
  const res = await easyFetch('GET', new URL(apiUrl + '/blog/overviews'));
  if (res.ok) {
    const blogs = await res.json();
    // console.log(blogs);
    recentProjects.value = blogs.slice(-3);
  } else {
    console.error('API Request Failed', await res.text());
  }
};
const goToProject = (path: any, id?: any) => {
  // console.log(id);
  if (!id) {
    router.push(path);
    return;
  }
  router.push(`${path}${id}`);
};
onMounted(async () => {
  await getBlogOverviews();
  // console.log(recentProjects);
});
</script>

<style scoped>
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-container {
  background-color: white;
  color: black;
  font-family: 'Helvetica', 'Arial', sans-serif;
}

.header-section {
  background-color: black;
  color: white;
  padding: 50px 0;
  text-align: center;
}

.header-title {
  font-size: 3em;
  margin: 0;
}

.header-subtitle {
  font-size: 1.5em;
  margin-top: 20px;
}

.intro-section {
  padding: 40px 0;
  text-align: center;
  border-bottom: 2px solid green;
}

.projects-section {
  border-bottom: 2px solid green;
  padding: 40px 0;
  text-align: center;
}

.section-title {
  font-size: 2em;
  margin-bottom: 20px;
}

.project-cards {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.content-card {
  width: 300px;
  padding: 20px;
  border: 2px solid green;
  margin: 20px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}
.content-card:hover {
  background-color: #f5f5f5;
  border: 2px solid #ccc;
  cursor: pointer;
  transition: all 0.3s ease;
}

.title {
  font-size: 1.5em;
  margin-top: 0;
}

.description {
  margin-top: 10px;
}
.contact-section {
  border-bottom: 2px solid green;
  padding: 40px 0;
  text-align: center;
}
</style>
