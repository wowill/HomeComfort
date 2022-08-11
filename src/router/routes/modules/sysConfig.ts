import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/sysConfig',
  name: 'SysConfig',
  component: LAYOUT,
  redirect: '/sysConfig/account',
  meta: {
    icon: 'icon-park-outline:setting-config',
    title: t('routes.sysConfig.title'),
    orderNo: 200,
  },
  children: [
    {
      path: 'account',
      name: 'account',
      component: () => import('/@/views/sysConfig/Account.vue'),
      meta: {
        title: t('routes.sysConfig.account.title'),
        icon: 'carbon:user-multiple',
      },
    },
    {
      path: 'role',
      name: 'role',
      component: () => import('/@/views/sysConfig/Role.vue'),
      meta: {
        title: t('routes.sysConfig.role.title'),
        icon: 'academicons:open-access',
      },
    },
    {
      path: 'api',
      name: 'api',
      component: () => import('/@/views/sysConfig/ApiConfig.vue'),
      meta: {
        title: t('routes.sysConfig.api.title'),
        icon: 'ant-design:api-outlined',
      },
    },
    {
      path: 'banner',
      name: 'banner',
      component: () => import('/@/views/sysConfig/BannerConfig.vue'),
      meta: {
        title: t('routes.sysConfig.banner.title'),
        icon: 'clarity:picture-line',
      },
    },
    {
      path: 'customers',
      name: 'customers',
      component: () => import('/@/views/sysConfig/Customers.vue'),
      meta: {
        title: t('routes.sysConfig.customers.title'),
        icon: 'ph:address-book',
      },
    },
    {
      path: 'lawyer',
      name: 'lawyer',
      component: () => import('/@/views/sysConfig/Lawyers.vue'),
      meta: {
        title: t('routes.sysConfig.lawyer.title'),
        icon: 'raphael:customer',
      },
    },
    {
      path: 'tradeRule',
      name: 'tradeRule',
      component: () => import('/@/views/sysConfig/TradeRule.vue'),
      meta: {
        title: t('routes.sysConfig.tradeRule.title'),
        icon: 'eos-icons:replica-set',
      },
    },
  ],
};

export default dashboard;
