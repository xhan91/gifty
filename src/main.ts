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

Vue.config.productionTip = false;

firebase.initializeApp(config);

const google = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(google).then((res) => {
  store.dispatch('setUser', res);
}).catch((err) => {
  console.log(err);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
