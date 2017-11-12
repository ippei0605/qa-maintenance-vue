<template>
  <div id="myheader">
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
          <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
              <li :class="$route.path === '/nlc' ? 'active' : ''">
                <router-link to="/nlc">Natural Language Classifier</router-link>
              </li>
              <li :class="$route.path === '/stt' ? 'active' : ''">
                <router-link to="/stt">Speech to Text</router-link>
              </li>
              <li :class="$route.path === '/tts' ? 'active' : ''">
                <router-link to="/tts">Text to Speech</router-link>
              </li>
              <li :class="$route.path === '/feedback' ? 'active' : ''">
                <router-link to="/feedback">Feedback Log</router-link>
              </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li><p class="navbar-text">ようこそ {{username}} さん</p></li>
              <li>
                <a data-toggle="modal" data-target="#logoutModalId">
                  <span class="glyphicon glyphicon-log-out" aria-hidden="true"></span> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <logout></logout>
  </div>
</template>

<script>
  import logout from '@/components/logout';
  import auth from '@/components/Auth';

  export default {
    name: 'myheader',
    components: {
      logout
    },
    data () {
      return {
        username: ''
      };
    },
    created () {
      const username = auth.getUsername().split('@');
      this.username = username[0];
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a {
    color: #999999
  }

  a.active {
    color: #FFFFFF
  }
</style>
