import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer,
  Switch, IconButton, Box, TextField, MenuItem, InputAdornment, Button, Menu,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography,
  Snackbar, Alert
} from '@mui/material';
import { VisibilityOutlined, Edit, Delete, Download } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProvidersList = () => {
  const navigate = useNavigate();

  const [providers, setProviders] = useState([
    { id: 1, storeInfo: 'Demo Store', ownerInfo: 'Demo Store (+101511111)', zone: 'Demo Zone', featured: true, status: true },
    { id: 2, storeInfo: 'Another Store', ownerInfo: 'John Doe (+102233344)', zone: 'Zone 1', featured: false, status: false },
    { id: 3, storeInfo: 'Third Store', ownerInfo: 'Jane Doe (+103344455)', zone: 'Zone 2', featured: true, status: true }
  ]);

  const [selectedZone, setSelectedZone] = useState('All Zones');
  const [searchTerm, setSearchTerm] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [providerToDelete, setProviderToDelete] = useState(null);
  
  // Notification states
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleToggle = (id, field) => {
    const provider = providers.find(p => p.id === id);
    const newValue = !provider[field];
    
    setProviders(prev =>
      prev.map(provider =>
        provider.id === id ? { ...provider, [field]: newValue } : provider
      )
    );

    // Show notification based on the field and new value
    let message = '';
    if (field === 'featured') {
      message = `${provider.storeInfo} has been ${newValue ? 'marked as featured' : 'removed from featured'}`;
    } else if (field === 'status') {
      message = `${provider.storeInfo} has been ${newValue ? 'activated' : 'deactivated'}`;
    }

    setNotification({
      open: true,
      message: message,
      severity: 'success'
    });
  };

  const handleDeleteClick = (provider) => {
    setProviderToDelete(provider);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    const storeName = providerToDelete.storeInfo;
    setProviders(prev => prev.filter(provider => provider.id !== providerToDelete.id));
    setOpenDeleteDialog(false);
    setProviderToDelete(null);
    
    // Show success notification
    setNotification({
      open: true,
      message: `${storeName} has been deleted successfully`,
      severity: 'success'
    });
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setProviderToDelete(null);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Close notification
  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  // Filter providers based on zone and search term
  const filteredProviders = providers.filter(provider => {
    const matchesZone = selectedZone === 'All Zones' || provider.zone === selectedZone;
    const matchesSearch = provider.storeInfo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.ownerInfo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesZone && matchesSearch;
  });

  // CSV Export Function
  const exportToCSV = () => {
    const headers = ['Sl', 'Store Information', 'Owner Information', 'Zone', 'Featured', 'Status'];
    const csvData = filteredProviders.map(provider => [
      provider.id,
      `"${provider.storeInfo}"`,
      `"${provider.ownerInfo}"`,
      `"${provider.zone}"`,
      provider.featured ? 'Yes' : 'No',
      provider.status ? 'Active' : 'Inactive'
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

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
    
    // Show export notification
    setNotification({
      open: true,
      message: 'CSV file exported successfully!',
      severity: 'success'
    });
  };

  // Excel Export Function (creates a simple HTML table that Excel can open)
  const exportToExcel = () => {
    const headers = ['Sl', 'Store Information', 'Owner Information', 'Zone', 'Featured', 'Status'];
    
    let excelContent = `
      <table border="1">
        <thead>
          <tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${filteredProviders.map(provider => `
            <tr>
              <td>${provider.id}</td>
              <td>${provider.storeInfo}</td>
              <td>${provider.ownerInfo}</td>
              <td>${provider.zone}</td>
              <td>${provider.featured ? 'Yes' : 'No'}</td>
              <td>${provider.status ? 'Active' : 'Inactive'}</td>
            </tr>
          `).join('')}
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
    
    // Show export notification
    setNotification({
      open: true,
      message: 'Excel file exported successfully!',
      severity: 'success'
    });
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
      
      {/* Header Stats */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', p: 2, bgcolor: '#f5f5f5', gap: 1 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Box sx={{ bgcolor: '#e3f2fd', p: 1, borderRadius: 1 }}>Total stores: {providers.length}</Box>
          <Box sx={{ bgcolor: '#fff3e0', p: 1, borderRadius: 1 }}>Active stores: {providers.filter(p => p.status).length}</Box>
          <Box sx={{ bgcolor: '#e0f7fa', p: 1, borderRadius: 1 }}>Inactive stores: {providers.filter(p => !p.status).length}</Box>
          <Box sx={{ bgcolor: '#fce4ec', p: 1, borderRadius: 1 }}>Newly joined stores: 0</Box>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Box sx={{ bgcolor: 'green.50', p: 1, borderRadius: 1 }}>Total Transactions: 0</Box>
          <Box sx={{ bgcolor: 'green.50', p: 1, borderRadius: 1 }}>Commission Earned: $0</Box>
          <Box sx={{ bgcolor: '#ffebee', p: 1, borderRadius: 1 }}>Total Store Withdraws: $0</Box>
        </Box>
      </Box>

      {/* Filter and Search */}
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
          <MenuItem value="Zone 1">Zone 1</MenuItem>
          <MenuItem value="Zone 2">Zone 2</MenuItem>
          <MenuItem value="Demo Zone">Demo Zone</MenuItem>
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

      {/* Table with vertical scroll */}
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
                    onChange={() => handleToggle(provider.id, 'featured')}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={provider.status}
                    color="primary"
                    onChange={() => handleToggle(provider.id, 'status')}
                  />
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  <IconButton color="primary" onClick={() => alert(`Viewing store: ${provider.storeInfo}`)}>
                    <VisibilityOutlined />
                  </IconButton>
                  <IconButton color="primary" onClick={() => navigate(`/providers/edit`)}>
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

      {/* Delete Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        sx={{ '& .MuiDialog-paper': { borderRadius: 2, padding: 2, maxWidth: 400 } }}
      >
        <DialogTitle id="delete-dialog-title">
          <Typography variant="h6" color="error">Confirm Delete</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete the store "<strong>{providerToDelete?.storeInfo}</strong>"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
          <Button onClick={handleDeleteCancel} variant="outlined" color="primary" sx={{ borderRadius: 1, textTransform: 'none', px: 3 }}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error" sx={{ borderRadius: 1, textTransform: 'none', px: 3 }}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
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