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
              <td>2019年04月</td>
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

      <!-- 利用可能技術 -->
      <div id="skill">
        <h2>利用可能技術</h2>
        <div class="contents">
          <div class="contents-flex">
            <div class="lang child">
              <h3>言語</h3>
              <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>TypeScript</li>
                <li>Java</li>
                <li>Python</li>
                <li>VBA</li>
              </ul>
            </div>
            <div class="flame-work child">
              <h3>フレームワーク</h3>
              <ul>
                <li>Vue.js</li>
                <li>Express.js</li>
                <li>Spring Boot</li>
                <li>BootStrap</li>
              </ul>
            </div>
            <div class="other">
              <h3>その他</h3>
              <ul>
                <li>Git</li>
                <li>GitHub</li>
                <li>VSCode</li>
                <li>IntelliJ IDEA</li>
                <li>Postman</li>
                <li>MySQL</li>
                <li>MongoDB</li>
                <li>Node.js</li>
                <li>Selenium</li>
                <li>Windows</li>
                <li>Linux</li>
                <li>EC2</li>
                <li>Nginx</li>
                <li>Apache</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <InternView />
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
  {
    id: 'skill',
    name: '利用可能技術',
  },
  {
    id: 'intern',
    name: 'インターン',
  },
];
</script>
<style scoped>
@import '../assets/main.css';
</style>

<style scoped>
.contents {
  margin-bottom: 30px;
}
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
