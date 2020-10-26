import Vue from 'vue'
import App from './App.vue'

import './skeleton.css'
import './global.css'

Vue.config.productionTip = false

new Vue({
	render: h => h(App),
}).$mount('#app')
