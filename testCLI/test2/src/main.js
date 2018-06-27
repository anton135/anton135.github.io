import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyBUJP9RU0Zrh52-vk8gANsqA0lG7oAr5yU",
  authDomain: "test-fb-be31e.firebaseapp.com",
  databaseURL: "https://test-fb-be31e.firebaseio.com",
  projectId: "test-fb-be31e",
  storageBucket: "test-fb-be31e.appspot.com",
  messagingSenderId: "363256205370"
};
firebase.initializeApp(config);

new Vue({
  el: '#app',
  render: h => h(App)
})
