# Nowでデプロイしよう

**ZEIT Now**は、静的サイトおよびサーバーレス機能向けのクラウドプラットフォームです。Next.jsもZEITによって開発されています。

公式サイト：https://zeit.co/

今回作ったWebサイトをNowでデプロイしてみましょう。

## デプロイ方法

グローバルにNowをインストールして、初期設定を済ませます。

```console
$ npm i -g now
$ now login
```

**package.json**の**scripts**を以下のようにします。

```json
{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
}
```

あとは、`now`コマンドでデプロイできます。

```console
$ now
```

URLが自動で発行されます。おしまい。

さきほど登録したメールアドレスで[管理画面](https://zeit.co/login)にログインすると、ドメインの設定やGitHub連携とかできます。
