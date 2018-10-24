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

firebase.initializeApp(config);


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch('setUser', user);
  }
});

// const google = new firebase.auth.GoogleAuthProvider();
// firebase.auth().signInWithPopup(google).then((res) => {
//   store.dispatch('setUser', res);
// }).catch((err) => {});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
