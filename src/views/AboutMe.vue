<template>
  <!-- flex-content -->
  <div class="all-contents">
    <!-- サイドバー -->
    <SideBar />
    <div class="main">
      <h1 class="title">ABOUT ME</h1>

      <!-- プロフィール -->
      <div id="profile">
        <h2>プロフィール</h2>
        <div class="contents">
          <p class="name">岡山 晃大</p>
          <ul>
            <li>
              <p class="birth-date">2002年12月05日生まれ</p>
            </li>
            <li>
              <p class="age">20歳</p>
            </li>
            <li>
              <p class="school">明治学院大学　社会学部　社会福祉学科　3年</p>
            </li>
          </ul>
        </div>
      </div>

      <!-- 経歴 -->
      <div>
        <h2 id="career">経歴</h2>
        <table class="career-table contents">
          <thead>
            <tr>
              <th>年月</th>
              <th>年齢</th>
              <th>経歴</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2018年04月</td>
              <td>16歳</td>
              <td>駒澤大学高等学校　入学</td>
            </tr>
            <tr>
              <td>2021年03月</td>
              <td>18歳</td>
              <td>駒澤大学高等学校　卒業</td>
            </tr>
            <tr>
              <td>2021年04月</td>
              <td>18歳</td>
              <td>明治学院大学　社会学部　社会福祉学科　入学</td>
            </tr>
            <tr>
              <td>2025年03月</td>
              <td>22歳</td>
              <td>明治学院大学　社会学部　社会福祉学科　卒業見込み</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 目次 -->
    <TableOfContents :items="tableOfContentsItems" />
  </div>
</template>

<script setup lang="ts">
import SideBar from '../components/SideBar.vue';
import TableOfContents from '../components/TableOfContents.vue';
import InternView from '../components/InternView.vue';

const tableOfContentsItems = [
  {
    id: 'profile',
    name: 'プロフィール',
  },
  {
    id: 'career',
    name: '経歴',
  },
];
</script>
<style scoped>
@import '../assets/main.css';
</style>

<style scoped>
.contents ul {
  margin-left: 20px;
}
.name {
  font-size: 20px;
  font-weight: bold;
}
.contents-flex {
  display: flex;
  /* 中央に配置 */
  justify-content: center;
}
.contents-flex .child {
  margin-right: 30px;
}
/* ベーススタイル */
.career-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Arial', sans-serif;
  color: #333;
}

/* テーブルヘッダ */
.career-table thead th {
  background-color: #4caf50;
  color: white;
  text-align: left;
  padding: 10px;
}

/* セルのスタイリング */
.career-table td,
.career-table th {
  border: 1px solid #ddd;
  padding: 8px;
}

/* セルに対するホバーエフェクト */
.career-table tr:hover {
  background-color: #f1f1f1;
}

/* 奇数行の背景色 */
.career-table tr:nth-child(odd) {
  background-color: #f9f9f9;
}

/* セルのテキストアラインメント */
.career-table td {
  text-align: left;
}
</style>
<style scoped>
@media (max-width: 768px) {
  .all-contents {
    /* 配置を中央に */
    display: flex;
    justify-content: center;
    .main {
      /* 100％ */
      width: 100%;
      /* 余白を削除 */
      margin: 0;
      padding: 20px 3%;
    }
  }
}
</style>