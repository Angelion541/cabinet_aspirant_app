import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthView.vue'
import { routePathKeys } from '../data/routePathKeys.js'
import { roleKeys } from '@/data/roleKeys';

const routes = [
  {
    path: routePathKeys.home,
    name: 'home',
    component: AuthView,
  },
  {
    path: `/${routePathKeys.cabinet}`,
    name: 'cabinet',
    children: [
      {
        path: `/${routePathKeys.student}`,
        meta: {
          requiresAuth: true,
          role: roleKeys.student
        },
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/cabinets/StudentView.vue'),

      },
      {
        path: `/${routePathKeys.deanery}`,
        meta: {
          requiresAuth: true,
          role: roleKeys.dean
        },
        component: () => import('../views/cabinets/DeaneryView.vue'),
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
