import Vue from 'vue';
import Router from 'vue-router';
import 'bulma/css/bulma.css';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
