<template>
  <div class="stt">
    <myheader></myheader>
    <div v-show="loading"><span id="loading-view"></span></div>
    <div class="container-fluid" style="margin: 15px 0 0 0">
      <div v-if="errorMessage" class="alert alert-danger" role="alert"><p>ERROR: {{errorMessage}}</p></div>
      <form id="modelFormId">
        <div class="btn-group btn-group-justified" role="group">
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-default" @click="$refs.sttCreateModel.init()"
                    data-toggle="modal" data-target="#sttCreateModelModalId">
              <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Create
            </button>
          </div>
          <div type="button" class="btn-group" role="group">
            <button v-bind:disabled="customization === null || customization.model.status !== 'ready'"
                    type="button" class="btn btn-default" @click="$refs.sttTrain.init()"
                    data-toggle="modal" data-target="#sttTrainModalId">
              <span class="glyphicon glyphicon-book" aria-hidden="true"></span> Train
            </button>
          </div>
          <div type="button" class="btn-group" role="group">
            <button v-bind:disabled="stream !== null" type="button" class="btn btn-default" @click="startRecognize()">
              <span class="glyphicon glyphicon-record" aria-hidden="true"></span> Recognize
            </button>
          </div>
          <div class="btn-group" role="group">
            <button v-bind:disabled="stream === null" type="button" class="btn btn-default" @click="stopRecognize()">
              <span class="glyphicon glyphicon-stop" aria-hidden="true"></span> Stop
            </button>
          </div>
          <div class="btn-group" role="group">
            <button v-bind:disabled="customization_id === 'default'" type="button" class="btn btn-default"
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
            <h3>
              <a @click="$refs.sttCorpora.init()" data-toggle="modal" data-target="#sttCorporaModalId">
                <span class="glyphicon glyphicon-cog" aria-hidden="true"></span> Corpora
              </a>
            </h3>
            <pre>{{JSON.stringify(customization.corpora, undefined, 2)}}</pre>
          </div>
          <div class="col-sm-6">
            <h3><a @click="$refs.sttWord.init()" data-toggle="modal" data-target="#sttWordModalId">
              <span class="glyphicon glyphicon-cog" aria-hidden="true"></span> Word</a>
            </h3>
            <pre>{{JSON.stringify(customization.word, undefined, 2)}}</pre>
          </div>
        </div>
      </div>
    </div>
    <stt-create-model ref="sttCreateModel" v-on:update="getCustomizations"></stt-create-model>
    <stt-delete-model ref="sttDeleteModel" :customization_id="customization_id"
                      v-on:update="getCustomizations"></stt-delete-model>
    <stt-corpora ref="sttCorpora" :customization="customization" v-on:update="getCustomization"></stt-corpora>
    <stt-word ref="sttWord" :customization="customization" v-on:update="getCustomization"></stt-word>
    <stt-train ref="sttTrain" :customization_id="customization_id" v-on:update="getCustomization"></stt-train>
  </div>
</template>

<script>
  import WatsonSpeech from 'watson-speech'
  import context from '../context'
  import myheader from './Header'
  import sttCreateModel from './SttCreateModel'
  import sttDeleteModel from './SttDeleteModel'
  import sttCorpora from './SttCorpora'
  import sttWord from './SttWord'
  import sttTrain from './SttTrain'

  export default {
    name: 'stt',
    components: {
      myheader, sttCreateModel, sttDeleteModel, sttCorpora, sttWord, sttTrain
    },
    data () {
      return {
        loading: false,
        customizations: null,
        customization: null,
        customization_id: 'default',
        errorMessage: '',
        stream: null
      }
    },
    created () {
      this.getCustomizations()
    },
    methods: {
      startRecognize () {
        // Watson Speech to text と Text to Speech を使用するための情報を取得する。
        $.ajax({
          type: 'GET',
          url: `${context.SERVER}stt/token`
        }).done((value) => {
          const param = {
            token: value.token,
            model: value.model,
            outputElement: '#outputId' // CSS selector or DOM Element
          }
          if (this.customization_id !== 'default') {
            param.customization_id = this.customization_id
          }
          // Speech to Text を呼び出す。
          this.stream = WatsonSpeech.SpeechToText.recognizeMicrophone(param)
          this.stream.on('error', (error) => {
            console.log('error:', error)
            this.errorMessage = 'Speech to Text のストリーム操作でエラーが発生しました。'
            this.stream = null
          })
        }).fail((error) => {
          console.log('error:', error)
          this.errorMessage = 'Speech to Text の呼び出しに失敗しました。'
          this.stream = null
        })
      },
      stopRecognize () {
        if (this.stream) {
          this.stream.stop()
          this.stream = null
        }
      },
      getCustomizations () {
        this.errorMessage = ''
        this.loading = true
        $.ajax({
          type: 'GET',
          url: `${context.SERVER}stt`
        }).done((value) => {
          this.customizations = value.customizations
          this.customization_id = 'default'
          this.customization = null
        }).fail((error) => {
          console.log('error:', error)
          this.errorMessage = 'カスタムモデル一覧の取得に失敗しました。'
          this.customizations = null
        }).always(() => {
          this.loading = false
        })
      },
      getCustomization () {
        this.errorMessage = ''
        if (this.customization_id === 'default') {
          this.customization = null
        } else {
          this.loading = true
          $.ajax({
            type: 'GET',
            url: `${context.SERVER}stt/${this.customization_id}`
          }).done((value) => {
            this.customization = value
            for (const i in this.customizations) {
              if (this.customizations[i].customization_id === this.customization.model.customization_id) {
                this.customizations[i] = this.customization.model
                break
              }
            }
          }).fail((error) => {
            console.log('error:', error)
            this.errorMessage = 'カスタムモデルの取得に失敗しました。'
            this.customization = null
          }).always(() => {
            this.loading = false
          })
        }
      }
    }
  }
</script>
#loading-view {
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
