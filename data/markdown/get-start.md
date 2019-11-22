# Reactをはじめよう

Reactとは、Facebookが作ったJavaScriptライブラリです。ユーザーインターフェイスをコンポーネントベースで作ることができます。

公式サイト：https://ja.reactjs.org/

## シンプルなReactのサンプル

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>

  <body>
    <div id="root"></div>

    <!-- babelがJSXをReact.createElement()に変換してくれる -->
    <script type="text/babel">
      /**
       * 引数：propsを、JSX：<div>{props.text}</div>で受け取り、returnで返す。
       * この一式をコンポーネントと呼ぶ。
       */
      function Hello(props) {
        return <div>{props.text}</div>
      };

      /**
       * Helloコンポーネントを<div id="root"></div>にマウントしている。
       * 関数みたいにしてみると、`Hello({ text: 'Hello, React!' });` こんな感じ。
       */
      ReactDOM.render(
        <Hello text="Hello, React!" />,
        document.getElementById("root")
      );
    </script>
  </body>
</html>
```

## Reactの特徴

Vue.jsがディレクティブを使いHTMLを拡張するような方法で開発するのに対し、**ReactはガシガシJavaScriptを書いていきます。**まあ、Vue.jsもガッツリ開発を始めるとガシガシJavaScriptを書くことになると思いますが（・ω・）

また、Reactは基本的に**データを受け取って適切なViewを返すこと**を目的としたシンプルなライブラリなので、Angularのようなルールはなく、**自由度がかなり高い**です。逆に言うと、しっかりとした設計ができてないと、開発途中でつらくなります（・ω・）

## 宣言的UI

Reactに限らず、近年のUIフレームワーク・ライブラリ、およびプログラミングにおいて主要なパラダイムである**宣言的UI**について、知っておく必要があります。

そのまえに、まず、**命令的と宣言的**の説明します。

### 命令的
- 何をするかを記述する
- 前回の実行結果に依存する
  - 変数の再代入が行われる

### 宣言的
- どういう状態になるのかを記述する
- 前回の実行結果に依存しない
  - 変数に再代入しない

### 命令的UIと宣言的UI

#### 命令的UI

命令的UIの例として、jQueryによるDOM操作があげられます。

```html
<!-- この時点ではUIの最終的な状態はわからない -->
<ul id="list"></ul>
```
```js
const animals = ["ねずみ", "うし", "とら"];

// 配列の要素分処理を繰り返し、HTML側に挿入することでUIが決定する。
animals.forEach(animal => {
  $('#list').append(`<li>${animal}</li>`);
});
```

#### 宣言的UI

一方で、**Vue.js**は宣言的にUIを作ることができます。

```html
<template>
  <ul>
    <!-- この時点でUIの状態が決まっている -->
    <li v-for="(item, index) in list" :key="index">{{item}}</li>
  </ul>
</template>

<script>
  export default {
    data() {
      return {
        // 配列の要素によってリストの数が決定する
        list: ["ねずみ", "うし", "とら"]
      };
    }
  };
</script>
```

Reactもね❤(ӦｖӦ｡)

ReactやVue.jsは、jQueryの次に流行っているフレームワーク・ライブラリではなく、**宣言的なUIを作るためのフレームワーク・ライブラリ**です。

技術選定時に宣言的なUIが必要であれば、ReactやVue.jsを使用しましょう。逆に言えば、jQueryのほうが適切な場面であれば、無理に使用する必要はありません。

このスライドがとても参考になります。

https://speakerdeck.com/sonatard/xuan-yan-de-ui
