import Vue from 'vue'
import { VueMaskDirective } from 'v-mask'
import VueScrollTo from 'vue-scrollto';

Vue.directive('mask', VueMaskDirective)
Vue.use(VueScrollTo, {
  container: "body",
  duration: 300,
  easing: 'ease-in',
  offset: -120,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})
