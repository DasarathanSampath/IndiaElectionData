// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import store from '@/store'
import VueMeta from 'vue-meta'
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: 'UA-144761111-1', 
  router
})

Vue.use(VueMeta)

Vue.config.productionTip = false

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDXR1T8H-x6n-vJ1DyrJc_2_7Mx8_ysYnI',
  authDomain: 'indiaelectiondata-in.firebaseapp.com',
  databaseURL: 'https://indiaelectiondata-in-default-rtdb.firebaseio.com',
  projectId: 'indiaelectiondata-in',
  storageBucket: 'indiaelectiondata-in.appspot.com',
  messagingSenderId: '1050552573960',
  appId: '1:1050552573960:web:ea7f14e64acb86f3dbf1bd',
  measurementId: 'G-YQV7PFR800'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
