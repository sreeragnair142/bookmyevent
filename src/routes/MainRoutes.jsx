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

// push notification routing
const PushNotification = Loadable(lazy(() => import('../views/Pushnotifications')));

// provider management routing
const NewProvider = Loadable(lazy(() => import('../views/Newprovider')));
const AddProvider = Loadable(lazy(() => import('../views/Addprovider')));
const ProviderList = Loadable(lazy(() => import('../views/Providerslist')));
const EditList = Loadable(lazy(() => import('../views/Editlist'))); // <-- Edit page route

// vehicle management routing (ONLY CATEGORY)
const Category = Loadable(lazy(() => import('../views/Category')));

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
    { path: 'promotions/Coupons', element: <Coupons /> },

    // Push Notification route
    { path: 'promotions/PushNotification', element: <PushNotification /> },

    // Provider routes
    { path: 'providers/new', element: <NewProvider /> },
    { path: 'providers/add', element: <AddProvider /> },
    { path: 'providers/list', element: <ProviderList /> },
    { path: 'providers/edit', element: <EditList /> },

    // Vehicle category route
    { path: 'vehicles/category', element: <Category /> }
  ]
};

export default MainRoutes;
