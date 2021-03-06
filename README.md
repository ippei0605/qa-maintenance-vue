# Q&A Maintenance クライアントアプリ

## はじめに
Q&A Maintenance のクライアントアプリを Vue.js 2.0 で開発します。
勉強しながら開発しました。

## とりあえず、やってみる
```
$ sudo npm install -g vue-cli
```

```
$ vue init webpack qa-maintenance-vue

? Project name qa-maintenance-vue
? Project description A Vue.js project
? Author ippei <ippei0605@gmail.com>
? Vue build standalone
? Install vue-router? Yes
? Use ESLint to lint your code? Yes
? Pick an ESLint preset Standard
? Setup unit tests with Karma + Mocha? Yes
? Setup e2e tests with Nightwatch? Yes
```
全てデフォルトで初期化しました。

```
$ cd qa-maintenance-vue

```

```
$ npm install
```

```
$ npm run dev
```

とりあえず、動かしてみる。Hello を確認しました。


```
$  npm run build

```

ビルドしてみる。dist ディレクトリーに結合・最小化したファイルが作成されることを確認しました。
では、改造していこうと思います。

## 外部モジュール
デフォルトで様々なモジュールが定義されてますが、不足は次の一つだけです。 Webpack でビルドするので、devDependencies に定義します。
```
$ npm install --save-dev watson-speech
```
* https://github.com/ippei0605/qa-maintenance/blob/master/package.json#L80

## プログラミング
* index.html  CDNにホストされた Bootstrap3 を使用
  - https://github.com/ippei0605/qa-maintenance-vue/blob/master/index.html#L5-L17
* .eslintrc.js  jQuery が前提となるので、$ を参照できるように設定 (Vue 推奨の Axios は使用せず)
  - https://github.com/ippei0605/qa-maintenance-vue/blob/master/.eslintrc.js#L27-L30
* src
  - context.js  開発と本番の切替え定義、、、コメントアウトが必要のため悩み中
      - https://github.com/ippei0605/qa-maintenance-vue/blob/master/src/context.js
  - App.vue   スタイルを定義
      - https://github.com/ippei0605/qa-maintenance-vue/blob/master/src/App.vue
* src/assets
  - watson_black_animate.gif  gif アニメを配置
* src/router
  - index.js  vue-router の設定
      - https://github.com/ippei0605/qa-maintenance-vue/blob/master/src/router/index.js
* src/components
  - *.vue     様々な Vue コンポーネントを開発
  - Auth.js   認証機能、現在はブラウザの Session Storage にトークンがあるかないかで判定している。要検討。
    - https://github.com/ippei0605/qa-maintenance-vue/blob/master/src/components/Auth.js#L6-L9
      
## 参考
* Vue.js を vue-cli を使ってシンプルにはじめてみる
  - http://qiita.com/567000/items/dde495d6a8ad1c25fa43

## おわりに (感想)
* 認証方式は現在の方法では、ブライザのツールで操作できてしまうので再考する必要があります。
* 今回は Bootstrap3 を使用しましたが、Web デザインをどうするか、ホストされてものを使うか腹持ちされるかは検討が必要です。
* 非同期通信は ajax を使用しましたが、こちらも axios などのするか検討が必要です。

以降、vue-cli が自動生成したテキストを残します。

---


> Q&A Maintenance Vue.js

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
