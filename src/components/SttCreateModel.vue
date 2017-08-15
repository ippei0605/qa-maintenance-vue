<template>
  <div id="stt-create-model">
    <div v-show="loading"><span id="loading-view"></span></div>
    <div class="modal fade" id="sttCreateModelModalId" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button class="close" data-dismiss="modal"><span>×</span></button>
            <h4 class="modal-title">Create Custom Model</h4>
          </div>
          <div class="modal-body">
            <p>「ja-JP_BroadbandModel」をベースにカスタムモデルを作成します。</p>
            <form class="form-horizontal">
              <div class="form-group">
                <label class="col-sm-3 control-label">name</label>
                <div class="col-sm-9">
                  <input class="form-control" v-model="name" placeholder="名前">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">description</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control"
                         v-model="description" placeholder="説明">
                </div>
              </div>
            </form>
            <pre v-if="result" :class="resultClass">{{result}}</pre>
          </div>
          <div class="modal-footer">
            <div v-if="result">
              <div class="text-right">
                <button class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
            <div v-else>
              <div class="row">
                <div class="col-sm-6 text-left">
                  <button class="btn btn-default" data-dismiss="modal">Cancel</button>
                </div>
                <div class="col-sm-6 text-right">
                  <button class="btn btn-primary" @click="createModel()">Create</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sttCreateModel',
    data () {
      return {
        loading: false,
        name: '',
        description: '',
        result: null,
        resultClass: 'text-success'
      }
    },
    methods: {
      init () {
        this.name = ''
        this.description = ''
        this.result = null
        this.resultClass = 'text-success'
      },
      createModel () {
        this.loading = true
        $.ajax({
          type: 'POST',
          url: `http://localhost:6010/stt2`,
          data: {
            name: this.name,
            description: this.description
          }
        }).done((value) => {
          this.result = value
          this.$emit('update')
        }).fail((error) => {
          console.log('error:', error)
          this.resultClass = 'text-danger'
          this.result = error
        }).always(() => {
          this.loading = false
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
