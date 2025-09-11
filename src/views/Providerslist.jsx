import React, { useState, useEffect, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  Switch,
  IconButton,
  Box,
  TextField,
  MenuItem,
  InputAdornment,
  Button,
  Menu,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Snackbar,
  Alert,
  CircularProgress
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
  const [toggleLoading, setToggleLoading] = useState({}); // Track loading for individual toggles
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const getToken = () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      return token;
    } catch (error) {
      console.warn('Error accessing storage for token:', error);
      return null;
    }
  };

  const getFetchOptions = (method = 'GET', body = null) => {
    const token = getToken();
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      credentials: 'include', // Important for CORS
      mode: 'cors' // Explicitly set CORS mode
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    if (body) {
      options.body = JSON.stringify(body);
    }

    return options;
  };

  const makeAPICall = async (url, options, retries = 2) => {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ API Error Response:', errorText);

          if (response.status === 401) {
            throw new Error('Authentication required - please login again');
          } else if (response.status === 403) {
            throw new Error('Access forbidden - insufficient permissions');
          } else if (response.status === 404) {
            throw new Error('Resource not found');
          } else if (response.status >= 500) {
            throw new Error('Server error - please try again later');
          } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
          }
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error(`❌ API Call Failed (attempt ${attempt + 1}):`, {
          message: error.message,
          url,
          stack: error.stack
        });

        if (attempt < retries) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          continue;
        }

        if (error.name === 'AbortError') {
          throw new Error('Request timed out - please check your connection');
        } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          throw new Error('Network error - please check if the server is running at http://localhost:5000 and CORS is properly configured');
        }

        throw error;
      }
    }
  };

  useEffect(() => {
    fetchProviders();
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
                zone: zones.find((zone) => zone._id === updatedProvider.zone)?.name || 'N/A'
              }
            : provider
        )
      );
      setNotification({
        open: true,
        message: 'Provider updated successfully!',
        severity: 'success'
      });
    }
  }, [location.state]);

  const [zones, setZones] = useState([]);
  useEffect(() => {
    const fetchZones = async () => {
      try {
        const url = `${API_BASE_URL}/zones`;
        const options = getFetchOptions();
        const data = await makeAPICall(url, options);

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
          { _id: '7', name: 'Industrial Zone' }
        ]);
      }
    };
    fetchZones();
  }, []);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const url = `${API_BASE_URL}/providers`;
      const options = getFetchOptions();
      const data = await makeAPICall(url, options);

      if (data.success) {
        const providersData = data.data.providers || [];
        const mappedProviders = providersData.map((provider, index) => ({
          id: index + 1,
          _id: provider._id,
          storeInfo: provider.storeName || 'Unknown Store',
          ownerInfo: `${provider.ownerFirstName || ''} ${provider.ownerLastName || ''} (${provider.ownerPhone || 'N/A'})`,
          zone: provider.zone?.name || 'N/A',
          zoneId: provider.zone?._id || '',
          featured: provider.isFeatured || false,
          status: provider.isActive || false,
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
          tinCertificate: provider.tinCertificate || null
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
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle Featured Toggle
  const handleFeaturedToggle = useCallback(
  async (_id) => {
    const toggleKey = `${_id}-featured`;
    if (toggleLoading[toggleKey]) return;

    const provider = providers.find((p) => p._id === _id);
    if (!provider) {
      setNotification({
        open: true,
        message: 'Provider not found',
        severity: 'error'
      });
      return;
    }

    const originalValue = provider.featured;
    const newValue = !originalValue;
    
    // Set loading state
    setToggleLoading((prev) => ({ ...prev, [toggleKey]: true }));
    
    // Optimistically update UI
    setProviders((prev) => 
      prev.map((p) => (p._id === _id ? { ...p, featured: newValue } : p))
    );

    try {
      const token = getToken();
      if (!token) {
        throw new Error('Authentication required - please login again');
      }

      const endpoint = `${API_BASE_URL}/providers/${_id}/toggle-featured`;
      
      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        mode: 'cors'
      });

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        }

        if (response.status === 401) {
          errorMessage = 'Authentication required - please login again';
        } else if (response.status === 403) {
          errorMessage = 'Access forbidden - insufficient permissions';
        } else if (response.status === 404) {
          errorMessage = 'Provider not found';
        } else if (response.status >= 500) {
          errorMessage = 'Server error - please try again later';
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to update featured status');
      }

      // Update with server response
      const serverValue = data.data?.provider?.isFeatured;
      if (serverValue !== undefined) {
        setProviders((prev) =>
          prev.map((p) =>
            p._id === _id ? { ...p, featured: serverValue } : p
          )
        );
      }

      setNotification({
        open: true,
        message: `${provider.storeInfo} featured status updated successfully`,
        severity: 'success'
      });

    } catch (error) {
      console.error('Featured toggle error:', error);
      
      // Revert optimistic update
      setProviders((prev) => 
        prev.map((p) => (p._id === _id ? { ...p, featured: originalValue } : p))
      );

      let errorMessage = 'Failed to update featured status';
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorMessage = 'Network error - please check your connection and server status';
      } else if (error.message.includes('CORS')) {
        errorMessage = 'CORS error - please check server configuration';
      } else {
        errorMessage = error.message || errorMessage;
      }

      setNotification({
        open: true,
        message: errorMessage,
        severity: 'error'
      });
    } finally {
      setToggleLoading((prev) => {
        const newState = { ...prev };
        delete newState[toggleKey];
        return newState;
      });
    }
  },
  [providers, API_BASE_URL, toggleLoading]
);

  // Handle Status Toggle
const handleStatusToggle = useCallback(
  async (_id) => {
    const toggleKey = `${_id}-status`;
    if (toggleLoading[toggleKey]) return;

    const provider = providers.find((p) => p._id === _id);
    if (!provider) {
      setNotification({
        open: true,
        message: 'Provider not found',
        severity: 'error'
      });
      return;
    }

    const originalValue = provider.status;
    const newValue = !originalValue;
    
    // Set loading state
    setToggleLoading((prev) => ({ ...prev, [toggleKey]: true }));
    
    // Optimistically update UI
    setProviders((prev) => 
      prev.map((p) => (p._id === _id ? { ...p, status: newValue } : p))
    );

    try {
      const token = getToken();
      if (!token) {
        throw new Error('Authentication required - please login again');
      }

      const endpoint = `${API_BASE_URL}/providers/${_id}/toggle-status`;
      
      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        mode: 'cors'
      });

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        }

        if (response.status === 401) {
          errorMessage = 'Authentication required - please login again';
        } else if (response.status === 403) {
          errorMessage = 'Access forbidden - insufficient permissions';
        } else if (response.status === 404) {
          errorMessage = 'Provider not found';
        } else if (response.status >= 500) {
          errorMessage = 'Server error - please try again later';
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to update status');
      }

      // Update with server response
      const serverValue = data.data?.provider?.isActive;
      if (serverValue !== undefined) {
        setProviders((prev) =>
          prev.map((p) =>
            p._id === _id ? { ...p, status: serverValue } : p
          )
        );
      }

      setNotification({
        open: true,
        message: `${provider.storeInfo} status updated successfully`,
        severity: 'success'
      });

    } catch (error) {
      console.error('Status toggle error:', error);
      
      // Revert optimistic update
      setProviders((prev) => 
        prev.map((p) => (p._id === _id ? { ...p, status: originalValue } : p))
      );

      let errorMessage = 'Failed to update status';
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorMessage = 'Network error - please check your connection and server status';
      } else if (error.message.includes('CORS')) {
        errorMessage = 'CORS error - please check server configuration';
      } else {
        errorMessage = error.message || errorMessage;
      }

      setNotification({
        open: true,
        message: errorMessage,
        severity: 'error'
      });
    } finally {
      setToggleLoading((prev) => {
        const newState = { ...prev };
        delete newState[toggleKey];
        return newState;
      });
    }
  },
  [providers, API_BASE_URL, toggleLoading]
);
  const handleDeleteConfirm = async () => {
    const storeName = providerToDelete.storeInfo;
    try {
      const url = `${API_BASE_URL}/providers/${providerToDelete._id}`;
      const options = getFetchOptions('DELETE');
      const data = await makeAPICall(url, options);

      if (data.success) {
        setProviders((prev) => prev.filter((p) => p._id !== providerToDelete._id));
        setNotification({
          open: true,
          message: `${storeName} has been deleted successfully`,
          severity: 'success'
        });
      } else {
        throw new Error(data.message || 'Failed to delete provider');
      }
    } catch (error) {
      console.error('Error deleting provider:', error);
      setNotification({
        open: true,
        message: `Error deleting provider: ${error.message}`,
        severity: 'error'
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
      provider.status ? 'Active' : 'Inactive'
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
      severity: 'success'
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
      severity: 'success'
    });
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', p: 2, bgcolor: '#f5f5f5', gap: 1 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Box sx={{ bgcolor: '#e3f2fd', p: 1, borderRadius: 1 }}>Total stores: {providers.length}</Box>
          <Box sx={{ bgcolor: '#fff3e0', p: 1, borderRadius: 1 }}>Active stores: {providers.filter((p) => p.status).length}</Box>
          <Box sx={{ bgcolor: '#e0f7fa', p: 1, borderRadius: 1 }}>Inactive stores: {providers.filter((p) => !p.status).length}</Box>
          <Box sx={{ bgcolor: '#fce4ec', p: 1, borderRadius: 1 }}>Newly joined stores: 0</Box>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Box sx={{ bgcolor: 'green.50', p: 1, borderRadius: 1 }}>Total Transactions: 0</Box>
          <Box sx={{ bgcolor: 'green.50', p: 1, borderRadius: 1 }}>Commission Earned: $0</Box>
          <Box sx={{ bgcolor: '#ffebee', p: 1, borderRadius: 1 }}>Total Store Withdraws: $0</Box>
        </Box>
      </Box>

      <Box
        sx={{ p: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 1, bgcolor: '#f5f5f5' }}
      >
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
              {filteredProviders.map((provider) => {
                const featuredToggleKey = `${provider._id}-featured`;
                const statusToggleKey = `${provider._id}-status`;

                return (
                  <TableRow key={provider.id}>
                    <TableCell>{provider.id}</TableCell>
                    <TableCell>{provider.storeInfo}</TableCell>
                    <TableCell>{provider.ownerInfo}</TableCell>
                    <TableCell>{provider.zone}</TableCell>
                    <TableCell>
                      <Switch
                        checked={provider.featured}
                        color="primary"
                        onChange={() => handleFeaturedToggle(provider._id)}
                        disabled={toggleLoading[featuredToggleKey]}
                      />
                      {toggleLoading[featuredToggleKey] && <CircularProgress size={16} sx={{ ml: 1 }} />}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={provider.status}
                        color="primary"
                        onChange={() => handleStatusToggle(provider._id)}
                        disabled={toggleLoading[statusToggleKey]}
                      />
                      {toggleLoading[statusToggleKey] && <CircularProgress size={16} sx={{ ml: 1 }} />}
                    </TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      <IconButton color="primary" onClick={() => alert(`Viewing store: ${provider.storeInfo}`)}>
                        <VisibilityOutlined />
                      </IconButton>
                      <IconButton color="primary" onClick={() => navigate('/providers/edit', { state: { provider } })}>
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteClick(provider)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
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
          <Button onClick={handleDeleteCancel} variant="outlined" color="primary" sx={{ borderRadius: 1, textTransform: 'none', px: 3 }}>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error" sx={{ borderRadius: 1, textTransform: 'none', px: 3 }}>
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
        <Alert onClose={handleCloseNotification} severity={notification.severity} variant="filled" sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </TableContainer>
  );
};

export default ProvidersList;