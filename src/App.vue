

<template>
  <div class="nav-bar">
    <v-app>
      <v-main class="main">
        <NavBar v-if="showNavBar" />
        <RouterView />
      </v-main>
    </v-app>
  </div>
</template>


<script setup lang="ts">
import { RouterView } from 'vue-router';
import { computed } from 'vue';
// import { ref } from 'vue';
import { useRoute } from 'vue-router';

import NavBar from './components/NavBar.vue';

const route = useRoute();

const showNavBar = computed(() => {
  if(route.name === 'login'|| route.name === 'not-found'){
    return false;
  }else{
    return true;
  }
});
</script>

<style scoped>
/* .nav-bar {
  height: 50px;
  background-color: #fff;
  margin-bottom: 20px;
} */
.main{
    /* 背景色 */
  background-color: #f5f6f6;
}
</style>
