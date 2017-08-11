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
          <div id="resultId"></div>
          <div v-html="result"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import myheader from '../Header'

  export default {
    name: 'home',
    components: {
      myheader
    },
    data: function () {
      return {
        loading: false,
        selected: 'export-answer',
        options: [
          {text: 'All contents', value: 'export-answer'},
          {text: 'Training-csv', value: 'export-training-csv'},
          {text: 'Speech to Text Corpus', value: 'export-corpus'}
        ],
        file: {
          url: 'http://localhost:6010/export-answer',
          name: 'answer.json'
        },
        result: ''
      }
    },
    methods: {
      view: function () {
        this.loading = true
        const selected = this.selected
        const url = `http://localhost:6010/${selected}`
        axios.get(url)
          .then((response) => {
            let data
            if (typeof response.data === 'string') {
              data = response.data
            } else {
              data = JSON.stringify(response.data, undefined, 2)
            }
            this.result = `<pre class="text-success">${data}</pre>`
            this.loading = false
          })
          .catch((error) => {
            this.result = `<pre class="text-danger">${JSON.stringify(error, undefined, 2)}</pre>`
            this.loading = false
          })
      },
      download: function () {
        const selected = this.selected
        const fileMap = {
          'export-answer': 'answer.json',
          'export-training-csv': 'classifier.csv',
          'export-corpus': 'corpus.txt'
        }
        this.file.url = `http://localhost:6010/${selected}`
        this.file.name = fileMap[selected]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
