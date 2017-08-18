<template>
  <div class="login">
    <div class="container">
      <div v-show="loading"><span id="loading-view"></span></div>
      <div class="login-form">
        <div class="text-center">
          <h1>Log into Q&A Maintenance</h1>
        </div>
        <br>
        <form>
          <div class="form-group">
            <label>Username</label>
            <input type="email" v-model="username" class="form-control input-lg" placeholder="ユーザー名を入力して下さい。">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" v-model="password" class="form-control input-lg" placeholder="パスワードを入力して下さい。">
          </div>
          <p v-if="message" :class="messageClass">{{message}}</p>
          <br>
          <div class="text-center">
            <button type="button" class="btn-lg btn-primary" @click="login()">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import auth from '@/components/Auth'
  import context from '@/context'

  export default {
    name: 'login',
    data () {
      return {
        loading: false,
        username: '',
        password: '',
        message: '　',
        messageClass: 'text-success'
      }
    },
    created () {
      auth.logout()
    },
    methods: {
      login () {
        this.loading = true
        $.ajax({
          type: 'POST',
          url: `${context.SERVER}login`,
          data: {
            username: this.username,
            password: this.password
          },
          dataType: 'json'
        }).done((value) => {
          auth.login({
            username: this.username,
            token: value.access_token
          })
          this.$router.push(this.$route.query.redirect)
        }).fail((error) => {
          console.log('error:', error)
          const json = JSON.parse(error.responseText)
          this.message = `ERROR: ${json.error_description}`
          this.messageClass = 'text-danger'
        }).always(() => {
          this.loading = false
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.login-form {
    margin: 10% 25%;
  }
</style>
