<template>
  <div class="nlc">
    <myheader></myheader>
    <div v-show="loading"><span id="loading-view"></span></div>
    <div class="container-fluid" style="margin: 15px 0 0 0">
      <div v-if="errorMessage" class="alert alert-danger" role="alert"><p>ERROR: {{errorMessage}}</p></div>
      <form>
        <div class="input-group">
          <span class="input-group-addon">Training CSV File</span>
          <input type="file" @change="selectedFile" :key="fileId" name="training-csv"
                 class="form-control">
          <span class="input-group-btn">
            <button @click="createClassifier()" type="button" class="btn btn-primary">
              <span class="glyphicon glyphicon-upload" aria-hidden="true"></span> Create
            </button>
            </span>
        </div>
      </form>
      <br>
      <form>
        <table class="table table-bordered table-striped table-hover">
          <thead>
          <tr>
            <th></th>
            <th>classifier_id</th>
            <th>name</th>
            <th>language</th>
            <th>created</th>
            <th>status</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in classifiers">
            <td class="text-center">
              <input type="radio" :value="item.classifier_id" v-model="classifierId">
            </td>
            <td>{{item.classifier_id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.language}}</td>
            <td>{{item.created}}</td>
            <td>{{item.status}}</td>
            <td class="text-center">
              <a @click="$refs.nlcDeleteClassifier.init(item.classifier_id)"
                 data-toggle="modal" data-target="#nlcDeleteClassifierModalId">
                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
              </a>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="input-group">
          <input v-model="text" type="text" class="form-control" placeholder="テキストを入力してください。">
          <span class="input-group-btn">
            <button v-bind:disabled="!classifierId" type="submit" class="btn btn-default" @click="classify()">
              <span class="glyphicon glyphicon-search" aria-hidden="true"></span> Classify
            </button>
        </span>
        </div>
      </form>
      <br>
      <ul class="nav nav-tabs nav-justified">
        <li class="active"><a href="#jsonTabId" data-toggle="tab">Result JSON</a></li>
        <li><a href="#tableTabId" data-toggle="tab">Table</a></li>
      </ul>
      <br>
      <div class="tab-content">
        <div class="tab-pane in active" id="jsonTabId">
          <div v-if="result.raw">
            <pre class="text-success">{{result.raw}}</pre>
          </div>
        </div>
        <div class="tab-pane" id="tableTabId">
          <table class="table table-bordered table-striped table-hover">
            <thead>
            <tr>
              <th>Class Name</th>
              <th>Message</th>
              <th>Confidence</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in result.table">
              <td>{{item.class_name}}</td>
              <td>{{item.message}}</td>
              <td class="text-right">{{parseFloat(item.confidence).toFixed(3)}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <nlc-create-classifier ref="nlcCreateClassifier" v-on:update="getClassifiers"></nlc-create-classifier>
    <nlc-delete-classifier ref="nlcDeleteClassifier" v-on:update="getClassifiers"></nlc-delete-classifier>
  </div>
</template>

<script>
  import context from '@/context'
  import myheader from '@/components/Header'
  import nlcCreateClassifier from '@/components/NlcCreateClassifier'
  import nlcDeleteClassifier from '@/components/NlcDeleteClassifier'

  export default {
    name: 'nlc',
    components: {
      myheader, nlcCreateClassifier, nlcDeleteClassifier
    },
    data: () => {
      return {
        loading: false,
        errorMessage: '',
        classifiers: null,
        classifierId: '',
        text: '',
        result: null,
        file: null,
        fileId: 0,
        uploadFile: null
      }
    },
    created () {
      this.getClassifiers()
    },
    methods: {
      selectedFile (e) {
        e.preventDefault()
        const files = e.target.files
        this.uploadFile = files[0]
      },
      getNow () {
        const now = new Date()
        return now.getFullYear() + '年' +
          (now.getMonth() + 1) + '月' +
          now.getDate() + '日 ' +
          now.getHours() + '時' +
          now.getMinutes() + '分' +
          now.getSeconds() + '秒'
      },
      getClassifiers () {
        this.result = ''
        this.errorMessage = ''
        this.loading = true
        $.ajax({
          type: 'GET',
          url: `${context.SERVER}nlc`
        }).done((value) => {
          this.classifiers = value
          if (value && value.length > 0) {
            this.classifierId = value[0].classifier_id
          }
        }).fail((error) => {
          console.log('error:', error)
          this.errorMessage = 'Classifier 一覧の取得に失敗しました。'
          this.classifiers = null
        }).always(() => {
          this.loading = false
          ++this.fileId
        })
      },
      classify () {
        this.loading = true
        $.ajax({
          type: 'GET',
          url: `${context.SERVER}nlc/${this.classifierId}/classify`,
          data: {
            'text': this.text,
            'now': this.getNow()
          }
        }).done((value) => {
          this.result = value
        }).fail((error) => {
          console.log('error:', error)
          this.errorMessage = 'クラス分類の実行に失敗しました。'
        }).always(() => {
          this.text = ''
          this.loading = false
        })
      },
      createClassifier () {
        if (this.uploadFile) {
          this.$refs.nlcCreateClassifier.init(this.uploadFile)
          $('#nlcCreateClassifierModalId').modal('show')
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
