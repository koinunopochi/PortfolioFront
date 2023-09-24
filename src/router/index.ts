import { createRouter, createWebHistory } from 'vue-router';
import IndexView from '../views/IndexView.vue';
import ProjectsViewVue from '@/views/ProjectsView.vue';
import AutoPic from '@/views/projects/AutoPic.vue';
import NotFound from '@/views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IndexView,
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsViewVue,
    },
    {
      path: '/projects/auto-pic',
      name: 'auto-pic',
      component: AutoPic,
    },
    {
      path: '/about-me',
      name: 'about-me',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutMe.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
  ],
});

export default router;
