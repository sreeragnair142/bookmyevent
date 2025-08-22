import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';

// project imports
import LogoSection from '../LogoSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

// icons
import { IconMenu2, IconHome, IconBuildingSkyscraper, IconCalendarEvent } from '@tabler/icons-react';

export default function Header() {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Menu items
  const menuItems = [
    { label: 'Rental', icon: <IconBuildingSkyscraper size={24} color="#1976d2" /> },
    { label: 'Events', icon: <IconCalendarEvent size={24} color="#1976d2" /> },
    { label: 'Hotel', icon: <IconHome size={24} color="#1976d2" /> },
  ];

  return (
    <>
      {/* Logo & toggler */}
      <Box sx={{ width: downMD ? 'auto' : 228, display: 'flex', alignItems: 'center' }}>
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            overflow: 'hidden',
            transition: 'all .2s ease-in-out',
            bgcolor: 'secondary.light',
            color: 'secondary.dark',
            '&:hover': { bgcolor: 'secondary.dark', color: 'secondary.light' },
          }}
          onClick={() => handlerDrawerOpen(!drawerOpen)}
          color="inherit"
        >
          <IconMenu2 stroke={1.5} size="20px" />
        </Avatar>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      {/* Demo Module + horizontal dropdown */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Demo Module Button */}
        <Button
          variant="contained"
          size="large"
          sx={{ textTransform: 'none', borderRadius: '50px', px: 3, py: 1.5, fontSize: '1rem' }}
          onClick={handleClick}
        >
          Demo Module
        </Button>

        {/* Horizontal dropdown menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          sx={{ p: 1 }}
        >
          <Box sx={{ display: 'flex', gap: 2, px: 1, py: 1, backgroundColor: '#fff' }}>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                onClick={handleClose}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#fff',
                  color: '#1976d2',
                  borderRadius: '12px',
                  px: 3,
                  py: 2,
                  minWidth: 100,
                  fontSize: '0.95rem',
                  border: '1px solid #e0e0e0',
                  '&:hover': { bgcolor: '#f5f5f5' },
                }}
              >
                <ListItemIcon sx={{ justifyContent: 'center', color: '#1976d2', minWidth: 0 }}>
                  {item.icon}
                </ListItemIcon>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  {item.label}
                </Typography>
              </Button>
            ))}
          </Box>
        </Menu>

        <NotificationSection />
        <ProfileSection />
      </Box>
    </>
  );
}
