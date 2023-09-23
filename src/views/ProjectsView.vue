<template>
  <div class="all-contents">
        <!-- サイドバー -->
    <SideBar />
    <div class="main projects">
      <h1 class="title" id="projects">PROJECTS</h1>
      <div class="contents">
        <h2>プロジェクト</h2>
        <p>現在、プロジェクトはありません。</p>
      </div>
    </div>
    <TableOfContents :items="tableOfContentsItems"/>
  </div>
</template>
<script setup lang="ts">
import SideBar from '../components/SideBar.vue';
import TableOfContents from '../components/TableOfContents.vue';

const tableOfContentsItems = [
  {
    id: 'projects',
    name: 'プロジェクト',
  },
];
</script>
<style scoped>
@import '../assets/main.css';
</style>