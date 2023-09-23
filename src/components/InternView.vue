<template>
  <div class="intern" id="intern">
    <h2>インターン</h2>
    <div class="content">
      <div class="">
        <div class="intern child">
          <h3>株式会社コムスクエア</h3>
          <h4>概略</h4>
          <p>2023年3月より入社、2023年9月23日現在も在籍中</p>
          <p>基本的に週2回　フルタイム</p>

          <div class="contents">
            <h5>3～4月</h5>
            <p class="intern-title">概要</p>
            <li>
              OpenAIのAPIを利用し、社内利用が容易にできるようにAPIをNode.js +
              Expressで作成
            </li>
            <p class="intern-title">背景</p>
            <li>
              ちょうど入社したころにChatGPTが流行り始めたこともあり、社内でChatGPTの検証環境が必要となったため。
            </li>
            <p class="intern-title">実際の業務</p>
            <li>
              APIとは何か、どのようにして外部のAPIサービスと連携するのか、CORSエラーとは何かということを1つ1つぶつかりながら作成した。
            </li>
            <p class="intern-title">反省点</p>
            <li>
              基本的には自走で開発を行ったが、APIについての理解が当時は浅く、テンプレートをレスポンスで返すということを行ってしまっていたため、上長から参考サイトを教えていただき、再度APIについての理解を深め直した。
            </li>
          </div>
          <div class="contents">
            <h5>5月</h5>
            <p class="intern-title">概要</p>
            <li>
              OpenAIのAPIとLlmaIndex、LangChainを利用し、Pythonで社内の商品サポートが利用するChatBotを作成。
            </li>
            <p class="intern-title">背景</p>
            <li>
              個人的に、Node.jsやExpressの公式ドキュメントを学習させたAIによるチャットボットを作成していたことを、上長に話したところ、社内の商品サポートが利用するChatBotを作成してほしいという依頼を受けた。
            </li>
            <p class="intern-title">実際の業務</p>
            <li>
              Pythonを利用して、LangChainを利用してOpenAIのAPIをたたき、LlmaIndexを利用して社内のドキュメントやナレッジをベクトル検索ができるように変更。
            </li>
            <li>
              ベクトルデータを検索し、検索にもっとも合致したテキストと合わせて、ChatGPTに質問を行う。
            </li>
            <li>
              レスポンスをフロントにJson形式で送信する機能を持ったAPIの作成。
            </li>
            <p class="intern-title">工夫した点</p>
            <li>
              検索用のテキストを作成する際に、URLから要素をとってきて、タグなどを削除するように変更し、事前準備を容易にできるようにした。
            </li>
            <p class="intern-title">反省点</p>
            <li>粒度の細かいエラー処理やログ出しを行っていない。</li>
            <li>単純にChatBotの精度が悪くなってしまった。</li>
          </div>
          <div class="contents">
            <h5>6月</h5>
            <p class="intern-title">概要</p>
            <li>ほかのインターン生の方のサポートに入る</li>
            <p class="intern-title">背景</p>
            <li>
              メインのタスクがひと段落したため、新しいタスクまでのつなぎとしてサポートに入ることとなった。
            </li>
            <p class="intern-title">実際の業務</p>
            <li>主に2名のインターン生の方の業務を手伝った。</li>
            <li>
              内容としては、Vue.jsで画面を作成している方と、Node.js +
              ExpressでAPIを作成している方であった
            </li>
            <li>
              Vue.jsもExpressに関しても、技術・知識量は同じ程度であったため、詰まってしまった部分を2人で調べるや調べずとも分かる部分に関して回答を行った。
            </li>
            <p class="intern-title">工夫した点</p>
            <li>
              自分でも業務時間外などに、Vue.jsやExpressを触り、詰まりそうな部分であったり、難しい部分に関してどのように対処していくかを学んだ。
            </li>
            <p class="intern-title">反省点</p>
            <li>
              Vue.jsやExpressに関しては、自分の知識量が足りていないため、回答に時間がかかってしまった。
            </li>
          </div>
          <div class="contents">
            <h5>7～8月</h5>
            <li>
              テスト、新型コロナウイルス、他インターンの影響でほとんど入ることができていなかった。
            </li>
          </div>
          <div class="contents">
            <h5>9月</h5>
            <p class="intern-title">概要</p>
            <li>新たに入社する方が利用する業務用のWEBアプリの作成</li>
            <p class="intern-title">背景</p>
            <li>
              新たに入社する方が利用する業務用のWEBアプリの作成を依頼された。
            </li>
            <p class="intern-title">実際の業務</p>
            <li>Vue.jsで画面を作成し、Node.js + ExpressでAPIを作成した。</li>
            <li>
              これまで使用してきた技術の集大成となり、Vue.jsでの画面作成やExpressとJWTトークン、cookieを利用して認証機能付きのAPIを作成した。
            </li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contents{
  /* 線を入れる */
  border: solid 3px #a7ff9d;
  /* 余白を入れる */
  padding: 10px;
  /* 角を丸くする */
  border-radius: 8px;

}
.intern h2 {
  font-size: 24px; /* フォントサイズ */
  margin-bottom: 20px; /* 下側の余白 */
  color: #333; /* 文字色 */
}



.intern.child {
  background-color: #fafafa; /* 子要素の背景色 */
  padding: 15px; /* 子要素の内側の余白 */
  border-radius: 8px; /* 子要素の角を丸くする */
  margin-bottom: 15px; /* 子要素の下側の余白 */
}

.intern h3,
.intern h4,
.intern h5 {
  color: #444; /* タイトルの文字色 */
}

.intern h5 {
  font-size: 17px;
}

.intern p,
.intern li {
  font-size: 16px; /* テキストのフォントサイズ */
  line-height: 1.6; /* 行間 */
  color: #666; /* テキストの文字色 */
}

.intern-title {
  font-weight: bold; /* タイトルのフォントを太くする */
  margin-top: 10px; /* タイトルの上側の余白 */
}

li {
  margin-bottom: 10px; /* リストアイテムの下側の余白 */
}
</style>
