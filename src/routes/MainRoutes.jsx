import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));
const Statistics = Loadable(lazy(() => import('../views/statistics')));
const PageNotFound = Loadable(lazy(() => import('../views/PageNotFound')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// banner routing
const Banners = Loadable(lazy(() => import('../views/Banner')));

// coupons routing
const Coupons = Loadable(lazy(() => import('../views/Coupons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    { path: '/', element: <DashboardDefault /> },
    { path: '*', element: <PageNotFound /> },
    { path: 'dashboard', element: <DashboardDefault /> },
    { path: 'statistics', element: <Statistics /> },
    { path: 'typography', element: <UtilsTypography /> },
    { path: 'color', element: <UtilsColor /> },
    { path: 'shadow', element: <UtilsShadow /> },
    { path: 'sample-page', element: <SamplePage /> },

    // Banner route
    { path: 'promotions/Banners', element: <Banners /> },

    // Coupon route
    { path: 'promotions/Coupons', element: <Coupons /> }
  ]
};

export default MainRoutes;
