<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  };
</script>

<style>
  body {
    font-family: "Open Sans", "Helvetica Neue", Helvetica, "Arial", "游ゴシック", YuGothic, "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "メイリオ", Meiryo, sans-serif;
    font-size: 16px;
    line-height: 1.42857;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: "Open Sans", "Helvetica Neue", Helvetica, "Arial", "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "メイリオ", Meiryo, sans-serif;
    font-weight: 300;
    line-height: 1.2;
  }

  header {
    background-color: #337ab7;
    color: #FFF;
  }

  header h4 {
    color: #FFF;
  }

  #loading-view {
    width: 100%;
    height: 100%;
    z-index: 9999;
    position: fixed;
    top: 150px;
    left: 0;
    filter: alpha(opacity=85);
    -moz-opacity: 0.85;
    -khtml-opacity: 0.85;
    opacity: 0.85;
    background-image: url(./assets/watson_black_animate.gif);
    background-position: center 150px;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
</style>
