<template>
  <div class="header">
    <header>
      <div class="container-fluid text-center">
        <h1>Q&A Maintenance [{{$route.path}}]</h1>
      </div>
      <nav class="navbar navbar-inverse" style="border-radius: 0!important; -webkit-appearance:none;">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#navbarEexample7">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Home</a>
          </div>
          <div class="collapse navbar-collapse" id="navbarEexample7">
            <ul class="nav navbar-nav">
              <li class="{'active': $route.path === '/answer'}">
                <router-link to="/answer">Answer</router-link>
              </li>
              <li class="{'router-link-active'}">
                <router-link to="/nlc">Natural Language Classifier</router-link>
              </li>
              <li>
                <router-link to="/stt">Speech to Text</router-link>
              </li>
            </ul>
            <p class="navbar-text navbar-right">ようこそ ゲスト さん。</p>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>
