import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  IconButton,
  Stack,
  Chip,
} from "@mui/material";
import { Visibility, Edit, Delete, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      name: "Audi A6",
      code: "AUDI-23243",
      category: "Luxury Sedan",
      brand: "Audi",
      type: "Sedan",
      totalTrip: 1,
      fares: { hourly: 5 },
      newTag: true,
      active: true,
    },
    {
      id: 2,
      name: "Mercedes-Benz E-Class",
      code: "M-232445",
      category: "Executive Sedan",
      brand: "Mercedes-Benz",
      type: "Sedan",
      totalTrip: 2,
      fares: { hourly: 50, distance: 20, daily: 1000 },
      newTag: true,
      active: true,
    },
  ]);

  // State for actual applied filters
  const [filters, setFilters] = useState({
    brand: "",
    category: "",
    type: "",
    search: "",
  });

  // State for dropdowns/search before applying
  const [pendingFilters, setPendingFilters] = useState({
    brand: "",
    category: "",
    type: "",
    search: "",
  });

  const navigate = useNavigate();

  // Apply filters when "Filter" button clicked
  const handleApplyFilters = () => {
    setFilters(pendingFilters);
  };

  // Reset filters
  const handleReset = () => {
    setFilters({ brand: "", category: "", type: "", search: "" });
    setPendingFilters({ brand: "", category: "", type: "", search: "" });
  };

  // Export CSV
  const handleExport = () => {
    const headers = [
      "Sl,Name,Code,Category,Brand,Type,Total Trip,Hourly,Distance,Daily,New,Active",
    ];
    const rows = filteredVehicles.map(
      (v, i) =>
        `${i + 1},${v.name},${v.code},${v.category},${v.brand},${v.type},${
          v.totalTrip
        },${v.fares.hourly || "-"},${v.fares.distance || "-"},${
          v.fares.daily || "-"
        },${v.newTag ? "Yes" : "No"},${v.active ? "Active" : "Inactive"}`
    );
    const csv = headers.concat(rows).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "vehicles.csv";
    link.click();
  };

  // Filtering logic (applied filters only)
  const filteredVehicles = vehicles.filter((v) => {
    return (
      (filters.brand ? v.brand === filters.brand : true) &&
      (filters.category ? v.category === filters.category : true) &&
      (filters.type ? v.type === filters.type : true) &&
      (filters.search
        ? v.name.toLowerCase().includes(filters.search.toLowerCase())
        : true)
    );
  });

  return (
    <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh", p: 2 }}>
      {/* Navbar */}
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#333" }}>
            🚗 CityRide Rentals
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Filters */}
      <Paper sx={{ p: 2, mt: 2 }}>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <FormControl sx={{ minWidth: 200 }} size="small">
            <Select
              displayEmpty
              value={pendingFilters.brand}
              onChange={(e) =>
                setPendingFilters({ ...pendingFilters, brand: e.target.value })
              }
            >
              <MenuItem value="">Select vehicle brand</MenuItem>
              {[...new Set(vehicles.map((v) => v.brand))].map((b) => (
                <MenuItem key={b} value={b}>
                  {b}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }} size="small">
            <Select
              displayEmpty
              value={pendingFilters.category}
              onChange={(e) =>
                setPendingFilters({
                  ...pendingFilters,
                  category: e.target.value,
                })
              }
            >
              <MenuItem value="">Select vehicle category</MenuItem>
              {[...new Set(vehicles.map((v) => v.category))].map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }} size="small">
            <Select
              displayEmpty
              value={pendingFilters.type}
              onChange={(e) =>
                setPendingFilters({ ...pendingFilters, type: e.target.value })
              }
            >
              <MenuItem value="">Select vehicle type</MenuItem>
              {[...new Set(vehicles.map((v) => v.type))].map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            sx={{ bgcolor: "#f3f4f6", borderRadius: "8px" }}
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "#2b68bdff", borderRadius: "8px" }}
            onClick={handleApplyFilters}
          >
            Filter
          </Button>
        </Stack>
      </Paper>

      {/* Table */}
      <Paper sx={{ p: 2, mt: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          spacing={2}
          mb={2}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Total Vehicles{" "}
            <Chip
              label={filteredVehicles.length}
              color="success"
              size="small"
              sx={{ ml: 1 }}
            />
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <TextField
              size="small"
              placeholder="Search by vehicle name"
              value={pendingFilters.search}
              onChange={(e) =>
                setPendingFilters({ ...pendingFilters, search: e.target.value })
              }
              InputProps={{
                endAdornment: <Search fontSize="small" />,
              }}
            />
            <Button variant="outlined" onClick={handleExport}>
              Export
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: "#2563eb" }}
              onClick={() => navigate("/vehicle-setup/leads")}
            >
              New Vehicle
            </Button>
          </Stack>
        </Stack>

        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: "#f9fafb" }}>
              <TableRow>
                <TableCell>Sl</TableCell>
                <TableCell>Vehicle Info</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Total Trip</TableCell>
                <TableCell>Trip Fare</TableCell>
                <TableCell>New Tag</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredVehicles.map((v, i) => (
                <TableRow key={v.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: "#2563eb" }}
                    >
                      {v.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {v.code}
                    </Typography>
                  </TableCell>
                  <TableCell>{v.category}</TableCell>
                  <TableCell>{v.brand}</TableCell>
                  <TableCell>{v.totalTrip}</TableCell>
                  <TableCell>
                    {v.fares.hourly && (
                      <Typography variant="body2">
                        Hourly: ${v.fares.hourly}
                      </Typography>
                    )}
                    {v.fares.distance && (
                      <Typography variant="body2">
                        Distance Wise: ${v.fares.distance}
                      </Typography>
                    )}
                    {v.fares.daily && (
                      <Typography variant="body2">
                        Per Day: ${v.fares.daily}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={v.newTag}
                      onChange={() =>
                        setVehicles((prev) =>
                          prev.map((p) =>
                            p.id === v.id ? { ...p, newTag: !p.newTag } : p
                          )
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={v.active}
                      onChange={() =>
                        setVehicles((prev) =>
                          prev.map((p) =>
                            p.id === v.id ? { ...p, active: !p.active } : p
                          )
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        sx={{
                          border: "1px solid #d1d5db",
                          color: "#2563eb",
                          borderRadius: "8px",
                        }}
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{
                          border: "1px solid #d1d5db",
                          color: "#065f46",
                          borderRadius: "8px",
                        }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{
                          border: "1px solid #d1d5db",
                          color: "#dc2626",
                          borderRadius: "8px",
                        }}
                        onClick={() =>
                          setVehicles((prev) =>
                            prev.filter((p) => p.id !== v.id)
                          )
                        }
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              {filteredVehicles.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No vehicles found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}