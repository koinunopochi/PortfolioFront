<template>
  <div class="table-of-contents">
    <ul>
      <li v-for="item in items" :key="item.id">
        <a :href="`#${item.id}`">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// itemsは親コンポーネントから受け取る
const { items } = defineProps(['items']);
</script>

<style scoped>
.table-of-contents {
  margin-top: 20px;
  margin-right: 40px;
  min-width: 200px;
  border-radius: 8px;
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);  */
  background-color: #fff; /* 白背景 */
  /* border: solid 1px #e2e2e2;  */
  transition: box-shadow 0.3s; /* ホバーエフェクトの追加 */
  position: sticky; /* <- これを追加 */
  top: 70px; /* <- 上からの距離を指定。この場合、70px */
  max-height: 50vh; /* 画面の高さの50%に最大高さを制限 */
  overflow-y: auto; /* オーバーフロー時に縦スクロールバーを表示 */
}

.table-of-contents:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1); /* ホバー時の影を変更 */
}

.table-of-contents ul {
  padding: 20px;
  margin: 0;
  list-style: none;
}

.table-of-contents li {
  margin-bottom: 8px;
}

.table-of-contents a {
  color: #333; /* より濃い色 */
  text-decoration: none;
  font-weight: 500; /* 太字に */
  transition: color 0.3s, text-decoration 0.3s;
  position: relative; /* 下線エフェクトのための基準 */
  padding: 5px 0; /* 空間の追加 */
}

.table-of-contents a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #84c357; /* 緑色 */
  transition: width 0.3s;
}

.table-of-contents a:hover {
  color: #84c357; /* ホバー時のリンク色を緑に */
}

.table-of-contents a:hover::after {
  width: 100%; /* 下線エフェクト */
}

.table-of-contents li:hover {
  background-color: transparent; /* 背景色のホバーを削除 */
}
</style>
