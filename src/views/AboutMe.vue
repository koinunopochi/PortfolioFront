<template>
  <div class="about">
    <div class="title">
      <h1>岡山　晃大</h1>
      <p>ポートフォリオサイト</p>
    </div>

    <h2>経歴</h2>
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
