<template>
  <div class="home">
    <myheader></myheader>
    <div class="container-fluid">
      <div v-show="loading"><span id="loading-view"></span></div>
      <div class="panel panel-default">
        <div class="panel-heading">Export data</div>
        <div class="panel-body">
          <p>データベース「answer」から選択したデータをエクスポートします。</p>
          <div class="input-group">
            <span class="input-group-addon">Select</span>
            <select class="form-control" v-model="selected"
                    style="border-radius: 0!important; -webkit-appearance:none;">
              <option v-for="option in options" v-bind:value="option.value">
                {{ option.text }}
              </option>
            </select>
            <span class="input-group-btn">
              <a class="btn btn-default" @click="view()">
                <span class="glyphicon glyphicon-search" aria-hidden="true"></span> View
              </a>
              <a class="btn btn-default" v-bind:href="file.url" v-bind:download="file.name"
                 @click="download()">
                 <span class="glyphicon glyphicon-download" aria-hidden="true"></span> Download
              </a>
            </span>
          </div>
          <br>
          <div v-html="result"></div>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">import data</div>
        <div class="panel-body">
          <p>データベース「answer」にデータをインポートします。</p>
          <form>
            <div class="input-group">
              <span class="input-group-addon">JSON File</span>
              <input type="file" @change="selectedFile" :key="fileId" name="answer-json" class="form-control">
              <span class="input-group-btn">
            <button @click="importData()" type="button" class="btn btn-primary">
              <span class="glyphicon glyphicon-upload" aria-hidden="true"></span> Import
            </button>
            </span>
            </div>
          </form>
          <br>
          <div v-html="importResult"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import context from '../context'
  import myheader from './Header'

  export default {
    name: 'home',
    components: {
      myheader
    },
    data () {
      return {
        loading: false,
        selected: 'export-answer',
        options: [
          {text: 'All contents', value: 'export-answer'},
          {text: 'Training-csv', value: 'export-training-csv'},
          {text: 'Speech to Text Corpus', value: 'export-corpus'}
        ],
        file: {
          url: `${context.SERVER}export-answer`,
          name: 'answer.json'
        },
        result: '',
        importResult: '',
        fileId: 0,
        uploadFile: null
      }
    },
    methods: {
      selectedFile (e) {
        e.preventDefault()
        const files = e.target.files
        this.uploadFile = files[0]
      },
      view () {
        this.loading = true
        const selected = this.selected
        $.ajax({
          type: 'GET',
          url: `${context.SERVER}${selected}`,
          dataType: 'text'
        }).done((value) => {
          this.result = `<pre class="text-success">${value}</pre>`
        }).fail((error) => {
          console.log('error:', error)
          this.result = `<pre class="text-danger">${JSON.stringify(error, undefined, 2)}</pre>`
        }).always(() => {
          this.loading = false
        })
      },
      download () {
        const selected = this.selected
        const fileMap = {
          'export-answer': 'answer.json',
          'export-training-csv': 'classifier.csv',
          'export-corpus': 'corpus.txt'
        }
        this.file.url = `${context.SERVER}${selected}`
        this.file.name = fileMap[selected]
      },
      importData () {
        if (this.uploadFile) {
          this.loading = true
          const formdata = new FormData()
          formdata.append('answer-json', this.uploadFile)
          $.ajax({
            type: 'POST',
            url: `${context.SERVER}delete-insert-answer`,
            data: formdata,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json'
          }).done((value) => {
            this.importResult = `<pre class="text-success">${JSON.stringify(value, undefined, 2)}</pre>`
          }).fail((error) => {
            console.log('error:', error)
            this.importResult = `<pre class="text-danger">${JSON.stringify(error, undefined, 2)}</pre>`
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
