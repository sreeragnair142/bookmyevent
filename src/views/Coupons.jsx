import React, { useState } from "react";
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
  TableContainer,
  useMediaQuery,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    couponType: "",
    store: "",
    customer: "",
    code: "",
    limit: "",
    startDate: "",
    expireDate: "",
    discountType: "",
    minPurchase: "",
    discount: "",
    maxDiscount: "",
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm")); // responsive dialog

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setFormData({
      title: "",
      couponType: "",
      store: "",
      customer: "",
      code: "",
      limit: "",
      startDate: "",
      expireDate: "",
      discountType: "",
      minPurchase: "",
      discount: "",
      maxDiscount: "",
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
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Coupons
      </Typography>

      {/* Add/Edit Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        fullScreen={fullScreen} // responsive dialog
      >
        <DialogTitle>Add New Coupon</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            label="Title (Default)"
            name="title"
            value={formData.title}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Select
            fullWidth
            name="couponType"
            value={formData.couponType}
            onChange={handleChange}
            displayEmpty
            sx={{ mb: 2 }}
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
            displayEmpty
            sx={{ mb: 2 }}
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
            displayEmpty
            sx={{ mb: 2 }}
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
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Limit for same user"
            name="limit"
            value={formData.limit}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="date"
            label="Start date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="date"
            label="Expire date"
            name="expireDate"
            value={formData.expireDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <Select
            fullWidth
            name="discountType"
            value={formData.discountType}
            onChange={handleChange}
            displayEmpty
            sx={{ mb: 2 }}
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
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Discount"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Max discount ($)"
            name="maxDiscount"
            value={formData.maxDiscount}
            onChange={handleChange}
            sx={{ mb: 2 }}
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
      <Paper sx={{ mt: 2, width: "100%" }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
          p={2}
        >
          <Button variant="contained" onClick={handleOpen}>
            Add New Coupon
          </Button>
          <TextField
            label="Ex: Coupon Title Or Code"
            variant="outlined"
            size="small"
            fullWidth
            sx={{ maxWidth: { sm: 300 } }}
          />
        </Stack>

        <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
          <Table stickyHeader>
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
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Coupons;
