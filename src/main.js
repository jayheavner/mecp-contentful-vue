import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';

import store from './store';

Vue.config.productionTip = false;

import dotenv from 'dotenv';
dotenv.config();

import Home from './pages/Home.vue';
import Page from './pages/Page.vue';

Vue.use(Router);
let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:slug',
      name: 'page',
      component: Page,
    },
    {
      path: '/:slug/:subPage',
      name: 'subPage',
      component: Page,
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

router.beforeEach(function(to, from, next) {
  // debugger;
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
