import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import { loadStyle } from './utils'
import { iconfontUrl, iconfontVersion } from '@/config'
import EventBus from '@/utils/event-bus';
import Element from 'element-ui'
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css
import './permission' // permission control
import './icons' // icon
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }
// 动态加载阿里云字体库
iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace('$key', ele))
})
Vue.config.productionTip = false;
Vue.use(EventBus) // 总线
Vue.use(Element)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
