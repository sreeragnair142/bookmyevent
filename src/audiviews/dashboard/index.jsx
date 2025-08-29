// src/audiviews/dashboard.js
import React, { useEffect } from 'react';
import { Box, Grid, Typography, Card, CardContent, Paper, Button } from '@mui/material';
import { IconHome, IconCalendar, IconUsers, IconTrendingUp, IconPlus, IconReport, IconCalendarEvent, IconSettings } from '@tabler/icons-react';

// Stats Card Component
const StatsCard = ({ title, value, icon, gradient }) => (
  <Card
    sx={{
      minHeight: 120, // reduced card height
      borderRadius: 3,
      boxShadow: 3,
      '&:hover': { boxShadow: 6 }
    }}
  >
    <CardContent sx={{ p: 2 }}> {/* reduced padding */}
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>
            {value}
          </Typography>
        </Grid>
        <Grid item>
          <Box
            sx={{
              background: gradient,
              height: 48, // smaller icon box
              width: 48,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: 2
            }}
          >
            {icon}
          </Box>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

const AuditoriumDashboard = () => {
  useEffect(() => {
    localStorage.setItem('activeModule', 'auditorium');
    localStorage.setItem('sidebarType', 'auditorium');
    window.dispatchEvent(new CustomEvent('moduleChanged', { detail: { module: 'auditorium' } }));
    window.dispatchEvent(new CustomEvent('sidebarTypeChanged', { detail: { sidebarType: 'auditorium' } }));
    window.dispatchEvent(new CustomEvent('refreshSidebar'));
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          🎭 Auditorium Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage bookings, events, and facilities efficiently
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Bookings"
            value="45"
            icon={<IconCalendar size={26} />}
            gradient="linear-gradient(135deg, #42a5f5, #1e88e5)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Active Events"
            value="12"
            icon={<IconHome size={26} />}
            gradient="linear-gradient(135deg, #66bb6a, #43a047)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Guests"
            value="1,248"
            icon={<IconUsers size={26} />}
            gradient="linear-gradient(135deg, #ffb74d, #f57c00)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Revenue"
            value="₹2,45,000"
            icon={<IconTrendingUp size={26} />}
            gradient="linear-gradient(135deg, #ef5350, #c62828)"
          />
        </Grid>

        {/* Recent Bookings */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Recent Bookings
              </Typography>
              <Paper sx={{ p: 2, mt: 2, borderRadius: 2, bgcolor: '#fafafa' }}>
                <Typography variant="body2" color="text.secondary">
                  ✅ Wedding – Confirmed
                  <br />
                  ⏳ Conference – Pending Approval
                  <br />
                  ❌ Music Concert – Cancelled
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Events */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Upcoming Events
              </Typography>
              <Paper sx={{ p: 2, mt: 2, borderRadius: 2, bgcolor: '#fafafa' }}>
                <Typography variant="body2" color="text.secondary">
                  🎉 Wedding Reception – Tomorrow 6 PM
                  <br />
                  📊 Corporate Meeting – Dec 28, 2 PM
                  <br />
                  🏢 Conference – Dec 30, 9 AM
                  <br />
                  🎭 Cultural Program – Jan 2, 7 PM
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Grid>

        {/* Facility Status */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Facility Status
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {[
                  { name: 'Audio System', status: 'Active', color: '#43a047' },
                  { name: 'Lighting', status: 'Operational', color: '#43a047' },
                  { name: 'Air Conditioning', status: 'Running', color: '#43a047' },
                  { name: 'Projector', status: 'Under Maintenance', color: '#f57c00' }
                ].map((facility, idx) => (
                  <Grid item xs={12} sm={6} md={3} key={idx}>
                    <Paper sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: facility.color }}>
                        {facility.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {facility.status}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
                <Button variant="contained" startIcon={<IconPlus />} sx={{ borderRadius: 2 }}>
                  New Booking
                </Button>
                <Button variant="outlined" startIcon={<IconCalendarEvent />} sx={{ borderRadius: 2 }}>
                  View Calendar
                </Button>
                <Button variant="outlined" startIcon={<IconSettings />} sx={{ borderRadius: 2 }}>
                  Manage Events
                </Button>
                <Button variant="outlined" startIcon={<IconReport />} sx={{ borderRadius: 2 }}>
                  Generate Report
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuditoriumDashboard;
