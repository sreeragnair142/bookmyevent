import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

// material-ui
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
  useTheme,
  Popper
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import { useConfig } from 'contexts/ConfigContext';

// assets
import User1 from 'assets/images/users/user-round.svg';

// ✅ MUI Icons
import {
  Logout as LogoutIcon,
  Person as UserIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

export default function ProfileSection() {
  const theme = useTheme();
  const { borderRadius, mode } = useConfig();

  // Profile menu states
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    if (hour < 20) return 'Good Evening';
    return 'Good Night';
  };

  const greeting = getGreeting();

  const handleToggle = () => setOpen((prevOpen) => !prevOpen);
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }
    prevOpen.current = open;
  }, [open]);

  // Common hover style
  const hoverStyle = {
    borderRadius: `${borderRadius}px`,
    transition: 'background-color 0.2s ease, color 0.2s ease',
    '&:hover': {
      backgroundColor:
        mode === 'light'
          ? theme.palette.primary.light
          : theme.palette.primary.dark,
      '& .MuiTypography-root': {
        color:
          mode === 'light'
            ? theme.palette.primary.contrastText
            : theme.palette.common.white
      },
      '& .MuiListItemIcon-root': {
        color:
          mode === 'light'
            ? theme.palette.primary.contrastText
            : theme.palette.common.white
      }
    }
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      {/* Profile Chip */}
      <Chip
        sx={{
          ml: 2,
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          backgroundColor:
            mode === 'light'
              ? theme.palette.primary.light
              : theme.palette.dark.main,
          border: `1px solid ${
            mode === 'light'
              ? theme.palette.primary.main
              : theme.palette.darkTextPrimary
          }`,
          '& .MuiChip-label': { lineHeight: 0 }
        }}
        icon={
          <Avatar
            src={User1}
            alt="user"
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer'
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<SettingsIcon />}
        ref={anchorRef}
        onClick={handleToggle}
        color="primary"
        aria-label="account-settings"
      />

      {/* Profile Menu Popper */}
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[{ name: 'offset', options: { offset: [0, 14] } }]}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transitions in={open} {...TransitionProps}>
              <Paper>
                <MainCard
                  border={false}
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                >
                  <Box sx={{ p: 2, pb: 0 }}>
                    <Stack
                      spacing={0.5}
                      sx={{
                        pl: 2,
                        my: 2,
                        p: 1.5,
                        borderRadius: 1,
                        backgroundColor:
                          mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[800],
                        color:
                          mode === 'light'
                            ? theme.palette.text.primary
                            : theme.palette.grey[100]
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          color:
                            mode === 'light'
                              ? theme.palette.text.primary
                              : theme.palette.grey[100]
                        }}
                      >
                        {greeting},
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 400,
                          color:
                            mode === 'light'
                              ? theme.palette.primary.main
                              : theme.palette.primary.light
                        }}
                      >
                        Sabka Pro
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color:
                            mode === 'light'
                              ? theme.palette.text.secondary
                              : theme.palette.grey[300]
                        }}
                      >
                        Admin
                      </Typography>
                    </Stack>
                    <Divider />
                  </Box>

                  <Box
                    sx={{
                      p: 2,
                      pt: 0,
                      maxHeight: 'calc(100vh - 250px)',
                      overflowX: 'hidden',
                      '&::-webkit-scrollbar': { width: 5 }
                    }}
                  >
                    <List
                      component="nav"
                      sx={{
                        width: '100%',
                        maxWidth: 350,
                        minWidth: 300,
                        borderRadius: `${borderRadius}px`,
                        '& .MuiListItemButton-root': { mt: 0.5 }
                      }}
                    >
                      {/* Profile */}
                      <ListItemButton sx={hoverStyle}>
                        <ListItemIcon>
                          <UserIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={<Typography variant="body2">Profile</Typography>}
                        />
                      </ListItemButton>

                      {/* Logout */}
                      <ListItemButton sx={hoverStyle}>
                        <ListItemIcon>
                          <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={<Typography variant="body2">Logout</Typography>}
                        />
                      </ListItemButton>
                    </List>
                  </Box>
                </MainCard>
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>
    </Stack>
  );
}

ProfileSection.propTypes = { children: PropTypes.node };
