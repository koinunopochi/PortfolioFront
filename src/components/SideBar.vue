<template>
  <div class="side-bar">
    <div class="content">
      <h3>Contact</h3>
      <div class="links">
        <a
          href="https://github.com/koinunopochi"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://twitter.com/a1a2a3b1b2b3b4"
          target="_blank"
          rel="noopener noreferrer"
        >
          X(旧Twitter)
        </a>
        <a
          href="https://qiita.com/koinunopochi"
          target="_blank"
          rel="noopener noreferrer"
        >
          Qiita
        </a>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.side-bar {
  /* マージンの設定 */
  margin: 20px;
  /* 横幅 */
  width: 20%;
  /* 最小サイズ */
  min-width: 80px;
  /* 高さ */
  height: 100vh;
  padding: 0 20px;
}
.links {
  padding-left: 10px;
  /* 右寄りに配置 */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.links a {
  color: #28a745;
  text-decoration: none; /* アンダーラインを削除 */
  transition: color 0.3s ease-in-out; /* 色が滑らかに変わるように設定 */
}

.links a:hover {
  color: #218838;
  text-decoration: underline;
}
</style>
