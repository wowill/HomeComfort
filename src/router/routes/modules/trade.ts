import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/trade',
  name: 'Trade',
  component: LAYOUT,
  redirect: '/trade/records',
  meta: {
    hideChildrenInMenu: true,
    icon: 'icon-park-outline:sales-report',
    title: t('routes.trade.tradeList.title'),
    orderNo: 100,
  },
  children: [
    {
      path: 'records',
      name: 'records',
      component: () => import('/@/views/trade/Records.vue'),
      meta: {
        title: t('routes.trade.tradeList.title'),
        // icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
    {
      path: 'newRecord',
      name: 'newRecord',
      component: () => import('/@/views/trade/NewRecord.vue'),
      meta: {
        title: t('routes.trade.newTrade.title'),
        // icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
    {
      path: 'record/:id',
      name: 'editRecord',
      component: () => import('/@/views/trade/NewRecord.vue'),
      meta: {
        title: t('routes.trade.editTrade.title'),
        // icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
