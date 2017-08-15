<template>
  <div id="stt-delete-model">
    <div v-show="loading"><span id="loading-view"></span></div>
    <div class="modal fade" id="sttTrainModalId" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button class="close" data-dismiss="modal"><span>×</span></button>
            <h4 class="modal-title">Training</h4>
          </div>
          <div class="modal-body">
            <p>「{{customization_id}}」をトレーニングします。</p>
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
    name: 'sttTrain',
    data () {
      return {
        loading: false,
        result: null,
        resultClass: 'text-success'
      }
    },
    props: {
      customization_id: String
    },
    methods: {
      init () {
        this.result = null
        this.resultClass = 'text-success'
        this.trainModel()
      },
      trainModel () {
        this.loading = true
        $.ajax({
          type: 'POST',
          url: `${context.SERVER}stt/${this.customization_id}/train`
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
