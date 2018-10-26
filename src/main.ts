import Vue from 'vue';
import VueFire from 'vuefire';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import * as firebase from 'firebase/app';
import config from './firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import './plugins/iview.js';

Vue.config.productionTip = false;
Vue.use(VueFire);

firebase.initializeApp(config);
firebase.auth().onAuthStateChanged((user) => {
  store.dispatch('setUser', user);
});
const db = firebase.firestore();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

export {
  db,
};
