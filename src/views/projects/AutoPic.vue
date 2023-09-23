<template>
  <div class="all-contents">
    <!-- サイドバー -->
    <SideBar />
    <div class="main projects">
      <h1 class="title" id="projects">PROJECTS</h1>
      <div class="contents">
        <div class="content" id="auto_pic">
          <h2>AutoPic</h2>
          <a href="https://github.com/koinunopochi/auto_pic"
            >auto_picのGitHubリンク</a
          >
          <h4>概要</h4>
          <p>自動で画像を撮影するプログラム</p>
          <h4>使用技術</h4>
          <p>Python　3.10.11</p>
          <h4>機能</h4>
          <li>
            指定した枚数分、指定した場所をクリックして、画面を次に送りながらスクリーンショットを作成します
          </li>
          <li>画像の保存先を指定</li>
          <li>画像の範囲を指定</li>
          <li>クリック位置を指定</li>
          <h4>工夫した点</h4>
          <li>
            利用しやすいように、簡単にそれぞれの要素が指定できるようにした。
          </li>
          <li>画像の保存先を指定できるようにした。</li>
          <li>画像の範囲を指定できるようにした。</li>
          <h4>苦労した点</h4>
          <li>
            コマンドにより、強制終了が可能なようにしたが、画面を実際にクリックする関係から画面に展開されているアプリのショートカットとぶつかってしまうことがあること
          </li>
          <li>解決策として、コマンドも利用者が指定できるようにした。</li>
          <li>
            全画面にしたいがほかのアプリが上にある場合は全画面にできないため、最初のみクリックする必要があった。
          </li>
          <li>
            単純に、最初のみクリックする機能を追加で作成したが、ほかの方法がないかの試行錯誤に時間がかかってしまった。
          </li>
          <h4>今後の課題</h4>
          <li>
            取得ボタンを押した後に、しばらく放置、もしくはwindowを動かそうとした場合に、アプリケーション自体が反応しなくなってしまう問題。
          </li>
          <li>
            エラー処理は行っているが、エラーメッセージの表示は行っていないので、利用者が見れる形で表示したい。
          </li>
          <li>デフォルト値をGUI側で変更できるようにしたい</li>
        </div>
      </div>
    </div>
    <TableOfContents :items="tableOfContentsItems" />
  </div>
</template>
<script setup lang="ts">
import SideBar from '../../components/SideBar.vue';
import TableOfContents from '../../components/TableOfContents.vue';

const tableOfContentsItems = [
  {
    id: 'projects',
    name: 'プロジェクト',
  },
  {
    id: 'auto_pic',
    name: 'AutoPic',
  },
];
</script>
<style scoped>
@import '../../assets/main.css';
</style>