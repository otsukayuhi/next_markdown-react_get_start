# Reactをはじめよう

Reactとは、Facebookが作ったユーザーインターフェイスを構築するためのJavaScriptライブラリです。宣言的なViewをコンポーネントベースで作ることができます。

公式サイト：https://ja.reactjs.org/

## 宣言的UI

Reactに限らず、近年のUIフレームワーク・ライブラリ、およびプログラミングにおいて主要なパラダイムである**宣言的UI**・**宣言型プログラミング**と、対義の**命令的UI**・**命令型プログラミング**について知っておく必要があります。

### 命令型プログラミング
- 何をするかを記述する
  - 手続き型とほぼ同義
- 前回の実行結果に依存する
  - 下の例だと変数の再代入が行われる

```js
const animals = ["ねずみ", "うし", "とら"];

// 初期値を指定
let animalAmountTotal = 0;

// 配列の要素分ループ
for (let index = 0; index < animals.length; index++) {
  const animalAmount = animals[index].length;

  // ループ毎に動物の文字数が足されていく
  // 実行ごとに結果が変わることを副作用があるという
  animalAmountTotal = animalAmountTotal + animalAmount;
}

console.log(animalAmountTotal); // -> 7
```

### 宣言型プログラミング
- どういう状態になるのかを記述する
  - 関数型プログラミング
- 前回の実行結果に依存しない
  - 変数に再代入しない

```js
const animals = ["ねずみ", "うし", "とら"];

const reducer = (acc, cur) => acc + cur;
const animalAmountTotal = animals.reduce(reducer, "").length;

console.log(animalAmountTotal); // -> 7
```

### 宣言的UIと命令的UI

jQueryのようなライブラリでは、DOM操作が命令的になります。

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

**React**や**Vue.js**は宣言的にUIを作ることができます。

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

ReactやVue.jsは、jQueryの次に流行っているフレームワーク・ライブラリではなく、**宣言的なUIを作るためのフレームワーク・ライブラリ**です。

宣言的なUIが不要であれば、ReactやVue.jsは不要なのです。

このスライドがとても参考になります。

https://speakerdeck.com/sonatard/xuan-yan-de-ui

## Reactの特徴

Reactは公式サイトにもある通りJavaScriptライブラリなので、Vue.jsのように`.vue`ファイルのようなものはなく、すべて`.js`ファイルです。（[Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react#naming)では、JSXと純粋なJavaScriptを分けるために、`.jsx`拡張子を推奨しています）一見、HTMLのようなJSXも`React.createElement()`のシンタックスシュガーです。

```jsx
// どちらも同じことをしている
const foo1 = <div>foo1</div>;
const foo2 = React.createElement("div", null, "foo2");
```

Vue.jsがディレクティブを使いHTMLを拡張するような方法で開発するのに対し、ReactはガシガシJavaScriptを書いていきます。まあ、Vue.jsもガッツリ開発を始めるとガシガシJavaScriptを書くことになると思いますが（・ω・）

また、Reactは基本的に**データを受け取って適切なViewを返すこと**を目的としたシンプルなライブラリなので、Angularのようなルールはなく、自由度がかなり高いです。逆に言うと、しっかりとした設計ができてないと、開発途中でつらくなります（・ω・）

### シンプルなReactのサンプル

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

