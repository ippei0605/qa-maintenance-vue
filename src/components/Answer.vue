<template>
  <div class="answer">
    <myheader></myheader>
    <div class="container">
      <h1>{{ msg }}</h1>
      <div v-show="loading"><span id="loading-view"></span></div>
    </div>
    <table>
      <!-- you item list -->
      <tr>
        <td>
          <router-link :to="{name: 'ItemModel', params: {id: 1}}">See item 1</router-link>
        </td>
      </tr>
    </table>
    <router-view>
      <!-- here the ItemModal component will be rendered -->
    </router-view>
  </div>
</template>

<script>
  import myheader from './Header'
  import itemModal from './ItemModal.vue'

  export default {
    name: 'answer',
    components: {
      myheader, itemModal
    },
    data: function () {
      return {
        msg: 'Welcome to Answer',
        loading: false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
