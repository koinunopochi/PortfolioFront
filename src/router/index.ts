import { createRouter, createWebHistory } from 'vue-router';
import IndexView from '../views/IndexView.vue';
import NotFound from '@/views/NotFound.vue';
// import UnderConstructionVue from '@/views/UnderConstruction.vue';
import LoginView from '@/views/auth/LoginView.vue';

import { refresh } from '@/utils/submit';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // component: UnderConstructionVue,
      component: IndexView,
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
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/project-blog',
      name: 'project-blog-index',
      component: () => import('../views/BlogIndex.vue'),
    },
    {
      path: '/project-blog/:id',
      name: 'project-blog',
      component: () => import('../views/BlogView.vue'),
    },
    {
      path: '/project-blog/post',
      name: 'project-blog-post',
      component: () => import('../views/BlogPost.vue'),
    },
    {
      path:"/contact",
      name:"contact",
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  // 'login'と'not-found'ルートではガードをバイパス
  if (to.name === 'login' || to.name === 'not-found') {
    return next();
  }

  try {
    // refresh関数の呼び出し
    const successfulRefresh = await refresh();
    // refreshが成功した場合、通常通りルートにナビゲート
    if (successfulRefresh) return next();
  } catch (error) {
    console.error(error);
    // エラーが発生した場合、ログインページにリダイレクト
    return next({ name: 'login' });
  }
});

export default router;
