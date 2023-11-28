import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/Home.vue";
import LoginPage from "@/views/Login.vue";
import RegisterPage from '@/views/Register.vue'
import NotFound from "@/views/NotFound.vue";
import UserPage from '@/views/User.vue';
import CartPage from '@/views/CartPage.vue';
import CoinPage from '@/views/CoinPage.vue'
const routes = [
    {
        path: "/",
        name: "home",
        component: HomePage,
        meta: { requiresAuth: true }
    },
    {
        path: "/user",
        name: "user",
        component: UserPage,
        meta: { requiresAuth: true }
    },
    {
        path: "/login",
        name: "login",
        component: LoginPage,
    },
    {
        path: "/coin",
        name: "coin",
        component: CoinPage,
    },
    {
        path: "/cart",
        name: "cart",
        component: CartPage,
    },
    {
        path: "/register",
        name: "register",
        component: RegisterPage,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem("adminToken");
    if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
        next({ name: "login" });
    } else {
        next();
    }
});

export default router;
