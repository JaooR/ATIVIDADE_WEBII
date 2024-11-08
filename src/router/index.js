import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    redirect: '/home'  // Redireciona a raiz "/" para "/home"
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView 
  },
  {
    path: '/PAGINA2',
    name: 'PAGINA2',
    // Código para dividir em nível de rota
    // Isso gera um chunk separado para esta rota
    // que é carregado de forma lazy quando a rota é visitada
    component: () => import(/* webpackChunkName: "about" */ '../views/PAGINA2.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
