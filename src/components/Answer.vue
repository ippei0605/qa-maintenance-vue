<template>
  <div class="answer">
    <myheader></myheader>
    <div class="container">
      <h1>{{ msg }}</h1>
    </div>
  </div>
</template>

<script>
  import myheader from './Header'

  export default {
    name: 'answer',
    components: {
      myheader
    },
    data: function () {
      return {
        msg: 'Welcome to Answer'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
