<!-- NavBar.vue -->
<template>
  <div class="nav-bar">
    <div @click="toggleSidebar" class="hamburger">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
    <div v-if="isSidebarOpen" class="sidebar">
      <ul>
        <li @click="navigate('/home')">Home</li>
        <li @click="navigate('/about')">About</li>
        <li @click="navigate('/contact')">Contact</li>
        <!-- 他のリスト項目を追加 -->
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const navigate = (path: string) => {
  router.push(path);
  isSidebarOpen.value = false; // ナビゲーション後にサイドバーを閉じる
};
</script>

<style scoped>
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #333;
  color: #fff;
  z-index: 1000;
}

.hamburger {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.line {
  width: 30px;
  height: 5px;
  background-color: #fff;
  margin: 4px 0;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background-color: #eee;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  overflow-y: auto;
}

.sidebar ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.sidebar li {
  padding: 10px;
  cursor: pointer;
}

.sidebar li:hover {
  background-color: #ddd;
}
</style>

