<template>
  <div>
    <header>
      <div class="container-fluid text-center">
        <h1>Q&A Maintenance</h1>
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
            <router-link to="/" :class="['navbar-brand', $route.path === '/' ? 'active' : '']">Home</router-link>
          </div>
          <div class="collapse navbar-collapse" id="navbarEexample7">
            <ul class="nav navbar-nav">
              <li :class="$route.path === '/answer' ? 'active' : ''">
                <router-link to="/answer">Answer</router-link>
              </li>
              <li :class="$route.path === '/nlc' ? 'active' : ''">
                <router-link to="/nlc">Natural Language Classifier</router-link>
              </li>
              <li :class="$route.path === '/stt' ? 'active' : ''">
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

<style scoped>
  a.active {
    color: #FFFFFF
  }
</style>
