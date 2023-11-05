# PortfolioFront
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
## プロジェクトの概要
- ポートフォリオサイトの画面を扱う
### 機能
1. 認証機能
   - 未ログインユーザー/ログインユーザー（admin/user）として3種類に分ける。
   - 未ログインユーザーには、homeとAboutMeの画面・admin用画面の表示制限を行う。
   - ログインユーザー（user）には、homeとAboutMeの画面の表示制限を解除する。ただし、admin用の画面に関しては閲覧禁止。
   - ログインユーザー（admin）の場合は、すべての制限を取っ払い、ユーザーの作成や削除などが可能である。
