<template>
  <div class="tts">
    <myheader></myheader>
    <div v-show="loading"><span id="loading-view"></span></div>
    <div class="container-fluid" style="margin: 15px 0 0 0">
      <div v-if="errorMessage" class="alert alert-danger" role="alert"><p>ERROR: {{errorMessage}}</p></div>
      <form id="modelFormId">
        <div class="btn-group btn-group-justified" role="group">
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-default" @click="$refs.ttsCreateModel.init()"
                    data-toggle="modal" data-target="#ttsCreateModelModalId">
              <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Create
            </button>
          </div>
          <div type="submit" class="btn-group" role="group">
            <button class="btn btn-default" @click="speech()">
              <span class="glyphicon glyphicon-volume-up" aria-hidden="true"></span> speech
            </button>
          </div>
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-default" @click="clear()">
              <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Clear
            </button>
          </div>
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-default" @click="reset()">
              <span class="glyphicon glyphicon-refresh" aria-hidden="true"></span> Reset
            </button>
          </div>
          <div class="btn-group" role="group">
            <button v-bind:disabled="customization_id === 'default'" type="button" class="btn btn-default"
                    @click="$refs.ttsDeleteModel.init()"
                    data-toggle="modal" data-target="#ttsDeleteModelModalId">
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
            <th>last modified</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="text-center">
              <input type="radio" value="default" v-model="customization_id" @click="getCustomization()">
            </td>
            <td>default</td>
            <td>ja-JP_EmiVoice</td>
            <td></td>
          </tr>
          <tr v-for="item in customizations">
            <td class="text-center">
              <input type="radio" :value="item.customization_id" v-model="customization_id" @click="getCustomization()">
            </td>
            <td>{{item.customization_id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.last_modified}}</td>
          </tr>
          </tbody>
        </table>
      </form>
      <div class="panel panel-default">
        <div class="panel-heading">WatsonSpeech.TextToSpeech # synthesize</div>
        <div class="panel-body">
          <textarea class="form-control" placeholder="読み上げるメッセージを入力して下さい。" rows="5" v-model="message"></textarea>
        </div>
      </div>
      <div v-if="customization">
        <h3>
          <a @click="$refs.ttsUpdateModel.init(customization)" data-toggle="modal" data-target="#ttsUpdateModelModalId">
            <span class="glyphicon glyphicon-cog" aria-hidden="true"></span> Model</a>
        </h3>
        <pre>{{JSON.stringify(customization, undefined, 2)}}</pre>
      </div>
    </div>
    <tts-create-model ref="ttsCreateModel" v-on:update="getCustomizations"></tts-create-model>
    <tts-delete-model ref="ttsDeleteModel" :customization_id="customization_id"
                      v-on:update="getCustomizations"></tts-delete-model>
    <tts-update-model ref="ttsUpdateModel" :customization_id="customization_id"
                      v-on:update="getCustomizations"></tts-update-model>
  </div>
</template>

<script>
  import WatsonSpeech from 'watson-speech';
  import context from '../context';
  import myheader from './Header';
  import ttsCreateModel from './TtsCreateModel';
  import ttsDeleteModel from './TtsDeleteModel';
  import ttsUpdateModel from './TtsUpdateModel';

  export default {
    name: 'tts',
    components: {
      myheader, ttsCreateModel, ttsDeleteModel, ttsUpdateModel
    },
    data () {
      return {
        loading: false,
        customizations: null,
        customization: null,
        customization_id: 'default',
        errorMessage: '',
        message: '',
        sampleMessage: 'スクラムとは、革新なプロダクトやサービスを開発するためのアプローチだ。アジャイルアプローチを用いる場合、プロダクトバックログを作るところから始める。プロダクトバックログとは、フィーチャーや、プロダクト開発をうまく行うために必要なその他のことについて、優先順位を付けて一覧化したものである。このプロダクトバックログに従って、最も重要で優先順位の高いアイテムから作業を行う。リソース(たとえ』却時間)が尽きたときも、まだ終わっていない作業は完了した作業よりも優先順位が低いものになるだろう。'
      };
    },
    created () {
      this.getCustomizations();
      this.message = this.sampleMessage;
    },
    methods: {
      speech () {
        if (this.message) {
          $.ajax({
            type: 'GET',
            url: `${context.SERVER}tts/token`
          }).done((value) => {
            const params = {
              text: this.message,
              token: value.token,
              voice: value.voice
            };
            if (this.customization_id !== 'default') {
              params.customization_id = this.customization_id;
            }
            WatsonSpeech.TextToSpeech.synthesize(params);
          }).fail((error) => {
            console.log('error:', error);
            this.errorMessage = 'Text to Speech の呼び出しに失敗しました。';
          }).always(() => {
            return false;
          });
        } else {
          return false;
        }
      },
      clear () {
        this.message = '';
      },
      reset () {
        this.message = this.sampleMessage;
      },
      getCustomizations () {
        this.errorMessage = '';
        this.loading = true;
        $.ajax({
          type: 'GET',
          url: `${context.SERVER}tts`
        }).done((value) => {
          this.customizations = value.customizations;
          this.customization_id = 'default';
          this.customization = null;
        }).fail((error) => {
          console.log('error:', error);
          this.errorMessage = 'カスタムモデル一覧の取得に失敗しました。';
          this.customizations = null;
        }).always(() => {
          this.loading = false;
        });
      },
      getCustomization () {
        this.errorMessage = '';
        if (this.customization_id === 'default') {
          this.customization = null;
        } else {
          this.loading = true;
          $.ajax({
            type: 'GET',
            url: `${context.SERVER}tts/${this.customization_id}`
          }).done((value) => {
            this.customization = value;
          }).fail((error) => {
            console.log('error:', error);
            this.errorMessage = 'カスタムモデルの取得に失敗しました。';
            this.customization = null;
          }).always(() => {
            this.loading = false;
          });
        }
      }
    }
  };
</script>
#loading-view {
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
