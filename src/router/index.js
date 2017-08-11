import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Answer from '@/components/Answer'
import Nlc from '@/components/Nlc'
import Stt from '@/components/Stt'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/answer',
      name: 'Answer',
      component: Answer
    }, {
      path: '/nlc',
      name: 'Nlc',
      component: Nlc
    }, {
      path: '/stt',
      name: 'Stt',
      component: Stt
    }
  ]
})
