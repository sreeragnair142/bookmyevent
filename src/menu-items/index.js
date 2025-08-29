// import dashboard from './auditorium/dashboard';
// import Promotionmgt from './CRM/promotionmanagement';
// import Providermgt from './CRM/Providermanagement';
// import tripmanagemet from './CRM/tripmanagment';
// import vehiclemgt from './CRM/vehiclemanagement';
// import pages from './pages';


// const menuItems = {
//   items: [dashboard, tripmanagemet,Promotionmgt,vehiclemgt,Providermgt,pages]
// };

// export default menuItems;
// Import all your menu modules
import dashboard from './auditorium/dashboard';
import Promotionmgt from './CRM/promotionmanagement';
import Providermgt from './CRM/Providermanagement';
import tripmanagemet from './CRM/tripmanagment';
import vehiclemgt from './CRM/vehiclemanagement';
import pages from './pages';
// import utilities from './utilities';
// import other from './other';
import auditoriummanagement from './auditorium/auditoriummanagement';
import customers from './auditorium/auditoriummanagement';
import bookings from './auditorium/vehiclemanagement';
import Providermanagement from './auditorium/providermanagement';
import management from './auditorium/management';

// ==============================|| DYNAMIC MENU ITEMS ||============================== //

// Define menu items for each module
const moduleMenuItems = {
  crm: {
    items: [tripmanagemet, Promotionmgt, vehiclemgt, Providermgt, pages]
  },
  
  rental: {
    items: [tripmanagemet, Promotionmgt, vehiclemgt, Providermgt, pages]
  },
  
  events: {
    items: [tripmanagemet, Promotionmgt, vehiclemgt, Providermgt, pages]
  },
  
  auditorium: {
    items: [dashboard,management,auditoriummanagement,Providermanagement, pages] 
  }
};

// Function to get menu items based on active module
export const getMenuItemsByModule = (moduleType = 'crm') => {
  return moduleMenuItems[moduleType] || moduleMenuItems.crm;
};

// Function to get current active module from localStorage
export const getCurrentModule = () => {
  return localStorage.getItem('activeModule') || 'crm';
};

// Default export for backward compatibility
const menuItems = getMenuItemsByModule(getCurrentModule());

export default menuItems;