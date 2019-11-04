# Nowでデプロイしよう

**ZEIT Now**は、静的サイトおよびサーバーレス機能向けのクラウドプラットフォームです。Next.jsもZEITによって開発されています。

https://zeit.co/

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

。。。ですが、`sub-domain.now.sh`みたいに`sub-domain`の部分を設定する方法を伝授します。

`now.json`ファイルを作成し、以下の設定を記述します。

```console
$ touch now.json
```

```json
{
  "name": "project-name",
  "version": 2
}
```

`name`の部分がサブドメインになります。

その他の細かな設定は以下を参照してください。

https://zeit.co/docs/now-cli/
