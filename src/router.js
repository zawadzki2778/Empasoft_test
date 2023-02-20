import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: () => import("./pages/InputForm.vue"),
    },
    {
        path: "/UserTable",
        name: "UserTable",
        component: () => import("./pages/UserTable.vue"),
    },
];

export default new VueRouter({
    mode: "history",
    routes,
});
