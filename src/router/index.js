import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import { plugins } from '../settings';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/options',
    name: 'Options',
    component: () => import('../views/Options'),
  },
];

plugins.forEach(({
  name, path, load, mainComponent, optionsComponent,
}) => {
  if (!load) return;
  routes.push({
    name,
    path,
    component: mainComponent,
  });

  routes.push({
    name: `${name}Options`,
    path: `${path}-options`,
    component: () => optionsComponent,
  });
});

console.info('routes :', routes, 'index.js@47');

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
