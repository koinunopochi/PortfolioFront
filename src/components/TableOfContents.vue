<template>
  <div class="table-of-contents">
    <ul>
      <li><a href="#profile">プロフィール</a></li>
      <li><a href="#career">経歴</a></li>
    </ul>
  </div>
</template>
<style scoped>
.table-of-contents {
  /* マージンの設定 */
  margin: 20px;
  /* 最小サイズ */
  min-width: 200px;
  /* 背景色の設定 */
  /* background-color: #f9f9f9; */
  /* パディングの設定 */
  /* padding: 10px; */
  /* 枠線と丸みの設定 */
  /* border: 1px solid #ddd;
  border-radius: 8px; */
}

.table-of-contents h2 {
  /* ヘッダのテキスト色 */
  color: #333; /* もしくはお好みの色 */
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
  color: #0066cc; /* もしくはお好みの色 */
  /* テキストの装飾をなしに */
  text-decoration: none;
  /* ホバーエフェクトの追加 */
  transition: color 0.3s, text-decoration 0.3s;
}

.table-of-contents a:hover {
  /* ホバー時のテキスト色 */
  color: #004499; /* もしくはお好みの色 */
  /* ホバー時のテキスト装飾 */
  text-decoration: underline;
}
</style>

