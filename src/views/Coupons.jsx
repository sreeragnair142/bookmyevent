import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const Coupons = () => {
  const [coupons, setCoupons] = useState([
    { id: 1, code: 'WELCOME10', discount: '10%', expiry: '2025-12-31' },
    { id: 2, code: 'SUMMER20', discount: '20%', expiry: '2025-06-30' }
  ]);

  const [open, setOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [formData, setFormData] = useState({ code: '', discount: '', expiry: '' });

  const handleOpen = (coupon = null) => {
    if (coupon) {
      setEditingCoupon(coupon);
      setFormData({ code: coupon.code, discount: coupon.discount, expiry: coupon.expiry });
    } else {
      setEditingCoupon(null);
      setFormData({ code: '', discount: '', expiry: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ code: '', discount: '', expiry: '' });
    setEditingCoupon(null);
  };

  const handleSave = () => {
    if (editingCoupon) {
      setCoupons(
        coupons.map(c => (c.id === editingCoupon.id ? { ...editingCoupon, ...formData } : c))
      );
    } else {
      setCoupons([...coupons, { id: Date.now(), ...formData }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setCoupons(coupons.filter(c => c.id !== id));
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Coupons
      </Typography>

      {/* Add Coupon Button */}
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen()}
        sx={{ mb: 2 }}
      >
        Add Coupon
      </Button>

      {/* Coupons Table */}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow key={coupon.id}>
                <TableCell>{coupon.code}</TableCell>
                <TableCell>{coupon.discount}</TableCell>
                <TableCell>{coupon.expiry}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpen(coupon)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(coupon.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {coupons.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No coupons found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingCoupon ? 'Edit Coupon' : 'Add Coupon'}</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            label="Coupon Code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Discount"
            value={formData.discount}
            onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            type="date"
            label="Expiry Date"
            InputLabelProps={{ shrink: true }}
            value={formData.expiry}
            onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editingCoupon ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Coupons;
