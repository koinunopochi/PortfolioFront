<template>
  <div class="about">
    <h1>岡山　晃大</h1>
    <p>ポートフォリオサイト</p>

    <h2>経歴</h2>
    <table class="career-table">
      <thead>
        <tr>
          <th>年月</th>
          <th>年齢</th>
          <th>出来事</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2002年12月05日</td>
          <td>0歳</td>
          <td>誕生</td>
        </tr>
        <tr>
          <td>2019年04月</td>
          <td>16歳</td>
          <td>高校入学</td>
        </tr>
        <tr>
          <td>2021年03月</td>
          <td>18歳</td>
          <td>高校卒業</td>
        </tr>
        <tr>
          <td>2021年04月</td>
          <td>18歳</td>
          <td>大学入学</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
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
