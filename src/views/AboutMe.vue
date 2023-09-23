<template>
  <div class="about">
    <div class="title">
      <h1>岡山　晃大</h1>
      <p>ポートフォリオサイト</p>
    </div>

    <!-- 目次 -->
    <div class="contents">
      <h2>目次</h2>
      <ul>
        <li><a href="#profile">プロフィール</a></li>
        <li><a href="#career">経歴</a></li>
      </ul>
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
      <h2  id="career">経歴</h2>
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
</template>

<style>
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ベーススタイル */
.career-table {
  width: 60%;
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
