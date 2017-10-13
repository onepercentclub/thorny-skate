import Vue from 'vue';
import Router from 'vue-router';

import Canceled from '@/components/Canceled';
import Order from '@/components/Order';
import PaymentMethod from '@/components/PaymentMethod';
import Project from '@/components/Project';
import Success from '@/components/Success';

Vue.use(Router);

export default new Router({
  routes: [
    {
      component: Canceled,
      name: 'Canceled',
      path: '/canceled',
    },

    {
      component: Order,
      name: 'Order',
      path: '/',
    },

    {
      component: PaymentMethod,
      name: 'PaymentMethod',
      path: '/paymentmethod',
    },

    {
      component: Project,
      name: 'Project',
      path: '/project',
    },

    {
      component: Success,
      name: 'Success',
      path: '/success',
    },
  ],
});
