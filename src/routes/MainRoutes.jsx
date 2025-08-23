import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// Pages
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));
const Statistics = Loadable(lazy(() => import('../views/statistics')));
const PageNotFound = Loadable(lazy(() => import('../views/PageNotFound')));
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// Promotions
const Banners = Loadable(lazy(() => import('../views/Banner')));
const Coupons = Loadable(lazy(() => import('../views/Coupons')));
const PushNotification = Loadable(lazy(() => import('../views/Pushnotifications')));

// Providers
const NewProvider = Loadable(lazy(() => import('../views/Newprovider')));
const AddProvider = Loadable(lazy(() => import('../views/Addprovider')));
const ProviderList = Loadable(lazy(() => import('../views/Providerslist')));
const EditList = Loadable(lazy(() => import('../views/Editlist')));

// Vehicles - Category
const Category = Loadable(lazy(() => import('../views/Category')));
const EditCategory = Loadable(lazy(() => import('../views/EditCategory')));


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

    // Promotions
    { path: 'promotions/Banners', element: <Banners /> },
    { path: 'promotions/Coupons', element: <Coupons /> },
    { path: 'promotions/PushNotification', element: <PushNotification /> },

    // Providers
    { path: 'providers/new', element: <NewProvider /> },
    { path: 'providers/add', element: <AddProvider /> },
    { path: 'providers/list', element: <ProviderList /> },
    { path: 'providers/edit', element: <EditList /> },

    // Vehicles - Category
    { path: 'vehicles/category', element: <Category /> },
    { path: 'vehicles/category/edit/:id', element: <EditCategory /> }, // <-- ✅ add comma here

   
  ]
};

export default MainRoutes;
