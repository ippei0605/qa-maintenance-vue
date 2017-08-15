<template>
  <div class="stt">
    <myheader></myheader>
    <div v-show="loading"><span id="loading-view"></span></div>
    <div class="container-fluid" style="margin: 15px 0 0 0">
      <div v-if="error" class="alert alert-danger" role="alert"><p>エラーが発生しました。<br>{{error}}</p></div>
      <form id="modelFormId">
        <div class="btn-group btn-group-justified" role="group">
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-default" @click="$refs.sttCreateModel.init()"
                    data-toggle="modal" data-target="#sttCreateModelModalId">
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
            <button type="button" v-bind:disabled="customization_id === 'default'" class="btn btn-default"
                    @click="$refs.sttDeleteModel.init()"
                    data-toggle="modal" data-target="#sttDeleteModelModalId">
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
    <stt-create-model ref="sttCreateModel" v-on:update="getCustomizations"></stt-create-model>
    <stt-delete-model ref="sttDeleteModel" :customization_id="customization_id"
                      v-on:update="getCustomizations"></stt-delete-model>
  </div>
</template>

<script>
  import myheader from './Header'
  import sttCreateModel from './SttCreateModel'
  import sttDeleteModel from './SttDeleteModel'

  export default {
    name: 'stt',
    components: {
      myheader, sttCreateModel, sttDeleteModel
    },
    data: function () {
      return {
        msg: 'Welcome to Speech to Text',
        loading: false,
        customizations: null,
        customization: null,
        customization_id: 'default',
        error: null
      }
    },
    created: function () {
      this.getCustomizations(true)
    },
    methods: {
      getCustomizations: function () {
        this.loading = true
        $.ajax({
          type: 'GET',
          url: 'http://localhost:6010/stt2'
        }).done((value) => {
          this.customizations = value
          this.customization_id = 'default'
        }).fail((error) => {
          console.log('error:', error)
          this.error = error
          this.customizations = null
        }).always(() => {
          this.loading = false
        })
      },
      getCustomization: function () {
        if (this.customization_id === 'default') {
          this.customization = null
        } else {
          this.loading = true
          $.ajax({
            type: 'GET',
            url: `http://localhost:6010/stt2/${this.customization_id}`
          }).done((value) => {
            this.customization = value
            for (let i in this.customizations) {
              if (this.customizations[i].customization_id === this.customization.model.customization_id) {
                this.customizations[i] = this.customization.model
                break
              }
            }
          }).fail((error) => {
            console.log('error:', error)
            this.customization = null
          }).always(() => {
            this.loading = false
          })
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
