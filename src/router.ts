import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import firebase from 'firebase';
import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "giftList" */ './views/Login.vue'),
    },
    {
      path: '/logout',
      name: 'logout',
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/gift-list/:userId/:listId',
      name: 'giftList',
      component: () => import(/* webpackChunkName: "giftList" */ './views/GiftList.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const user = firebase.auth().currentUser;
  if (to.name === 'logout') {
    firebase
      .auth()
      .signOut()
      .then(() => {
        store.dispatch('setUser', null);
        next('login');
      }).catch(() => {
        next('login');
      });
  } else if (!user && to.name !== 'login') {
    next('login');
  } else if (user && to.name === 'login') {
    next('home');
  } else {
    next();
  }
});

export default router;
