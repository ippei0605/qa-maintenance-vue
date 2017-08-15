<template>
  <div id="stt-word">
    <div v-show="loading"><span id="loading-view"></span></div>
    <div class="modal fade" id="sttWordModalId" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button class="close" data-dismiss="modal"><span>×</span></button>
            <h4 class="modal-title">Word</h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="input-group">
                <span class="input-group-addon">Word file</span>
                <input type="file" @change="selectedFile" :key="fileId" name="word-json" class="form-control"
                       accept="text/plain,.json">
                <span class="input-group-btn">
                  <button type="button" class="btn btn-primary" @click="addWord()">
                    <span class="glyphicon glyphicon-upload" aria-hidden="true"></span> Add
                  </button>
                </span>
              </div>
              <br>
              <div class="input-group">
                <span class="input-group-addon">Word name</span>
                <select class="form-control" v-model="selected"
                        style="border-radius: 0!important; -webkit-appearance:none;">
                  <option v-for="option in options" v-bind:value="option.value">
                    {{ option.text }}
                  </option>
                </select>
                <span class="input-group-btn">
                  <button type="button" class="btn btn-danger" @click="deleteWord()">
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
    name: 'sttWord',
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
        this.options = [{text: '削除するワードを選択してください', value: ''}]
        this.uploadFile = null
        const word = this.customization.word
        word.forEach((row) => {
          this.options.push({text: row.word, value: row.word})
        })
        ++this.fileId
      },
      addWord () {
        if (this.uploadFile) {
          this.loading = true
          const formdata = new FormData()
          formdata.append('word-json', this.uploadFile)
          $.ajax({
            type: 'POST',
            url: `${context.SERVER}stt/${this.customization.model.customization_id}/word`,
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
      deleteWord () {
        if (this.selected) {
          this.loading = true
          $.ajax({
            type: 'POST',
            url: `${context.SERVER}stt/${this.customization.model.customization_id}/word/${this.selected}/delete`,
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
