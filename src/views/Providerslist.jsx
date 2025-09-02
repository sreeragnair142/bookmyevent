import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer,
  Switch, IconButton, Box, TextField, MenuItem, InputAdornment, Button, Menu,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography,
  Snackbar, Alert, CircularProgress
} from '@mui/material';
import { VisibilityOutlined, Edit, Delete, Download } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const ProvidersList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [providers, setProviders] = useState([]);
  const [selectedZone, setSelectedZone] = useState('All Zones');
  const [searchTerm, setSearchTerm] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [providerToDelete, setProviderToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Retrieve token (assuming it's stored in localStorage; adjust based on your auth system)
  const token = localStorage.getItem('token'); // Replace with your token retrieval logic if different

  useEffect(() => {
    fetchProviders();
    // Handle updated provider from EditList
    if (location.state?.updatedProvider) {
      const updatedProvider = location.state.updatedProvider;
      setProviders((prev) =>
        prev.map((provider) =>
          provider.id === updatedProvider.id
            ? {
                ...provider,
                ...updatedProvider,
                storeInfo: updatedProvider.storeName,
                ownerInfo: `${updatedProvider.ownerFirstName || ''} ${updatedProvider.ownerLastName || ''} (${updatedProvider.ownerPhone || 'N/A'})`,
                zone: zones.find((zone) => zone._id === updatedProvider.zone)?.name || 'N/A',
              }
            : provider
        )
      );
      setNotification({
        open: true,
        message: 'Provider updated successfully!',
        severity: 'success',
      });
    }
  }, [location.state]);

  // Fetch zones to map zone IDs to names
  const [zones, setZones] = useState([]);
  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/zones`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : '', // Include token for authentication
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setZones(data.data.zones || data.data || []);
        } else {
          throw new Error(data.message || 'Failed to fetch zones');
        }
      } catch (error) {
        console.error('Error fetching zones:', error);
        setZones([
          { _id: '1', name: 'Downtown Zone' },
          { _id: '2', name: 'North Zone' },
          { _id: '3', name: 'South Zone' },
          { _id: '4', name: 'East Zone' },
          { _id: '5', name: 'West Zone' },
          { _id: '6', name: 'Airport Zone' },
          { _id: '7', name: 'Industrial Zone' },
        ]);
      }
    };
    fetchZones();
  }, []);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/providers`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '', // Include token for authentication
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.success) {
        const providersData = data.data.providers || [];
        const mappedProviders = providersData.map((provider, index) => ({
          id: index + 1, // just serial number for UI
          _id: provider._id, // real database id
          storeInfo: provider.storeName || 'Unknown Store',
          ownerInfo: `${provider.ownerFirstName || ''} ${provider.ownerLastName || ''} (${provider.ownerPhone || 'N/A'})`,
          zone: provider.zone?.name || 'N/A',
          zoneId: provider.zone?._id || '',
          featured: provider.featured || false,
          status: provider.status || false,
          storeName: provider.storeName || '',
          storeAddress: provider.storeAddress || '',
          minimumDeliveryTime: provider.minimumDeliveryTime || '',
          maximumDeliveryTime: provider.maximumDeliveryTime || '',
          latitude: provider.latitude || '',
          longitude: provider.longitude || '',
          ownerFirstName: provider.ownerFirstName || '',
          ownerLastName: provider.ownerLastName || '',
          ownerPhone: provider.ownerPhone || '',
          ownerEmail: provider.ownerEmail || '',
          businessTIN: provider.businessTIN || '',
          tinExpireDate: provider.tinExpireDate || '',
          logo: provider.logo || null,
          coverImage: provider.coverImage || null,
          tinCertificate: provider.tinCertificate || null,
        }));
        setProviders(mappedProviders);
      } else {
        throw new Error(data.message || 'Failed to fetch providers');
      }
    } catch (error) {
      console.error('Error fetching providers:', error);
      setNotification({
        open: true,
        message: `Error fetching providers: ${error.message}`,
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (_id, field) => {
    const provider = providers.find((p) => p._id === _id);
    const newValue = !provider[field];

    setProviders((prev) =>
      prev.map((p) => (p._id === _id ? { ...p, [field]: newValue } : p))
    );

    try {
      const response = await fetch(`${API_BASE_URL}/providers/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '', // Include token for authentication
        },
        body: JSON.stringify({ [field]: newValue }),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Failed to update provider');
    } catch (error) {
      console.error(`Error updating provider ${field}:`, error);
      setNotification({
        open: true,
        message: `Error updating provider ${field}: ${error.message}`,
        severity: 'error',
      });
      setProviders((prev) =>
        prev.map((p) => (p._id === _id ? { ...p, [field]: !newValue } : p))
      );
    }

    setNotification({
      open: true,
      message:
        field === 'featured'
          ? `${provider.storeInfo} has been ${newValue ? 'marked as featured' : 'removed from featured'}`
          : `${provider.storeInfo} has been ${newValue ? 'activated' : 'deactivated'}`,
      severity: 'success',
    });
  };

  const handleDeleteConfirm = async () => {
    const storeName = providerToDelete.storeInfo;
    try {
      const response = await fetch(`${API_BASE_URL}/providers/${providerToDelete._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: token ? `Bearer ${token}` : '', // Include token for authentication
        },
      });
      const data = await response.json();

      if (data.success) {
        setProviders((prev) => prev.filter((p) => p._id !== providerToDelete._id));
        setNotification({
          open: true,
          message: `${storeName} has been deleted successfully`,
          severity: 'success',
        });
      } else {
        throw new Error(data.message || 'Failed to delete provider');
      }
    } catch (error) {
      console.error('Error deleting provider:', error);
      setNotification({
        open: true,
        message: `Error deleting provider: ${error.message}`,
        severity: 'error',
      });
    } finally {
      setOpenDeleteDialog(false);
      setProviderToDelete(null);
    }
  };

  const handleDeleteClick = (provider) => {
    setProviderToDelete(provider);
    setOpenDeleteDialog(true);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setProviderToDelete(null);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') return;
    setNotification({ ...notification, open: false });
  };

  const filteredProviders = providers.filter((provider) => {
    const matchesZone = selectedZone === 'All Zones' || provider.zone === selectedZone;
    const matchesSearch =
      provider.storeInfo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.ownerInfo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesZone && matchesSearch;
  });

  const exportToCSV = () => {
    const headers = ['Sl', 'Store Information', 'Owner Information', 'Zone', 'Featured', 'Status'];
    const csvData = filteredProviders.map((provider) => [
      provider.id,
      `"${provider.storeInfo}"`,
      `"${provider.ownerInfo}"`,
      `"${provider.zone}"`,
      provider.featured ? 'Yes' : 'No',
      provider.status ? 'Active' : 'Inactive',
    ]);

    const csvContent = [headers.join(','), ...csvData.map((row) => row.join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `providers_list_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    handleClose();

    setNotification({
      open: true,
      message: 'CSV file exported successfully!',
      severity: 'success',
    });
  };

  const exportToExcel = () => {
    const headers = ['Sl', 'Store Information', 'Owner Information', 'Zone', 'Featured', 'Status'];
    let excelContent = `
      <table border="1">
        <thead>
          <tr>${headers.map((header) => `<th>${header}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${filteredProviders
            .map(
              (provider) => `
            <tr>
              <td>${provider.id}</td>
              <td>${provider.storeInfo}</td>
              <td>${provider.ownerInfo}</td>
              <td>${provider.zone}</td>
              <td>${provider.featured ? 'Yes' : 'No'}</td>
              <td>${provider.status ? 'Active' : 'Inactive'}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    `;

    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `providers_list_${new Date().toISOString().split('T')[0]}.xls`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    handleClose();

    setNotification({
      open: true,
      message: 'Excel file exported successfully!',
      severity: 'success',
    });
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', p: 2, bgcolor: '#f5f5f5', gap: 1 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Box sx={{ bgcolor: '#e3f2fd', p: 1, borderRadius: 1 }}>Total stores: {providers.length}</Box>
          <Box sx={{ bgcolor: '#fff3e0', p: 1, borderRadius: 1 }}>
            Active stores: {providers.filter((p) => p.status).length}
          </Box>
          <Box sx={{ bgcolor: '#e0f7fa', p: 1, borderRadius: 1 }}>
            Inactive stores: {providers.filter((p) => !p.status).length}
          </Box>
          <Box sx={{ bgcolor: '#fce4ec', p: 1, borderRadius: 1 }}>Newly joined stores: 0</Box>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Box sx={{ bgcolor: 'green.50', p: 1, borderRadius: 1 }}>Total Transactions: 0</Box>
          <Box sx={{ bgcolor: 'green.50', p: 1, borderRadius: 1 }}>Commission Earned: $0</Box>
          <Box sx={{ bgcolor: '#ffebee', p: 1, borderRadius: 1 }}>Total Store Withdraws: $0</Box>
        </Box>
      </Box>

      <Box sx={{ p: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 1, bgcolor: '#f5f5f5' }}>
        <TextField
          select
          value={selectedZone}
          onChange={(e) => setSelectedZone(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ minWidth: 150, bgcolor: 'white', borderRadius: 1 }}
        >
          <MenuItem value="All Zones">All Zones</MenuItem>
          {[...new Set(providers.map((p) => p.zone))].map((zone) => (
            <MenuItem key={zone} value={zone}>
              {zone}
            </MenuItem>
          ))}
        </TextField>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <TextField
            placeholder="Search Store Name"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start">🔍</InputAdornment> }}
            sx={{ bgcolor: 'white', borderRadius: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            endIcon={<Download />}
            onClick={handleClick}
            sx={{ textTransform: 'none' }}
          >
            Export
          </Button>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={exportToExcel}>Excel</MenuItem>
            <MenuItem onClick={exportToCSV}>CSV</MenuItem>
          </Menu>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
          <CircularProgress size={20} />
          <Typography>Loading providers...</Typography>
        </Box>
      ) : (
        <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ position: 'sticky', top: 0, bgcolor: '#f5f5f5', zIndex: 1 }}>
              <TableRow>
                <TableCell>Sl</TableCell>
                <TableCell>Store Information</TableCell>
                <TableCell>Owner Information</TableCell>
                <TableCell>Zone</TableCell>
                <TableCell>Featured</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProviders.map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell>{provider.id}</TableCell>
                  <TableCell>{provider.storeInfo}</TableCell>
                  <TableCell>{provider.ownerInfo}</TableCell>
                  <TableCell>{provider.zone}</TableCell>
                  <TableCell>
                    <Switch
                      checked={provider.featured}
                      color="primary"
                      onChange={() => handleToggle(provider._id, 'featured')} // Use _id instead of id
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={provider.status}
                      color="primary"
                      onChange={() => handleToggle(provider._id, 'status')} // Use _id instead of id
                    />
                  </TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    <IconButton color="primary" onClick={() => alert(`Viewing store: ${provider.storeInfo}`)}>
                      <VisibilityOutlined />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => navigate('/providers/edit', { state: { provider } })}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteClick(provider)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}

      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        sx={{ '& .MuiDialog-paper': { borderRadius: 2, padding: 2, maxWidth: 400 } }}
      >
        <DialogTitle id="delete-dialog-title">
          <Typography variant="h6" color="error">
            Confirm Delete
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete the store "<strong>{providerToDelete?.storeInfo}</strong>"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
          <Button
            onClick={handleDeleteCancel}
            variant="outlined"
            color="primary"
            sx={{ borderRadius: 1, textTransform: 'none', px: 3 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            sx={{ borderRadius: 1, textTransform: 'none', px: 3 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </TableContainer>
  );
};

export default ProvidersList;