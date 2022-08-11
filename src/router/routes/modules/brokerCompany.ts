import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/company',
  name: 'BrokerCompany',
  component: LAYOUT,
  redirect: '/company/list',
  meta: {
    hideChildrenInMenu: true,
    icon: 'octicon:organization-24',
    title: t('routes.brokerCompany.list.title'),
    orderNo: 140,
  },
  children: [
    {
      path: 'list',
      name: 'companyList',
      component: () => import('/@/views/brokerCompany/BrokerCompanyList.vue'),
      meta: {
        title: t('routes.brokerCompany.list.title'),
        // icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
    {
      path: 'company/:id',
      name: 'editBrokerCompany',
      component: () => import('/@/views/brokerCompany/EditBrokerCompany.vue'),
      meta: {
        title: t('routes.brokerCompany.editBrokerCompany.title'),
        // icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
