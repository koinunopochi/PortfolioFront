<template>
  <div class="all-contents">
        <!-- サイドバー -->
    <SideBar />
    <div class="projects">
      <h1 class="title">PROJECTS</h1>
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
    id: 'profile',
    name: 'プロフィール',
  },
];
</script>