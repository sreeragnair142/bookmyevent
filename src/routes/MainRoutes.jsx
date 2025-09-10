import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
// import Createnew from '../views/Createnew';
// import Completed from '../views/Completed';
// import AllTrips from '../views/Alltrips';

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
const AllTrips = Loadable(lazy(() => import('../views/Alltrips')));
const Scheduled = Loadable(lazy(() => import('../views/Scheduled')));
const Pending = Loadable(lazy(() => import('../views/Pending')));
const Confirmed = Loadable(lazy(() => import('../views/Confirmed')));
const Ongoing = Loadable(lazy(() => import('../views/Ongoing')));
const Completed = Loadable(lazy(() => import('../views/Completed')));
const Cancelled = Loadable(lazy(() => import('../views/Cancelled')));
const Paymentfailed = Loadable(lazy(() => import('../views/Paymentfailed')));
const Createnew = Loadable(lazy(() => import('../views/Createnew')));
const Vehiclelist = Loadable(lazy(() => import('../views/Vehiclelist')));



const Brands = Loadable(lazy(() => import('../views/Brands')));



// Bookings
const Allbookings = Loadable(lazy(() => import('../audiviews/Allbookings')));
const Scheduledbookings = Loadable(lazy(() => import('../audiviews/Scheduledbookings')));
const Pendingbookings = Loadable(lazy(() => import('../audiviews/Pendingbookings')));
const Confirmedbookings = Loadable(lazy(() => import('../audiviews/Confirmedbookings')));
const Ongoingbookings = Loadable(lazy(() => import('../audiviews/Ongoingbookings')));
const Completedbookings = Loadable(lazy(() => import('../audiviews/Completedbookings')));
const Cancelledbookings = Loadable(lazy(() => import('../audiviews/Cancelledbookings')));
const Paymentfailedbookings = Loadable(lazy(() => import('../audiviews/Paymentfailedbookings')));

















// Auditorium Components (using your audiviews folder)
const AuditoriumDashboard = Loadable(lazy(() => import('../audiviews/dashboard/index')));
const Auditoriumcoupons = Loadable(lazy(() => import('../audiviews/coupons')));
const Auditoriumbanner = Loadable(lazy(() => import('../audiviews/Banner')));
const AuditoriumPushnotifications = Loadable(lazy(() => import('../audiviews/Pushnotifications')));
const Auditoriumcategory = Loadable(lazy(() => import('../audiviews/Audicategory')));
const Auditoriumnewprovidersrequest = Loadable(lazy(() => import('../audiviews/Newprovider')));
const Auditoriumaddprovider = Loadable(lazy(() => import('../audiviews/Addprovider')));
const Auditoriumlist = Loadable(lazy(() => import('../audiviews/Auditoriumlist')));
const Createauditorium = Loadable(lazy(() => import('../audiviews/Createauditorium')));
const Venuelist = Loadable(lazy(() => import('../audiviews/Venuelist')));
const Auditoriumbrands = Loadable(lazy(() => import('../audiviews/Auditoriumbrands')));










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

    // Trips

{ path: 'trips/alltrips', element: <AllTrips /> },
{ path: 'trips/scheduled', element: <Scheduled /> },
{ path: 'trips/pending', element: <Pending /> },
{ path: 'trips/confirmed', element: <Confirmed /> },
{ path: 'trips/ongoing', element: <Ongoing /> },
{ path: 'trips/completed', element: <Completed /> },
{ path: 'trips/cancelled', element: <Cancelled /> },
{ path: 'trips/paymentfailed', element: <Paymentfailed /> },

// { path: '/vehicles/create', element: <Createnew /> },


// Bookingssss

{ path: 'bookings/all', element: <Allbookings /> },
{ path: 'bookings/scheduled', element: <Scheduledbookings /> },
{ path: 'bookings/Pending', element: <Pendingbookings /> },
{ path: 'bookings/confirmed', element: <Confirmedbookings /> },
{ path: 'bookings/ongoing', element: <Ongoingbookings /> },
{ path: 'bookings/completed', element: <Completedbookings /> },
{ path: 'bookings/cancelled', element: <Cancelledbookings /> },
{ path: 'bookings/paymentfailedbookings', element: <Paymentfailedbookings /> },





  // Vehicles - Category
    { path: 'vehicles/category', element: <Category /> },
    { path: 'vehicles/category/edit/:id', element: <EditCategory /> }, 
    { path: 'vehicles/create', element: <Createnew /> },
    { path: 'vehicles/list', element: <Vehiclelist /> },
        { path: 'vehicles/brands', element: < Brands/> },





    // Auditorium Routes
    { path: 'auditorium/dashboard', element: <AuditoriumDashboard /> },
    { path: 'auditorium/banner', element: <Auditoriumbanner /> },
    { path: 'auditorium/coupons', element: <Auditoriumcoupons /> },
    { path: 'auditorium/pushnotifications', element: <AuditoriumPushnotifications /> },
    { path: 'auditorium/category', element: <Auditoriumcategory /> },
    { path: 'auditorium/provider', element: <Auditoriumnewprovidersrequest /> },
    { path: 'auditorium/addprovider', element: <Auditoriumaddprovider /> },
    { path: 'auditorium/auditoriumlist', element: <Auditoriumlist /> },
    { path: 'auditorium/create', element: <Createauditorium /> },
        { path: 'auditorium/venuelist', element: <Venuelist /> },

        { path: 'auditorium/brands', element: <Auditoriumbrands /> },





 

    { path: 'rental/dashboard', element: <DashboardDefault /> },

    { path: 'events/dashboard', element: <DashboardDefault /> },
  ]
};

export default MainRoutes;


