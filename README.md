# PortfolioFront
## プロジェクトの概要
- ポートフォリオサイトの画面を扱う
- レスポンシブに対応しているので、スマホからでもご確認いただけます。
- [https://dev-okayama.blog/](https://dev-okayama.blog/)で運用中
- [ポートフォリオサイトの作成に関してまとめた記事(AWSやNginxなどについても記載)](https://dev-okayama.blog/project-blog/65213930424edd317304aca6)
- [バックエンドのGitHubURL](https://github.com/koinunopochi/PortfolioServer)
<img width="960" alt="image" src="https://github.com/koinunopochi/PortfolioFront/assets/124518985/22cad4ff-1952-41fd-bcaf-d78187d0b5cd">


## 使用技術
- Vue.js 3.34
- chart.js 4.40
- vuetify 3.3.17
## 機能
1. 認証機能
   - バックエンドサーバーにアクセスし、登録済みのユーザーであるかを確認する。
   1. 未ログインユーザー/ログインユーザー（admin/user）として3種類に分ける。
   2. 未ログインユーザーには、homeとAboutMeの画面・admin用画面の表示制限を行う。
   3. ログインユーザー（user）には、homeとAboutMeの画面の表示制限を解除する。ただし、admin用の画面に関しては閲覧禁止。
   4. ログインユーザー（admin）の場合は、すべての制限を取っ払い、ユーザーの作成や削除などが可能である。※１
2. ブログやプロジェクト、インフォメーションの閲覧機能
   - DBからMarkdown形式で記述されたテキストを取得し、フロントサイドでHTMLに変換したモノを記事として表示している。


<img width="960" alt="image" src="https://github.com/koinunopochi/PortfolioFront/assets/124518985/309e5880-baf4-4a98-bb32-dee54a8c5bc4">

   
4. ブログなどの記事の作成・編集機能
   - 記事を画面上で作成することが可能である。
   - 特に、すぐ横で表示される例を見ながら編集を行えるように工夫した。

<img width="960" alt="image" src="https://github.com/koinunopochi/PortfolioFront/assets/124518985/1d7e186d-59dd-4bf7-9dce-3f42ea2bb525">


5. ブログなどの記事の削除機能
   - 誤って作成した記事などを削除できるようにした。
6. アカウントの作成・削除機能
   - アカウントの作成をadminユーザーのみとした。
   - アカウントの削除は、ユーザー名と権限を表形式で確認できるようにすることで、視覚的に安全性を高めた。
   - また、削除時に削除するユーザー名を入力し、等しい場合にのみ削除するように変更した。


<img width="787" alt="スクリーンショット 2023-11-05 185353" src="https://github.com/koinunopochi/PortfolioFront/assets/124518985/d224c3c3-589b-4081-91ba-9de38d7b780f">


7. アクセスログの確認
   - どのAPIに、どのIPからどの程度の頻度で、アクセスがあるのかを折れ線グラフで確認できるようにした


<img width="960" alt="image" src="https://github.com/koinunopochi/PortfolioFront/assets/124518985/d9fa5254-4d11-490a-8884-e8f7e6928731">


8. 問い合わせ機能
   - 問合せフォームに入力して送信することで、私と問合せした者に対してメールを送信する機能

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build:prod
```


<img width="960" alt="image" src="https://github.com/koinunopochi/PortfolioFront/assets/124518985/a0f014ff-2aa2-46dd-a2de-a1882813eb55">



※１　WEBサイト上では認証機能を作成したが、真に重要な情報はないためコードでそれぞれ確認が可能である。
