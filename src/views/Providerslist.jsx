import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer,
  Switch, IconButton, Box, TextField, MenuItem, InputAdornment, Button, Menu,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography
} from '@mui/material';
import { Visibility, Edit, Delete, Download } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProvidersList = () => {
  const navigate = useNavigate();

  const [providers, setProviders] = useState([
    { id: 1, storeInfo: 'Demo Store', ownerInfo: 'Demo Store (+101511111)', zone: 'Demo Zone', featured: true, status: true },
    { id: 2, storeInfo: 'Another Store', ownerInfo: 'John Doe (+102233344)', zone: 'Zone 1', featured: false, status: false },
    { id: 3, storeInfo: 'Third Store', ownerInfo: 'Jane Doe (+103344455)', zone: 'Zone 2', featured: true, status: true }
  ]);

  const [selectedZone, setSelectedZone] = useState('All Zones');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [providerToDelete, setProviderToDelete] = useState(null);

  const handleToggle = (id, field) => {
    setProviders(prev =>
      prev.map(provider =>
        provider.id === id ? { ...provider, [field]: !provider[field] } : provider
      )
    );
  };

  const handleDeleteClick = (provider) => {
    setProviderToDelete(provider);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    setProviders(prev => prev.filter(provider => provider.id !== providerToDelete.id));
    setOpenDeleteDialog(false);
    setProviderToDelete(null);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setProviderToDelete(null);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const filteredProviders = selectedZone === 'All Zones'
    ? providers
    : providers.filter(p => p.zone === selectedZone);

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
            <MenuItem onClick={handleClose}>Excel</MenuItem>
            <MenuItem onClick={handleClose}>CSV</MenuItem>
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
                  <IconButton color="primary"><Visibility /></IconButton>
                  <IconButton color="primary" onClick={() => navigate(`/providers/edit`)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => handleDeleteClick(provider)}><Delete /></IconButton>
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
    </TableContainer>
  );
};

export default ProvidersList;
