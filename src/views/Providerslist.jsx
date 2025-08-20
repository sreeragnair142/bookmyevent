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

  // Providers state
  const [providers, setProviders] = useState([
    {
      id: 1,
      storeInfo: 'Demo Store',
      ownerInfo: 'Demo Store (+101511111)',
      zone: 'Demo Zone',
      featured: true,
      status: true,
    },
    {
      id: 2,
      storeInfo: 'Another Store',
      ownerInfo: 'John Doe (+102233344)',
      zone: 'Zone 1',
      featured: false,
      status: false,
    },
    {
      id: 3,
      storeInfo: 'Third Store',
      ownerInfo: 'Jane Doe (+103344455)',
      zone: 'Zone 2',
      featured: true,
      status: true,
    }
  ]);

  // Zone selection state
  const [selectedZone, setSelectedZone] = useState('All Zones');

  // Delete dialog state
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [providerToDelete, setProviderToDelete] = useState(null);

  // Toggle featured/status
  const handleToggle = (id, field) => {
    setProviders(prev =>
      prev.map(provider =>
        provider.id === id ? { ...provider, [field]: !provider[field] } : provider
      )
    );
  };

  // Delete functions
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

  // Export menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Filter providers by selected zone
  const filteredProviders = selectedZone === 'All Zones'
    ? providers
    : providers.filter(p => p.zone === selectedZone);

  return (
    <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
      {/* Header Stats */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, bgcolor: '#f5f5f5' }}>
        <Box>
          <Box sx={{ display: 'inline-block', mr: 2, bgcolor: '#e3f2fd', p: 1, borderRadius: 1 }}>
            Total stores: {providers.length}
          </Box>
          <Box sx={{ display: 'inline-block', mr: 2, bgcolor: '#fff3e0', p: 1, borderRadius: 1 }}>
            Active stores: {providers.filter(p => p.status).length}
          </Box>
          <Box sx={{ display: 'inline-block', mr: 2, bgcolor: '#e0f7fa', p: 1, borderRadius: 1 }}>
            Inactive stores: {providers.filter(p => !p.status).length}
          </Box>
          <Box sx={{ display: 'inline-block', mr: 2, bgcolor: '#fce4ec', p: 1, borderRadius: 1 }}>
            Newly joined stores: 0
          </Box>
        </Box>
        <Box>
          <Box sx={{ display: 'inline-block', mr: 2, bgcolor: 'green.50', p: 1, borderRadius: 1 }}>
            Total Transactions: 0
          </Box>
          <Box sx={{ display: 'inline-block', mr: 2, bgcolor: 'green.50', p: 1, borderRadius: 1 }}>
            Commission Earned: $0
          </Box>
          <Box sx={{ display: 'inline-block', mr: 2, bgcolor: '#ffebee', p: 1, borderRadius: 1 }}>
            Total Store Withdraws: $0
          </Box>
        </Box>
      </Box>

      {/* Filter and Search */}
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#f5f5f5' }}>
        <Box sx={{ minWidth: 120 }}>
          <TextField
            select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ mr: 2, bgcolor: 'white', borderRadius: 1 }}
          >
            <MenuItem value="All Zones">All Zones</MenuItem>
            <MenuItem value="Zone 1">Zone 1</MenuItem>
            <MenuItem value="Zone 2">Zone 2</MenuItem>
            <MenuItem value="Demo Zone">Demo Zone</MenuItem>
          </TextField>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            placeholder="Search Store Name"
            variant="outlined"
            size="small"
            InputProps={{ startAdornment: <InputAdornment position="start">🔍</InputAdornment> }}
            sx={{ mr: 2, bgcolor: 'white', borderRadius: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            endIcon={<Download />}
            on subdivClick={handleClick}
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

      {/* Table */}
      <Box sx={{ p: 2 }}>
        <Table>
          <TableHead>
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
                <TableCell>
                  <IconButton color="primary"><Visibility /></IconButton>
                  <IconButton color="primary" onClick={() => navigate(`/providers/edit`)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => handleDeleteClick(provider)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 2,
            padding: 2,
            maxWidth: 400,
          }
        }}
      >
        <DialogTitle id="delete-dialog-title">
          <Typography variant="h6" color="error">
            Confirm Delete
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete the store "
            <strong>{providerToDelete?.storeInfo}</strong>"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
          <Button
            onClick={handleDeleteCancel}
            variant="outlined"
            color="primary"
            sx={{ 
              borderRadius: 1,
              textTransform: 'none',
              px: 3,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            sx={{ 
              borderRadius: 1,
              textTransform: 'none',
              px: 3,
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default ProvidersList;