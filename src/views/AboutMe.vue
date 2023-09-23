<template>
  <div class="about-me">
    <!-- ナビゲーションバー -->
    <NavBar />
  </div>
  <div class="all-contents">
    <!-- サイドバー -->
    <SideBar />
    <div class="about">
      <div class="title">
        <h1>岡山　晃大</h1>
        <!-- <p>ポートフォリオサイト</p> -->
      </div>

      <!-- プロフィール -->
      <div id="profile">
        <h2>プロフィール</h2>
        <p>岡山　晃大</p>
        <p>2002年12月05日生まれ</p>
        <p>20歳</p>
        <p>明治学院大学　社会学部　社会福祉学科　3年</p>
      </div>

      <!-- 経歴 -->
      <div>
        <h2 id="career">経歴</h2>
        <table class="career-table">
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
  margin: 20px;
  /* パディング */
  padding:20px 40px;
  /* 背景を白にする */
  background-color: #fff;
  /* 角を丸める */
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
