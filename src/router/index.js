import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Home from '@/components/Home';
import Nlc from '@/components/Nlc';
import Stt from '@/components/Stt';
import Tts from '@/components/Tts';
import Feedback from '@/components/Feedback';
import Auth from '@/components/Auth';
import Thanks from '@/components/Thanks';

Vue.use(Router);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/nlc',
    name: 'Nlc',
    component: Nlc,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/stt',
    name: 'Stt',
    component: Stt,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/tts',
    name: 'Tts',
    component: Tts,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/feedback',
    name: 'Feedback',
    component: Feedback,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/thanks',
    name: 'Thanks',
    component: Thanks
  }
];

const router = new Router({routes});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !Auth.loggedIn()) {
    next({path: '/login', query: {redirect: to.fullPath}});
  } else {
    next();
  }
});
export default router;
