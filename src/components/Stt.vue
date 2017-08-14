<template>
  <div class="stt">
    <myheader></myheader>
    <div v-show="loading"><span id="loading-view"></span></div>
    <div class="container-fluid" style="margin: 15px 0 0 0">
      <form id="modelFormId">
        <div class="btn-group btn-group-justified" role="group">
          <div class="btn-group" role="group">
            <button class="btn btn-default" @click="initCreateModelModal" data-toggle="modal"
                    data-target="#createModelModal">
              <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Create
            </button>
          </div>
          <div class="btn-group" role="group">
            <button type="button" id="trainBtnId" class="btn btn-default">
              <span class="glyphicon glyphicon-book" aria-hidden="true"></span> Train
            </button>
          </div>
          <div class="btn-group" role="group">
            <button type="button" id="sttStartId" class="btn btn-default">
              <span class="glyphicon glyphicon-record" aria-hidden="true"></span> Recognize
            </button>
          </div>
          <div class="btn-group" role="group">
            <button type="button" id="sttStopId" class="btn btn-default">
              <span class="glyphicon glyphicon-stop" aria-hidden="true"></span> Stop
            </button>
          </div>
          <div class="btn-group" role="group">
            <button type="button" id="deleteModelBtnId" class="btn btn-default">
              <span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete model
            </button>
          </div>
        </div>
        <br>
        <table id="modelTableId" class="table table-bordered table-striped table-hover">
          <thead>
          <tr>
            <th></th>
            <th>customization_id</th>
            <th>name</th>
            <th>created</th>
            <th>status</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="text-center">
              <input type="radio" value="default" v-model="customization_id" @click="getCustomization()">
            </td>
            <td>default</td>
            <td>ja-JP_BroadbandModel</td>
            <td></td>
            <td></td>
          </tr>
          <tr v-for="item in customizations">
            <td class="text-center">
              <input type="radio" :value="item.customization_id" v-model="customization_id" @click="getCustomization()">
            </td>
            <td>{{item.customization_id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.created}}</td>
            <td>{{item.status}}</td>
          </tr>
          </tbody>
        </table>
      </form>
      <div class="panel panel-default">
        <div class="panel-heading">WatsonSpeech.SpeechToText # recognizeMicrophone</div>
        <div class="panel-body"><p id="outputId">--</p></div>
      </div>
      <div v-if="customization">
        <div class="row">
          <div class="col-sm-12">
            <h3><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> Model
              <small>(Can not configure)</small>
            </h3>
            <pre>{{JSON.stringify(customization.model, undefined, 2)}}</pre>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <h3><a href="#"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span> Corpora</a></h3>
            <pre>{{JSON.stringify(customization.corpora, undefined, 2)}}</pre>
          </div>
          <div class="col-sm-6">
            <h3><a href="#"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span> Word</a></h3>
            <pre>{{JSON.stringify(customization.word, undefined, 2)}}</pre>
          </div>
        </div>
      </div>
    </div>
    <!-- モーダル -->
    <div class="modal fade" id="createModelModal" tabindex="-1">
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
                  <input class="form-control" v-model="createModelModal.name" placeholder="名前">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">description</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control"
                         v-model="createModelModal.description" placeholder="説明">
                </div>
              </div>
            </form>
            <pre v-if="createModelModal.result" :class="createModelModal.resultClass">{{createModelModal.result}}</pre>
          </div>
          <div class="modal-footer">
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
</template>

<script>
  import axios from 'axios'
  import myheader from './Header'
  import sttModal from './SttModal'

  export default {
    name: 'stt',
    components: {
      myheader, sttModal
    },
    data: function () {
      return {
        msg: 'Welcome to Speech to Text',
        loading: false,
        customizations: null,
        customization: null,
        customization_id: 'default',
        createModelModal: null
      }
    },
    created: function () {
      this.initCreateModelModal()
      this.getCustomizations()
    },
    methods: {
      initCreateModelModal: function () {
        this.createModelModal = {
          name: '',
          description: '',
          result: null,
          resultClass: 'text-success'
        }
      },
      getCustomizations: function () {
        this.loading = true
        const url = `http://localhost:6010/stt2`
        axios.get(url)
          .then((response) => {
            this.customizations = response.data
            this.loading = false
          })
          .catch((error) => {
            console.log(error)
            this.customizations = null
            this.loading = false
          })
      },
      getCustomization: function () {
        if (this.customization_id === 'default') {
          this.customization = null
        } else {
          this.loading = true
          const url = `http://localhost:6010/stt2/${this.customization_id}`
          axios.get(url)
            .then((response) => {
              this.customization = response.data
              for (let i in this.customizations) {
                if (this.customizations[i].customization_id === this.customization.model.customization_id) {
                  this.customizations[i] = this.customization.model
                  break
                }
              }
              this.loading = false
            })
            .catch((error) => {
              console.log(error)
              this.customization = null
              this.loading = false
            })
        }
      },
      createModel: function () {
        this.loading = true
        const url = `http://localhost:6010/stt2`
        const params = new URLSearchParams()
        params.append('name', this.createModelModal.name)
        params.append('description', this.createModelModal.description)
        axios.post(url, params)
          .then((response) => {
            this.createModelModal.result = response.data
            this.loading = false
            this.getCustomizations()
          })
          .catch((error) => {
            console.log(error)
            this.createModelModal.resultClass = 'text-danger'
            this.createModelModal.result = error
            this.loading = false
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
