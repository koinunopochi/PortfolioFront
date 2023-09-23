<template>
  <div class="nav-bar">
    <v-app>
      <v-navigation-drawer v-model="drawer" app>
        <!-- ドロワー内のコンテンツ -->
        <v-list>
          <v-list-item-group>
            <v-list-item
              v-for="item in items"
              :key="item.title"
              @click="navigate(item.link)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Portfolio</v-toolbar-title>
      </v-app-bar>

      <v-main>
        <!-- メインコンテンツ -->
      </v-main>
    </v-app>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const drawer = ref(false);
const items = [
  { title: 'Home', link: '/' },
  { title: 'About Me', link: '/about-me' },
];
const router = useRouter();

const navigate = (link: string) => {
  drawer.value = false;
  router.push(link);
};
</script>

<style scoped>
.nav-bar {
  height: 50px;
  background-color: #fff;
  padding-right: 20px;
  margin-bottom: 20px;
}
</style>
