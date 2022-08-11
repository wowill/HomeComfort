import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/broker',
  name: 'Broker',
  component: LAYOUT,
  redirect: '/broker/list',
  meta: {
    icon: 'bxs:group',
    title: t('routes.broker.list.title'),
    orderNo: 120,
  },
  children: [
    {
      path: 'list',
      name: 'brokerList',
      component: () => import('/@/views/broker/BrokerList.vue'),
      meta: {
        title: t('routes.broker.list.title'),
        // icon: 'simple-icons:about-dot-me',
      },
    },
    {
      path: 'newBroker',
      name: 'newBroker',
      component: () => import('/@/views/broker/NewBroker.vue'),
      meta: {
        title: t('routes.broker.newBroker.title'),
        // icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
    {
      path: 'broker/:id',
      name: 'editBroker',
      component: () => import('/@/views/broker/NewBroker.vue'),
      meta: {
        title: t('routes.broker.editBroker.title'),
        // icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
    {
      path: 'rule',
      name: 'commissionRule',
      component: () => import('/@/views/broker/CommissionRule.vue'),
      meta: {
        title: t('routes.broker.rule.title'),
        // icon: 'simple-icons:about-dot-me',
        // hideMenu: true,
      },
    },
    {
      path: 'teamList',
      name: 'teamList',
      component: () => import('/@/views/broker/TeamList.vue'),
      meta: {
        title: t('routes.broker.teamList.title'),
        // icon: 'simple-icons:about-dot-me',
      },
    },
  ],
};

export default dashboard;
