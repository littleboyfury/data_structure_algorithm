import Vue from 'vue'
//路由
import router from './router'

import graph from './page/util/graph'

//引入ElementUI 的组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'

// 导入ElementUI组件系列组件
Vue.use(ElementUI)

Vue.prototype.graph = graph;


Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app');
