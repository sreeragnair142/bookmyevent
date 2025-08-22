import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useParams, useNavigate } from "react-router-dom";

export default function EditCategory() {
  const { id } = useParams(); // get category id from url
  const navigate = useNavigate();

  // Mock data (replace later with API call)
  const mockCategory = {
    id,
    nameDefault: "Luxury Minibus",
    nameEn: "Luxury Minibus",
    nameAr: "حافلة صغيرة فاخرة",
    image: null,
  };

  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState(mockCategory);
  const [originalData, setOriginalData] = useState(mockCategory);

  useEffect(() => {
    // Simulate API fetch
    setFormData(mockCategory);
    setOriginalData(mockCategory);
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  const handleReset = () => {
    setFormData(originalData);
  };

  const handleUpdate = () => {
    console.log("Updated category:", formData);
    // Later: send API request
    navigate("/vehicles/category"); // go back to list after update
  };

  return (
    <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
      <CardHeader
        title={
          <Typography variant="h6" fontWeight="bold">
            ✏️ Update Category (ID: {id})
          </Typography>
        }
      />

      <CardContent>
        <Grid container spacing={4}>
          {/* Left Section - Tabs & Fields */}
          <Grid item xs={12} md={8}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
              sx={{ mb: 2 }}
            >
              <Tab label="Default" />
              <Tab label="English (EN)" />
              <Tab label="Arabic - العربية (AR)" />
            </Tabs>

            {tabValue === 0 && (
              <TextField
                fullWidth
                required
                label="Name (Default)"
                value={formData.nameDefault}
                onChange={(e) => handleInputChange("nameDefault", e.target.value)}
                sx={{ mb: 2 }}
              />
            )}
            {tabValue === 1 && (
              <TextField
                fullWidth
                required
                label="Name (English)"
                value={formData.nameEn}
                onChange={(e) => handleInputChange("nameEn", e.target.value)}
                sx={{ mb: 2 }}
              />
            )}
            {tabValue === 2 && (
              <TextField
                fullWidth
                required
                label="Name (Arabic)"
                value={formData.nameAr}
                onChange={(e) => handleInputChange("nameAr", e.target.value)}
                sx={{ mb: 2 }}
                dir="rtl"
              />
            )}
          </Grid>

          {/* Right Section - Image Upload */}
          <Grid
            item
            xs={12}
            md={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography variant="body2" color="error" sx={{ mb: 1 }}>
              Image * (Ratio 1:1)
            </Typography>
            <Box
              sx={{
                width: 200,
                height: 200,
                border: "2px dashed #ccc",
                borderRadius: 2,
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              {formData.image ? (
                <>
                  <Avatar
                    src={formData.image}
                    variant="rounded"
                    sx={{ width: "100%", height: "100%" }}
                  />
                  <IconButton
                    component="label"
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      background: "#fff",
                    }}
                  >
                    <EditIcon fontSize="small" />
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </IconButton>
                </>
              ) : (
                <Button variant="outlined" component="label">
                  Upload
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Actions */}
        <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" color="secondary" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
