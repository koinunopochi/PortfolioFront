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
  /* マージンの設定 */
  margin: 20px;
  /* 最小サイズ */
  min-width: 200px;
}

.table-of-contents ul {
  /* リストのマージンとパディングをリセット */
  margin: 0;
  padding: 0;
  /* リストのスタイルタイプをなしに */
  list-style: none;
}

.table-of-contents li {
  /* リスト項目のマージン設定 */
  margin-bottom: 5px;
}

.table-of-contents a {
  /* リンクテキストの色 */
  color: #545555;
  /* テキストの装飾をなしに */
  text-decoration: none;
  /* ホバーエフェクトの追加 */
  transition: color 0.3s, text-decoration 0.3s;
}
.table-of-contents a:hover {
  text-decoration: underline;
}
.table-of-contents li:hover {
  background-color: #d3d3d3;
}
</style>
