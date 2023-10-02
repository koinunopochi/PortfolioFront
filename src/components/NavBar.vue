<!-- NavBar.vue -->
<template>
  <div @click="checkCloseSidebar" class="nav-bar">
    <div @click.stop="toggleSidebar" class="hamburger">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
    <div :class="{ 'sidebar-open': isSidebarOpen }" class="sidebar">
      <ul>
        <li v-for="route in routeList" :key="route.path" @click="navigate(route.path)">
          {{ route.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const routeList = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/about-me',
    name: 'AboutMe',
  },
  {
    path: '/project-blog',
    name: 'ProjectBlog',
  },]

const router = useRouter();
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const navigate = (path: string) => {
  router.push(path);
  isSidebarOpen.value = false;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};

const checkCloseSidebar = (event: Event) => {
  const sidebarElement = document.querySelector('.sidebar');
  const clickedInsideSidebar = sidebarElement?.contains(event.target as Node);

  if (!clickedInsideSidebar && isSidebarOpen.value) {
    closeSidebar();
  }
};

onMounted(() => {
  document.addEventListener('click', checkCloseSidebar);
});

onUnmounted(() => {
  document.removeEventListener('click', checkCloseSidebar);
});
</script>

<style scoped>
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
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
  background-color: #333;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
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
.nav-bar .sidebar-open {
  transform: translateX(0);
}
</style>
