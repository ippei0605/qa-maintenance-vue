<template>
  <div id="logout">
    <div class="modal fade" id="logoutModalId" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button class="close" data-dismiss="modal"><span>×</span></button>
            <h4 class="modal-title">Logout</h4>
          </div>
          <div class="modal-body">
            <p>ログアウトします。よろしいですか？</p>
            <br>
            <br>
          </div>
          <div class="modal-footer">
            <div class="row">
              <div class="col-sm-6 text-left">
                <button class="btn btn-default" data-dismiss="modal">Cancel</button>
              </div>
              <div class="col-sm-6 text-right">
                <button class="btn btn-danger" @click="logout()" data-dismiss="modal">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import auth from '@/components/Auth';

  export default {
    name: 'logout',
    methods: {
      logout () {
        auth.logout();
        this.$router.push('/thanks');
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
