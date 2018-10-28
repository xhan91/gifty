import Vue from 'vue';
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

let app: object;
const init = () => {
  app = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
};

firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(async (user) => {
  if (!app) {
    if (user) {
      await store.dispatch('setUser', user);
      init();
    } else {
      init();
    }
  }
});
const db = firebase.firestore();
const dbSettings = {timestampsInSnapshots: true};
db.settings(dbSettings);

export {
  db,
};
