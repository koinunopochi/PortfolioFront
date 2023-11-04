<!-- NavBar.vue -->
<template>
  <div @click="checkCloseSidebar" class="nav-bar">
    <div @click.stop="toggleSidebar" class="hamburger">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
    <div class="btn danger" v-if="is_login" @click="logout()">LOGOUT</div>
    <div class="btn info" v-if="!is_login" @click="navigate('/login')">
      LOGIN
    </div>
    <div :class="{ 'sidebar-open': isSidebarOpen }" class="sidebar">
      <ul>
        <li
          v-for="route in route_list"
          :key="route.path"
          @click="navigate(route.path)"
        >
          {{ route.name }}
        </li>
      </ul>
      <hr v-if="is_admin" />
      <ul v-if="is_admin">
        <li
          v-for="admin_route in admin_list"
          :key="admin_route.path"
          @click="navigate(admin_route.path)"
        >
          {{ admin_route.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { isAdmin } from '../utils/checkAdmin';
import { logout, isLogin } from '../utils/auth';
const route_list = [
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
  },
  {
    path: '/contact',
    name: 'Contact',
  },
];
const admin_list = [
  { path: '/project-blog/post', name: '新規作成・更新' },
  { path: '/create/account', name: 'アカウント作成' },
  { path: '/delete/account', name: 'アカウント削除' },
  { path: '/access', name: 'アクセスログ' },
];
const router = useRouter();
const isSidebarOpen = ref(false);
const is_admin = ref(false);
const is_login = ref(false);

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

onMounted(async () => {
  document.addEventListener('click', checkCloseSidebar);
  is_admin.value = await isAdmin();
  is_login.value = await isLogin();
});

onUnmounted(() => {
  document.removeEventListener('click', checkCloseSidebar);
});
</script>

<style scoped>
.btn {
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}
.danger {
  color: #ffffff;
  background-color: #ff0000;
  border: 1px solid #ff0000;
}
.danger:hover {
  background-color: #ff7c02;
  color: #ffffff;
}
.info {
  color: #ffffff;
  background-color: #006eff;
  border: 1px solid #006eff;
}
.info:hover {
  background-color: #c800ff;
  color: #ffffff;
}
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px; /* 高さを少し増やす */
  background-color: #333;
  color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 影を追加 */
  z-index: 1000;
  display: flex;
  align-items: center; /* 中央揃え */
  justify-content: space-between;
  padding: 0% 20px; /* 上下左右のパディングを追加 */
}

.hamburger {
  margin-left: 15px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 20px;
}

.line {
  width: 30px;
  height: 3px; /* 厚さを減少 */
  background-color: #fff;
  border-radius: 1.5px; /* 丸みを追加 */
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background: linear-gradient(135deg, #333, #555); /* グラデーション追加 */
  padding: 40px 20px; /* パディングを変更 */
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
}

.sidebar ul {
  padding: 0;
  margin: 0 0 20px 0; /* マージン追加 */
  list-style-type: none;
}

.sidebar li {
  padding: 12px 10px; /* パディングを変更 */
  cursor: pointer;
  border-radius: 5px; /* 丸みを追加 */
  transition: background-color 0.3s; /* トランジション追加 */
}

.sidebar li:hover {
  background-color: #2a2a2a; /* よりダークな色に */
  color: #84c357; /* ホバー時のテキストカラーを緑に */
}
.nav-bar .sidebar-open {
  transform: translateX(0);
}
</style>
../utils/auth
