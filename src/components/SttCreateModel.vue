<template>
  <div id="stt-create-model">
    <div v-show="loading"><span id="loading-view"></span></div>
    <div class="modal fade" id="createModel" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button class="close" data-dismiss="modal"><span>×</span></button>
            <h4 class="modal-title">Create</h4>
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
                <button class="btn btn-default" @click="reset()" data-dismiss="modal">Close</button>
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
  import axios from 'axios'

  export default {
    name: 'sttCreateModel',
    data: function () {
      return {
        loading: false,
        name: '',
        description: '',
        result: null,
        resultClass: 'text-success'
      }
    },
    mounted: function () {
      const el = document.getElementById('createModel')
      el.addEventListener('hidden.bs.modal', () => {
        alert('hidden.bs.modal')
      })
    },
    methods: {
      reset: function () {
        this.name = ''
        this.description = ''
        this.result = null
        this.resultClass = 'text-success'
      },
      createModel: function () {
        this.loading = true
        const url = `http://localhost:6010/stt2`
        const params = new URLSearchParams()
        params.append('name', this.name)
        params.append('description', this.description)
        axios.post(url, params)
          .then((response) => {
            this.result = response.data
            this.loading = false
            this.$emit('update')
          })
          .catch((error) => {
            console.log(error)
            this.resultClass = 'text-danger'
            this.result = error
            this.loading = false
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
