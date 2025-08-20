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
  MenuItem,
  Select,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    couponType: '',
    store: '',
    customer: '',
    code: '',
    limit: '',
    startDate: '',
    expireDate: '',
    discountType: '',
    minPurchase: '',
    discount: '',
    maxDiscount: '',
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      title: '',
      couponType: '',
      store: '',
      customer: '',
      code: '',
      limit: '',
      startDate: '',
      expireDate: '',
      discountType: '',
      minPurchase: '',
      discount: '',
      maxDiscount: '',
    });
  };

  const handleSave = () => {
    setCoupons([...coupons, { id: Date.now(), ...formData }]);
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Coupons
      </Typography>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Coupon</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            label="Title (Default)"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="dense"
          />
          <Select
            fullWidth
            name="couponType"
            value={formData.couponType}
            onChange={handleChange}
            margin="dense"
            displayEmpty
          >
            <MenuItem value="">--Select coupon type--</MenuItem>
            <MenuItem value="fixed">Fixed</MenuItem>
            <MenuItem value="percent">Percentage</MenuItem>
          </Select>
          <Select
            fullWidth
            name="store"
            value={formData.store}
            onChange={handleChange}
            margin="dense"
            displayEmpty
          >
            <MenuItem value="">--Select store--</MenuItem>
            <MenuItem value="store1">Store 1</MenuItem>
            <MenuItem value="store2">Store 2</MenuItem>
          </Select>
          <Select
            fullWidth
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            margin="dense"
            displayEmpty
          >
            <MenuItem value="">Select customer</MenuItem>
            <MenuItem value="customer1">Customer 1</MenuItem>
            <MenuItem value="customer2">Customer 2</MenuItem>
          </Select>
          <TextField
            fullWidth
            label="Code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Limit for same user"
            name="limit"
            value={formData.limit}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            fullWidth
            type="date"
            label="Start date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            margin="dense"
          />
          <TextField
            fullWidth
            type="date"
            label="Expire date"
            name="expireDate"
            value={formData.expireDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            margin="dense"
          />
          <Select
            fullWidth
            name="discountType"
            value={formData.discountType}
            onChange={handleChange}
            margin="dense"
            displayEmpty
          >
            <MenuItem value="">--Select discount type--</MenuItem>
            <MenuItem value="amount">Amount ($)</MenuItem>
          </Select>
          <TextField
            fullWidth
            label="Min purchase ($)"
            name="minPurchase"
            value={formData.minPurchase}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Discount"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Max discount ($)"
            name="maxDiscount"
            value={formData.maxDiscount}
            onChange={handleChange}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Reset</Button>
          <Button variant="contained" onClick={handleSave}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Coupons Table */}
      <Paper sx={{ mt: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
          {/* Left: Add Coupon Button */}
          <Button variant="contained" onClick={handleOpen}>
            Add New Coupon
          </Button>

          {/* Right: Search */}
          <TextField
            label="Ex: Coupon Title Or Code"
            variant="outlined"
            size="small"
          />
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Total Uses</TableCell>
              <TableCell>Min Purchase</TableCell>
              <TableCell>Max Discount</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Discount Type</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Expire Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coupons.map((coupon, index) => (
              <TableRow key={coupon.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{coupon.title}</TableCell>
                <TableCell>{coupon.code}</TableCell>
                <TableCell>{coupon.couponType}</TableCell>
                <TableCell>0</TableCell>
                <TableCell>{coupon.minPurchase}</TableCell>
                <TableCell>{coupon.maxDiscount}</TableCell>
                <TableCell>{coupon.discount}</TableCell>
                <TableCell>{coupon.discountType}</TableCell>
                <TableCell>{coupon.startDate}</TableCell>
                <TableCell>{coupon.expireDate}</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
            ))}
            {coupons.length === 0 && (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  No coupons found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default Coupons;
