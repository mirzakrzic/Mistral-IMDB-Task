import Vue from 'vue'
import MovieApp from './pages/movies/App.vue'
import SeriesApp from './pages/tvseries/App.vue'

import BootstrapVue from 'bootstrap-vue'
import StarRating from 'vue-star-rating'
import lodash from 'lodash'
import VueLodash from 'vue-lodash'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(VueLodash, lodash);
Vue.component('star-rating', StarRating);

Vue.config.productionTip = false

new Vue({
  render: h => h(MovieApp),
}).$mount('#app')

new Vue({
  render: b => b(SeriesApp),
}).$mount('#app1')