import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
import VueRouter from 'vue-router'
import App from './App.vue'

import {store} from './store'
import {router} from './router'

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(
    VueNativeSock,
    'ws://pm.tada.team/ws?name=guest',
    {
        connectManually: true,
        store: store,
        format: 'json',
        reconnection: true,
        reconnectionAttempts: 30,
    }
)
Vue.component('v-icon', Icon);

new Vue({
    store,
    router,
    VueNativeSock,
    render: h => h(App),
}).$mount('#app')

