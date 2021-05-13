import Vue from 'vue';
import VueRouter from 'vue-router';
import dashboard from '../views/Dashboard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    component: dashboard,
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
      },
      {
        path: 'materialy',
        component: () => import(/* webpackChunkName: "Materials" */ '../views/Materials.vue'),
      },
      {
        path: 'dodaj',
        component: () => import(/* webpackChunkName: "AddContent" */ '../views/AddContent.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
