import Login from "@/pages/Login";
import Chat from "@/pages/Chat";
import VueRouter from "vue-router";
import {store} from "@/store";

const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/',
        component: Chat,
        meta: {
            requiresAuth: true
        }
    }
];

export const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})