<template>
  <div id="nlc-delete-classifier">
    <div v-show="loading"><span id="loading-view"></span></div>
    <div class="modal fade" id="nlcDeleteClassifierModalId" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button class="close" data-dismiss="modal"><span>×</span></button>
            <h4 class="modal-title">Delete Classifier</h4>
          </div>
          <div class="modal-body">
            <p>「{{classifierId}}」を削除します。</p>
            <br>
            <br>
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
                  <button class="btn btn-danger" @click="deleteClassifier()">Delete</button>
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
  import context from '@/context';

  export default {
    name: 'nlcDeleteClassifier',
    data () {
      return {
        loading: false,
        classifierId: '',
        result: null,
        resultClass: 'text-success'
      };
    },
    methods: {
      init (classifierId) {
        this.classifierId = classifierId;
        this.result = null;
        this.resultClass = 'text-success';
      },
      deleteClassifier () {
        this.loading = true;
        $.ajax({
          type: 'POST',
          url: `${context.SERVER}nlc/${this.classifierId}/delete`
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
