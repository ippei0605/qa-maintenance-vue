<template>
  <div class="home">
    <myheader></myheader>
    <div class="container-fluid">
      <div v-show="loading"><span id="loading-view"></span></div>
      <div v-if="errorMessage" class="alert alert-danger" role="alert"><p>ERROR: {{errorMessage}}</p></div>
      <div class="row alert alert-info">
        <div class="col-md-5 text-right">Number of logs: {{feedbackLog.length.toLocaleString()}}</div>
        <div class="col-md-5 text-right"> Average confidence: {{average}}</div>
        <div class="col-md-2">
          <button type=" button" class="close" data-dismiss="alert">
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>
      <div class="table-responsive">
        <table id="tableId" class="table table-bordered table-striped table-hover">
          <thead>
          <tr>
            <th><a @click="sort('datetime')">Datetime <span :class="dispSorter('datetime')"></span></a></th>
            <th><a @click="sort('like')">Like <span :class="dispSorter('like')"></span></a></th>
            <th><a @click="sort('confidence')">% <span :class="dispSorter('confidence')"></span></a></th>
            <th>Comment</th>
            <th>Question</th>
            <th>Class name</th>
            <th>Final answer</th>
            <th>Answer</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in feedbackLog">
            <td>{{item.datetime}}</td>
            <td>{{item.like}}</td>
            <td class="text-right">{{item.confidence}}</td>
            <td>{{item.comment}}</td>
            <td>{{item.question}}</td>
            <td>{{item.className}}</td>
            <td>{{item.finalAnswer}}</td>
            <td>{{item.answer}}</td>
            <td><a @click="remove(item.id, item.rev)"><span class="glyphicon glyphicon-trash"
                                                            aria-hidden="true"></span></a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import context from '../context';
  import myheader from './Header';

  export default {
    name: 'home',
    components: {
      myheader
    },
    data () {
      return {
        loading: false,
        feedbackLog: [],
        errorMessage: '',
        order: null,
        average: 0
      };
    },
    created () {
      this.getFeedbackLog();
    },
    methods: {
      remove (id, rev) {
        $.ajax({
          type: 'POST',
          url: `${context.SERVER}feedback/${id}/delete`,
          data: {
            rev: rev
          }
        }).done((value) => {
        }).fail((error) => {
          console.log('error:', error);
          this.errorMessage = 'フィードバックログのレコードを削除できませんでした。';
        }).always(() => {
          this.getFeedbackLog();
        });
      },
      dispSorter (key) {
        if (this.order) {
          if (this.order.key === key) {
            if (this.order.asending) {
              return 'glyphicon glyphicon-sort-by-alphabet';
            } else {
              return 'glyphicon glyphicon glyphicon-sort-by-alphabet-alt';
            }
          } else {
            return '';
          }
        } else {
          return '';
        }
      },
      sort (key) {
        if (this.order) {
          if (this.order.key === key) {
            this.order.asending = !this.order.asending;
          } else {
            this.order.key = key;
            this.order.asending = true;
          }
        } else {
          this.order = {
            key: key,
            asending: true
          };
        }
        this.feedbackLog.sort((a, b) => {
          if (a[key] < b[key]) return this.order.asending ? -1 : 1;
          if (a[key] > b[key]) return this.order.asending ? 1 : -1;
          return 0;
        });
      },
      getFeedbackLog () {
        this.errorMessage = '';
        this.loading = true;
        this.average = 0;
        $.ajax({
          type: 'GET',
          url: `${context.SERVER}feedback`
        }).done((value) => {
          this.feedbackLog = [];
          value.forEach((item) => {
            let like;
            if (item.value.like === undefined) {
              like = '';
            } else {
              if (item.value.like) {
                like = '良い';
              } else {
                like = '悪い';
              }
            }
            const confidence = parseInt(Math.abs(item.value.confidence) * 100);
            this.average += confidence;
            this.feedbackLog.push({
              id: item.value._id,
              rev: item.value._rev,
              datetime: item.value.datetime,
              like: like,
              confidence: confidence,
              comment: item.value.comment,
              question: item.value.question,
              className: item.value.class_name,
              finalAnswer: item.value.final_answer,
              answer: item.value.final_answer === item.value.answer ? '同左' : item.value.answer
            });
          });
        }).fail((error) => {
          console.log('error:', error);
          this.errorMessage = 'フィードバックログの取得に失敗しました。';
          this.feedbackLog = null;
        }).always(() => {
          this.loading = false;
          this.order = null;
          this.average = parseFloat(this.average / this.feedbackLog.length).toFixed(2);
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  th {
    white-space: nowrap;
  }
</style>
