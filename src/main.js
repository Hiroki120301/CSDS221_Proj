import Vue from 'vue'
import Vuelidate from 'vuelidate';
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Toasted from 'vue-toasted';
import moment from 'moment'

Vue.use(require('vue-moment'));

Vue.config.productionTip = false
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
});
//import  FontAwesomeIcon  from '@fortawesome/vue-fontawesome';

Vue.config.productionTip = false
Vue.use(Toasted, {
  duration: 2000
});
Vue.use(Vuelidate);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
