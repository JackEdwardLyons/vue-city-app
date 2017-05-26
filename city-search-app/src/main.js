// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// Global CSS
require('./assets/styles/css/style.css')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  data: {
    input: '',
    results: [],
    show_modal: false,
    modal_type: ''
  },
  methods: {
    showMap (city) {
      this.city = city
      this.modal_type = 'map'
      this.show_modal = true
    },
    showRestaurants (city) {
      this.city = city
      this.modal_type = 'restaurants'
      this.show_modal = true
    },
    login () {
      this.modal_type = 'login'
      this.show_modal = true
    },
    closeModal () {
      this.show_modal = false
    },
    formattedNumber (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ', ')
    }
  }
})

