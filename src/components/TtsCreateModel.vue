<template>
  <div id="tts-create-model">
    <div v-show="loading"><span id="loading-view"></span></div>
    <div class="modal fade" id="ttsCreateModelModalId" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button class="close" data-dismiss="modal"><span>×</span></button>
            <h4 class="modal-title">Create Custom Model</h4>
          </div>
          <div class="modal-body">
            <p>カスタムモデルを作成します。</p>
            <form class="form-horizontal">
              <div class="form-group">
                <label class="col-sm-3 control-label">language</label>
                <div class="col-sm-9">
                  <select class="form-control" v-model="selected">
                    <option v-for="option in options" v-bind:value="option.value">
                      {{ option.text }}
                    </option>
                  </select>
                </div>
              </div>
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
                <button class="btn btn-default" @click="close()" data-dismiss="modal">Close</button>
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
  import context from '../context';

  export default {
    name: 'ttsCreateModel',
    data () {
      return {
        loading: false,
        name: '',
        language: '',
        description: '',
        result: null,
        resultClass: 'text-success',
        selected: 'ja-JP',
        options: [
          {text: 'ja-JP', value: 'ja-JP'},
          {text: 'de-DE', value: 'de-DE'},
          {text: 'en-GB', value: 'en-GB'},
          {text: 'en-US', value: 'en-US'},
          {text: 'es-ES', value: 'es-ES'},
          {text: 'es-LA', value: 'es-LA'},
          {text: 'es-US', value: 'es-US'},
          {text: 'fr-FR', value: 'fr-FR'},
          {text: 'it-IT', value: 'it-IT'},
          {text: 'pt-BR', value: 'pt-BR'}
        ]
      };
    },
    methods: {
      init () {
        this.name = '';
        this.language = '';
        this.description = '';
        this.result = null;
        this.resultClass = 'text-success';
      },
      createModel () {
        this.loading = true;
        $.ajax({
          type: 'POST',
          url: `${context.SERVER}tts`,
          data: {
            language: this.language,
            name: this.name,
            description: this.description
          },
          dataType: 'json'
        }).done((value) => {
          this.result = value;
        }).fail((error) => {
          console.log('error:', error);
          this.resultClass = 'text-danger';
          this.result = error;
        }).always(() => {
          this.loading = false;
        });
      },
      close () {
        this.$emit('update');
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
