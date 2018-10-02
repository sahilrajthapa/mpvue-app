import Vue from 'vue'
import App from './index'
import store from '../../store'
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

const app = new Vue({
    store,    
    ...App
})

app.$mount();