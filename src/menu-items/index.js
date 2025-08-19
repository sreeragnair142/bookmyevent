import dashboard from './CRM/dashboard';
import Promotionmgt from './CRM/promotionmanagement';
import Providermgt from './CRM/Providermanagement';
import tripmanagemet from './CRM/tripmanagment';
import vehiclemgt from './CRM/vehiclemanagement';
// import pages from './pages';
// import utilities from './utilities';
// import other from './other';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, tripmanagemet,Promotionmgt,vehiclemgt,Providermgt]
  // items: [dashboard, pages, utilities, other]
};

export default menuItems;
