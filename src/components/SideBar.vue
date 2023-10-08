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
  margin-top: 20px;
  margin-left: 15px;
  margin-right: 10px;
  min-width: 150px;
  border-radius: 8px;
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); */
  background-color: #fff;
  /* border: solid 1px #e2e2e2; */
  transition: box-shadow 0.3s;
  position: sticky;
  top: 70px;
  max-height: 50vh;
  overflow-y: auto;
  /* height: 100vh; */
  padding: 20px;
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
@media (max-width: 768px) {
  .side-bar {
    display: none;
  }
}
</style>
