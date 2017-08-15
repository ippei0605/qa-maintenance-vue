<template>
  <div id="stt-corpora">
    <div v-show="loading"><span id="loading-view"></span></div>
    <div class="modal fade" id="sttCorporaModalId" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button class="close" data-dismiss="modal"><span>×</span></button>
            <h4 class="modal-title">Corpora</h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="input-group">
                <span class="input-group-addon">Corpus file</span>
                <input type="file" @change="selectedFile" :key="fileId" name="corpus-txt" class="form-control">
                <span class="input-group-btn">
                  <button type="button" class="btn btn-primary" @click="addCorpus()">
                    <span class="glyphicon glyphicon-upload" aria-hidden="true"></span> Add
                  </button>
                </span>
              </div>
              <br>
              <div class="input-group">
                <span class="input-group-addon">Corpus name</span>
                <select class="form-control" v-model="selected"
                        style="border-radius: 0!important; -webkit-appearance:none;">
                  <option v-for="option in options" v-bind:value="option.value">
                    {{ option.text }}
                  </option>
                </select>
                <span class="input-group-btn">
                  <button type="button" class="btn btn-danger" @click="deleteCorpus()">
                    <span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete
                  </button>
                </span>
              </div>
            </form>
            <hr>
            <pre v-if="result" :class="resultClass">{{result}}</pre>
          </div>
          <div class="modal-footer">
            <div class="text-right">
              <button class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import context from '../context'

  export default {
    name: 'sttCorpora',
    data () {
      return {
        loading: false,
        result: null,
        resultClass: 'text-success',
        selected: '',
        options: null,
        fileId: 0,
        uploadFile: null
      }
    },
    props: {
      customization: null
    },
    methods: {
      selectedFile (e) {
        e.preventDefault()
        const files = e.target.files
        this.uploadFile = files[0]
      },
      init () {
        this.result = null
        this.resultClass = 'text-success'
        this.selected = ''
        this.options = [{text: '削除するコーパスを選択してください', value: ''}]
        this.uploadFile = null
        const corpora = this.customization.corpora
        corpora.forEach((corpus) => {
          this.options.push({text: corpus.name, value: corpus.name})
        })
        ++this.fileId
      },
      addCorpus () {
        if (this.uploadFile) {
          this.loading = true
          const formdata = new FormData()
          formdata.append('corpus-txt', this.uploadFile)
          $.ajax({
            type: 'POST',
            url: `${context.SERVER}stt/${this.customization.model.customization_id}/corpus`,
            data: formdata,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'text'
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
      },
      deleteCorpus () {
        if (this.selected) {
          this.loading = true
          $.ajax({
            type: 'POST',
            url: `${context.SERVER}stt/${this.customization.model.customization_id}/corpus/${this.selected}/delete`,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'text'
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
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
