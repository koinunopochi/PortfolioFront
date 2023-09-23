<template>
  <div class="all-contents">
    <!-- サイドバー -->
    <SideBar />
    <div class="main projects">
      <h1 class="title" id="projects">PROJECTS</h1>
      <div class="">
        <h2>プロジェクト</h2>
        <div
          class="contents"
          id="portfolio"
          @click="move('/projects/portfolio')"
        >
          <h3>Portfolio</h3>
          <h4>概要</h4>
          <p>このサイト</p>
        </div>
        <div class="contents" id="auto_pic" @click="move('/projects/auto-pic')">
          <h3>AutoPic</h3>
          <h4>概要</h4>
          <p>自動で画像を撮影するプログラム</p>
        </div>
        <div
          class="contents"
          id="youtube_text"
          @click="move('/projects/youtube-text')"
        >
          <h3>YoutubeText</h3>
          <h4>概要</h4>
          <p>Youtubeの字幕から、ChatGPTにYoutubeに関する質問を行うプログラム</p>
        </div>
        <div
          class="contents"
          id="node_summary"
          @click="move('/projects/node-summary')"
        >
          <h3>NodeDocSummary_GPT</h3>
          <h4>概要</h4>
          <p>Node.jsのドキュメントを要約したりして、質問に答えるプログラム</p>
        </div>
      </div>
    </div>
    <TableOfContents :items="tableOfContentsItems" />
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import SideBar from '../components/SideBar.vue';
import TableOfContents from '../components/TableOfContents.vue';

const router = useRouter();

const tableOfContentsItems = [
  {
    id: 'projects',
    name: 'プロジェクト',
  },
  {
    id: 'auto_pic',
    name: 'AutoPic',
  },
  {
    id: 'youtube_text',
    name: 'YoutubeText',
  },
  {
    id: 'node_summary',
    name: 'NodeDocSummary_GPT',
  },
];

const move = (path: string) => {
  router.push(path); // pushメソッドでルートを変更
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
