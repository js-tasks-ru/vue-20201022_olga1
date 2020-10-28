import Vue from './vue.esm.browser.js';

const app = new Vue({
  el: '#app',

  data: function () {
    return {
      counter: 0,
    };
  },

  methods: {
    initCounter() {
      this.counter += 1;
    },
  },
});
