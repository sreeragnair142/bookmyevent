// menu-items/auditorium/customers.js
import {
  IconUsers,
  IconUserPlus,
  IconUserCheck,
  IconCategory,
  IconTrademark,
  IconBuilding,
  IconPlus,
  IconList,
  IconClipboardCheck,
  IconUpload,
  IconDownload,
  IconCalendarTime
} from '@tabler/icons-react';

const icons = {
  IconUsers,
  IconUserPlus,
  IconUserCheck,
  IconCategory,
  IconTrademark,
  IconBuilding,
  IconPlus,
  IconList,
  IconClipboardCheck,
  IconUpload,
  IconDownload,
  IconCalendarTime
};

const auditoriumsections = {
  id: 'auditorium-customers',
  title: 'Auditoriumsections',
  type: 'group',
  children: [
    {
      id: 'auditorium-category',
      title: 'Category',
      type: 'item',
      url: '/auditorium/category',
      icon: icons.IconCategory,
      breadcrumbs: false
    },
    {
      id: 'auditorium-brands',
      title: 'Brands',
      type: 'item',
      url: '/auditorium/brands',
      icon: icons.IconTrademark,
      breadcrumbs: false
    },
    {
      id: 'Auditorium-Setup',
      title: 'Auditorium Setup',
      type: 'collapse',
      icon: icons.IconBuilding, // Auditorium setup icon
      children: [
        {
          id: 'create-auditorium',
          title: 'Create New',
          type: 'item',
          url: '/auditorium/create',
          icon: icons.IconPlus
        },
        {
          id: 'auditorium-list',
          title: 'List',
          type: 'item',
          url: '/auditorium/venuelist',
          icon: icons.IconList
        },
        {
          id: 'auditorium-review',
          title: 'Review',
          type: 'item',
          url: '/auditorium/review',
          icon: icons.IconClipboardCheck
        },
        {
          id: 'bulk-import-auditorium',
          title: 'Bulk Import',
          type: 'item',
          url: '/auditorium/import',
          icon: icons.IconUpload
        },
        {
          id: 'ongoing-auditorium',
          title: 'Ongoing',
          type: 'item',
          url: '/auditorium/ongoing',
          icon: icons.IconCalendarTime
        },
        {
          id: 'bulk-export-auditorium',
          title: 'Bulk Export',
          type: 'item',
          url: '/auditorium/export',
          icon: icons.IconDownload
        }
      ]
    }
  ]
};

export default auditoriumsections;
