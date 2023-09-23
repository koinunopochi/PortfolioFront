<template>
  <div class="about-me">
    <!-- ナビゲーションバー -->
    <NavBar />
  </div>
  <!-- flex-content -->
  <div class="all-contents">
    <!-- サイドバー -->
    <SideBar />
    <div class="about">
      <h1>ABOUT ME</h1>

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
      <div class="">
        <h2>利用可能技術</h2>
        <div class="contents"></div>
      </div>
    </div>
    <!-- 目次 -->
    <TableOfContents />
  </div>
</template>

<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
import SideBar from '../components/SideBar.vue';
import TableOfContents from '../components/TableOfContents.vue';
</script>

<style>
h1 {
  /* 中心に配置 */
  text-align: center;
}
h1,
h2 {
  font-weight: bold;
  margin-bottom: 10px;
  /* 区切り線 */
  border-bottom: solid 1px #ddd;
}
.all-contents {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  /* 背景色 */
  background-color: #f5f6f6;
}
.about {
  /* マージンの設定 */
  margin-top: 20px;
  /* パディング */
  padding: 20px 40px;
  /* 背景を白にする */
  background-color: #fff;
  /* 角を丸める */
  border-radius: 8px;
}
.contents {
  margin-bottom: 10px;
}
.contents ul {
  margin-left: 20px;
}
.name {
  font-size: 20px;
  font-weight: bold;
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
