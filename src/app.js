import Vue from 'vue';
import App from './components/app.vue';
import TabComponent from './components/Tab';
Vue.use(TabComponent);
const app = new Vue({
    components: {
        App
    }
}).$mount('#app');