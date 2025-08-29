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

// Auditorium Components (using your audiviews folder)
const AuditoriumDashboard = Loadable(lazy(() => import('../audiviews/dashboard/index')));
const Auditoriumcoupons = Loadable(lazy(() => import('../audiviews/coupons')));
const Auditoriumbanner = Loadable(lazy(() => import('../audiviews/Banner')));
const AuditoriumPushnotifications = Loadable(lazy(() => import('../audiviews/Pushnotifications')));
const Auditoriumcategory = Loadable(lazy(() => import('../audiviews/category')));
const Auditoriumnewprovidersrequest = Loadable(lazy(() => import('../audiviews/Newprovider')));
const Auditoriumaddprovider = Loadable(lazy(() => import('../audiviews/Addprovider')));
const Auditoriumproviderlist = Loadable(lazy(() => import('../audiviews/Providerslist')));







// For now, we'll use the default dashboard for rental and events until you create specific ones
// const RentalDashboard = Loadable(lazy(() => import('../views/rental/Dashboard')));
// const EventsDashboard = Loadable(lazy(() => import('../views/events/Dashboard')));

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
    { path: 'vehicles/category/edit/:id', element: <EditCategory /> }, 

    // Auditorium Routes
        { path: 'auditorium/dashboard', element: <AuditoriumDashboard /> },

    { path: 'auditorium/banner', element: <Auditoriumbanner /> },
    { path: 'auditorium/coupons', element: <Auditoriumcoupons /> },
    { path: 'auditorium/pushnotifications', element: <AuditoriumPushnotifications /> },
    { path: 'auditorium/category', element: <Auditoriumcategory /> },
    { path: 'auditorium/provider', element: <Auditoriumnewprovidersrequest /> },
    { path: 'auditorium/addprovider', element: <Auditoriumaddprovider /> },
        { path: 'auditorium/providerslist', element: <Auditoriumaddprovider /> },






 

    { path: 'rental/dashboard', element: <DashboardDefault /> },

    { path: 'events/dashboard', element: <DashboardDefault /> },
  ]
};

export default MainRoutes;