import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Switch,
  IconButton,
  InputAdornment,
  Divider,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  CloudUpload,
  Image as ImageIcon,
  Refresh,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon
} from '@mui/icons-material';

// Styled components (unchanged)
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  backgroundColor: '#ffffff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  borderRadius: 8
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: '1px solid #e0e0e0',
  '& .MuiTab-root': {
    textTransform: 'none',
    minWidth: 120,
    fontWeight: 500,
    fontSize: '14px'
  },
  '& .Mui-selected': {
    color: '#14b8a6'
  },
  '& .MuiTabs-indicator': {
    backgroundColor: '#14b8a6'
  }
}));

const ImageUploadArea = styled(Box)(({ theme }) => ({
  border: '2px dashed #e0e0e0',
  borderRadius: 8,
  padding: theme.spacing(6),
  textAlign: 'center',
  backgroundColor: '#f8fffe',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  minHeight: 150,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    borderColor: '#14b8a6',
    backgroundColor: '#f0fdfa'
  }
}));

const ImagePreviewContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  maxWidth: 300,
  marginTop: theme.spacing(2),
  border: '1px solid #e0e0e0',
  borderRadius: 8,
  overflow: 'hidden'
}));

const PreviewCloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 4,
  right: 4,
  backgroundColor: 'rgba(0,0,0,0.5)',
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.7)'
  }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#14b8a6',
  color: 'white',
  fontWeight: 600,
  padding: theme.spacing(1.2, 4),
  borderRadius: 6,
  textTransform: 'none',
  fontSize: '14px',
  '&:hover': {
    backgroundColor: '#0f9488'
  }
}));

const ResetButton = styled(Button)(({ theme }) => ({
  color: '#666',
  fontWeight: 500,
  padding: theme.spacing(1.2, 3),
  borderRadius: 6,
  textTransform: 'none',
  fontSize: '14px',
  border: '1px solid #e0e0e0',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc'
  }
}));

const SearchTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 6,
    backgroundColor: '#f8f9fa'
  }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 500,
  color: '#374151',
  backgroundColor: '#f0f4f8',
  borderBottom: '1px solid #e0e0e0',
  padding: theme.spacing(1.5),
  '&:first-of-type': {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8
  },
  '&:last-of-type': {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#fff'
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#f9fafb'
  }
}));

// Simplified TabPanel without TypeScript interface
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Banner() {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreviewEn, setImagePreviewEn] = useState(null);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [selectedPreviewImage, setSelectedPreviewImage] = useState(null);
  
  // Notification states
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' // 'success', 'error', 'warning', 'info'
  });

  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    zone: '',
    zoneEn: '',
    bannerType: 'Store wise',
    bannerTypeEn: 'Store wise',
    store: '',
    storeEn: '',
    bannerImage: null,
    bannerImageEn: null,
    additionalFile: null,
    additionalFileEn: null
  });

  const [banners, setBanners] = useState([
    {
      id: 1,
      image: 'https://images.pexels.com/photos/2894944/pexels-photo-2894944.jpeg',
      title: 'demo banner latest',
      type: 'Default',
      featured: false,
      status: true
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/3750717/pexels-photo-3750717.jpeg',
      title: 'Demo Banner',
      type: 'Store wise',
      featured: false,
      status: true
    }
  ]);

  const showNotification = (message, severity = 'success') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleImageUpload = (event, isEnglish = false) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        showNotification('Please select a valid image file', 'error');
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        showNotification('Image size should be less than 5MB', 'error');
        return;
      }

      const fieldName = isEnglish ? 'bannerImageEn' : 'bannerImage';
      setFormData({
        ...formData,
        [fieldName]: file
      });

      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (isEnglish) {
          setImagePreviewEn(e.target.result);
        } else {
          setImagePreview(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (event, isEnglish = false) => {
    const file = event.target.files?.[0];
    if (file) {
      const fieldName = isEnglish ? 'additionalFileEn' : 'additionalFile';
      setFormData({
        ...formData,
        [fieldName]: file
      });
      showNotification('File uploaded successfully', 'info');
    }
  };

  const removeImagePreview = (isEnglish = false) => {
    if (isEnglish) {
      setImagePreviewEn(null);
      setFormData({
        ...formData,
        bannerImageEn: null
      });
    } else {
      setImagePreview(null);
      setFormData({
        ...formData,
        bannerImage: null
      });
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      titleEn: '',
      zone: '',
      zoneEn: '',
      bannerType: 'Store wise',
      bannerTypeEn: 'Store wise',
      store: '',
      storeEn: '',
      bannerImage: null,
      bannerImageEn: null,
      additionalFile: null,
      additionalFileEn: null
    });
    setImagePreview(null);
    setImagePreviewEn(null);
    setEditingId(null);
    showNotification('Form reset successfully', 'info');
  };

  const handleSubmit = () => {
    const currentTitle = tabValue === 0 ? formData.title : formData.titleEn;
    const currentImage = tabValue === 0 ? formData.bannerImage : formData.bannerImageEn;
    const currentBannerType = tabValue === 0 ? formData.bannerType : formData.bannerTypeEn;

    if (!currentTitle || !currentImage) {
      showNotification('Please fill in the title and select a banner image', 'error');
      return;
    }

    // Create image URL for display
    const imageUrl = currentImage ? URL.createObjectURL(currentImage) : '';

    if (editingId) {
      // Update existing banner
      setBanners(prevBanners => 
        prevBanners.map(banner => 
          banner.id === editingId 
            ? {
                ...banner,
                title: currentTitle,
                type: currentBannerType,
                image: imageUrl || banner.image
              }
            : banner
        )
      );
      setEditingId(null);
      showNotification('Banner updated successfully!', 'success');
    } else {
      // Add new banner
      const newBanner = {
        id: Math.max(...banners.map(b => b.id), 0) + 1,
        image: imageUrl,
        title: currentTitle,
        type: currentBannerType,
        featured: false,
        status: true
      };
      setBanners(prevBanners => [...prevBanners, newBanner]);
      showNotification('Banner created successfully!', 'success');
    }

    // Reset form after submission
    setFormData({
      title: '',
      titleEn: '',
      zone: '',
      zoneEn: '',
      bannerType: 'Store wise',
      bannerTypeEn: 'Store wise',
      store: '',
      storeEn: '',
      bannerImage: null,
      bannerImageEn: null,
      additionalFile: null,
      additionalFileEn: null
    });
    setImagePreview(null);
    setImagePreviewEn(null);
  };

  const handleToggle = (id, field) => (event) => {
    setBanners((prevBanners) => 
      prevBanners.map((banner) => 
        banner.id === id 
          ? { ...banner, [field]: event.target.checked } 
          : banner
      )
    );
    
    const banner = banners.find(b => b.id === id);
    const fieldName = field === 'featured' ? 'Featured' : 'Status';
    const action = event.target.checked ? 'enabled' : 'disabled';
    showNotification(`${fieldName} ${action} for "${banner?.title}"`, 'info');
  };

  const handleEdit = (banner) => {
    setFormData({
      title: banner.title,
      titleEn: banner.title,
      zone: '',
      zoneEn: '',
      bannerType: banner.type,
      bannerTypeEn: banner.type,
      store: '',
      storeEn: '',
      bannerImage: null,
      bannerImageEn: null,
      additionalFile: null,
      additionalFileEn: null
    });
    setEditingId(banner.id);
    setImagePreview(banner.image);
    setImagePreviewEn(banner.image);
    setTabValue(0); // Switch to Default tab for editing
    showNotification(`Editing "${banner.title}"`, 'info');
  };

  const handleDelete = (id) => {
    const banner = banners.find(b => b.id === id);
    if (window.confirm(`Are you sure you want to delete "${banner?.title}"?`)) {
      setBanners(prevBanners => prevBanners.filter(banner => banner.id !== id));
      showNotification(`Banner "${banner?.title}" deleted successfully`, 'success');
    }
  };

  const handleImagePreview = (imageUrl, title) => {
    setSelectedPreviewImage({ url: imageUrl, title });
    setPreviewDialogOpen(true);
  };

  // Filter banners based on search query
  const filteredBanners = banners.filter(banner =>
    banner.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      <StyledPaper elevation={0}>
        {/* Tabs */}
        <StyledTabs value={tabValue} onChange={handleTabChange} aria-label="banner tabs">
          <Tab label="Default" id="tab-0" aria-controls="tabpanel-0" />
          <Tab label="English(EN)" id="tab-1" aria-controls="tabpanel-1" />
        </StyledTabs>

        <TabPanel value={tabValue} index={0}>
          <Grid container rowSpacing={3} columnSpacing={3}>
            {/* Title Field */}
            <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
              <TextField
                fullWidth
                label="Title (Default)"
                variant="outlined"
                value={formData.title}
                onChange={handleInputChange('title')}
                placeholder="New banner"
                slotProps={{
                  input: { sx: { borderRadius: 1 } }
                }}
              />
            </Grid>

            {/* Banner Image Upload */}
            <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
              <Typography variant="body2" sx={{ mb: 1, color: '#ef4444', fontWeight: 500 }}>
                Banner image * (Ratio 3:1)
              </Typography>
              <input accept="image/*" style={{ display: 'none' }} id="banner-upload" type="file" onChange={(e) => handleImageUpload(e, false)} />
              <label htmlFor="banner-upload">
                <ImageUploadArea role="button" tabIndex={0}>
                  <ImageIcon sx={{ fontSize: 48, color: '#94a3b8', mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {formData.bannerImage ? formData.bannerImage.name : 'Click to upload banner image'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Supported formats: JPG, PNG, GIF (Max 5MB)
                  </Typography>
                </ImageUploadArea>
              </label>

              {/* Image Preview */}
              {imagePreview && (
                <ImagePreviewContainer>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleImagePreview(imagePreview, 'Banner Preview')}
                  />
                  <PreviewCloseButton size="small" onClick={() => removeImagePreview(false)}>
                    <CloseIcon fontSize="small" />
                  </PreviewCloseButton>
                </ImagePreviewContainer>
              )}
            </Grid>

            {/* Zone Field */}
            <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="zone-label">Zone</InputLabel>
                <Select
                  labelId="zone-label"
                  value={formData.zone}
                  onChange={handleInputChange('zone')}
                  label="Zone"
                  sx={{ borderRadius: 1 }}
                >
                  <MenuItem value="">
                    <em>---Select---</em>
                  </MenuItem>
                  <MenuItem value="zone1">Zone 1</MenuItem>
                  <MenuItem value="zone2">Zone 2</MenuItem>
                  <MenuItem value="zone3">Zone 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Banner Type Field */}
            <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="banner-type-label">Banner type</InputLabel>
                <Select
                  labelId="banner-type-label"
                  value={formData.bannerType}
                  onChange={handleInputChange('bannerType')}
                  label="Banner type"
                  sx={{ borderRadius: 1 }}
                >
                  <MenuItem value="Store wise">Store wise</MenuItem>
                  <MenuItem value="Zone wise">Zone wise</MenuItem>
                  <MenuItem value="Global">Global</MenuItem>
                  <MenuItem value="Default">Default</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Store Field */}
            <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="store-label">Store</InputLabel>
                <Select
                  labelId="store-label"
                  value={formData.store}
                  onChange={handleInputChange('store')}
                  label="Store"
                  sx={{ borderRadius: 1 }}
                >
                  <MenuItem value="">
                    <em>---Select store---</em>
                  </MenuItem>
                  <MenuItem value="store1">Store 1</MenuItem>
                  <MenuItem value="store2">Store 2</MenuItem>
                  <MenuItem value="store3">Store 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* File Upload Button */}
            <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <input accept="*/*" style={{ display: 'none' }} id="file-upload" type="file" onChange={(e) => handleFileUpload(e, false)} />
                <label htmlFor="file-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<CloudUpload />}
                    sx={{
                      textTransform: 'none',
                      borderColor: 'divider',
                      color: 'text.secondary',
                      borderRadius: 1,
                      '&:hover': {
                        borderColor: 'primary.main',
                        backgroundColor: 'primary.light'
                      }
                    }}
                  >
                    Choose File
                  </Button>
                </label>
                <Typography variant="body2" color="text.secondary">
                  {formData.additionalFile ? formData.additionalFile.name : 'No file chosen'}
                </Typography>
              </Box>
            </Grid>

            {/* Action Buttons */}
            <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <ResetButton variant="outlined" onClick={handleReset} startIcon={<Refresh />}>
                  Reset
                </ResetButton>
                <SubmitButton variant="contained" onClick={handleSubmit}>
                  {editingId ? 'Update' : 'Submit'}
                </SubmitButton>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container rowSpacing={3} columnSpacing={3}>
            {/* English Title Field */}
            <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
              <TextField
                fullWidth
                label="Title (English)"
                variant="outlined"
                value={formData.titleEn}
                onChange={handleInputChange('titleEn')}
                placeholder="New banner"
                slotProps={{
                  input: { sx: { borderRadius: 1 } }
                }}
              />
            </Grid>

            {/* English Banner Image Upload */}
            <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
              <Typography variant="body2" sx={{ mb: 1, color: '#ef4444', fontWeight: 500 }}>
                Banner image * (Ratio 3:1)
              </Typography>
              <input accept="image/*" style={{ display: 'none' }} id="banner-upload-en" type="file" onChange={(e) => handleImageUpload(e, true)} />
              <label htmlFor="banner-upload-en">
                <ImageUploadArea role="button" tabIndex={0}>
                  <ImageIcon sx={{ fontSize: 48, color: '#94a3b8', mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {formData.bannerImageEn ? formData.bannerImageEn.name : 'Click to upload banner image'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Supported formats: JPG, PNG, GIF (Max 5MB)
                  </Typography>
                </ImageUploadArea>
              </label>

              {/* English Image Preview */}
              {imagePreviewEn && (
                <ImagePreviewContainer>
                  <img
                    src={imagePreviewEn}
                    alt="Preview"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleImagePreview(imagePreviewEn, 'Banner Preview (English)')}
                  />
                  <PreviewCloseButton size="small" onClick={() => removeImagePreview(true)}>
                    <CloseIcon fontSize="small" />
                  </PreviewCloseButton>
                </ImagePreviewContainer>
              )}
            </Grid>

            {/* English Zone Field */}
            <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="zone-label-en">Zone</InputLabel>
                <Select
                  labelId="zone-label-en"
                  value={formData.zoneEn}
                  onChange={handleInputChange('zoneEn')}
                  label="Zone"
                  sx={{ borderRadius: 1 }}
                >
                  <MenuItem value="">
                    <em>---Select---</em>
                  </MenuItem>
                  <MenuItem value="zone1">Zone 1</MenuItem>
                  <MenuItem value="zone2">Zone 2</MenuItem>
                  <MenuItem value="zone3">Zone 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* English Banner Type Field */}
            <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="banner-type-label-en">Banner type</InputLabel>
                <Select
                  labelId="banner-type-label-en"
                  value={formData.bannerTypeEn}
                  onChange={handleInputChange('bannerTypeEn')}
                  label="Banner type"
                  sx={{ borderRadius: 1 }}
                >
                  <MenuItem value="Store wise">Store wise</MenuItem>
                  <MenuItem value="Zone wise">Zone wise</MenuItem>
                  <MenuItem value="Global">Global</MenuItem>
                  <MenuItem value="Default">Default</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* English Store Field */}
            <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="store-label-en">Store</InputLabel>
                <Select
                  labelId="store-label-en"
                  value={formData.storeEn}
                  onChange={handleInputChange('storeEn')}
                  label="Store"
                  sx={{ borderRadius: 1 }}
                >
                  <MenuItem value="">
                    <em>---Select store---</em>
                  </MenuItem>
                  <MenuItem value="store1">Store 1</MenuItem>
                  <MenuItem value="store2">Store 2</MenuItem>
                  <MenuItem value="store3">Store 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* English File Upload Button */}
            <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <input accept="*/*" style={{ display: 'none' }} id="file-upload-en" type="file" onChange={(e) => handleFileUpload(e, true)} />
                <label htmlFor="file-upload-en">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<CloudUpload />}
                    sx={{
                      textTransform: 'none',
                      borderColor: 'divider',
                      color: 'text.secondary',
                      borderRadius: 1,
                      '&:hover': {
                        borderColor: 'primary.main',
                        backgroundColor: 'primary.light'
                      }
                    }}
                  >
                    Choose File
                  </Button>
                </label>
                <Typography variant="body2" color="text.secondary">
                  {formData.additionalFileEn ? formData.additionalFileEn.name : 'No file chosen'}
                </Typography>
              </Box>
            </Grid>

            {/* English Action Buttons */}
            <Grid size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <ResetButton variant="outlined" onClick={handleReset} startIcon={<Refresh />}>
                  Reset
                </ResetButton>
                <SubmitButton variant="contained" onClick={handleSubmit}>
                  {editingId ? 'Update' : 'Submit'}
                </SubmitButton>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Banner List Section */}
        <Box sx={{ mt: 4 }}>
          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#374151' }}>
                Banner List
              </Typography>
              <Box
                sx={{
                  backgroundColor: '#14b8a6',
                  color: 'white',
                  borderRadius: '50%',
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 600
                }}
              >
                {filteredBanners.length}
              </Box>
            </Box>

            <SearchTextField
              size="small"
              placeholder="Search by title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" sx={{ color: '#14b8a6' }}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
              sx={{ width: 300 }}
            />
          </Box>

          <Table sx={{ minWidth: 650, borderRadius: 1, overflow: 'hidden' }}>
            <TableHead>
              <TableRow>
                <StyledTableCell>SL</StyledTableCell>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell>Type</StyledTableCell>
                <StyledTableCell>Featured</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBanners.map((banner, index) => (
                <StyledTableRow key={banner.id}>
                  <TableCell sx={{ padding: (theme) => theme.spacing(1.5) }}>{index + 1}</TableCell>
                  <TableCell sx={{ padding: (theme) => theme.spacing(1.5) }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <img
                        src={banner.image}
                        alt={banner.title}
                        style={{
                          width: 100,
                          height: 33,
                          objectFit: 'cover',
                          borderRadius: 4,
                          cursor: 'pointer'
                        }}
                        onClick={() => handleImagePreview(banner.image, banner.title)}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/100x33?text=No+Image';
                        }}
                      />
                      <Typography>{banner.title}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ padding: (theme) => theme.spacing(1.5) }}>{banner.type}</TableCell>
                  <TableCell sx={{ padding: (theme) => theme.spacing(1.5) }}>
                    <Switch checked={banner.featured} onChange={handleToggle(banner.id, 'featured')} color="primary" />
                  </TableCell>
                  <TableCell sx={{ padding: (theme) => theme.spacing(1.5) }}>
                    <Switch checked={banner.status} onChange={handleToggle(banner.id, 'status')} color="success" />
                  </TableCell>
                  <TableCell sx={{ padding: (theme) => theme.spacing(1.5) }}>
                    <IconButton color="primary" size="small" onClick={() => handleEdit(banner)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" size="small" onClick={() => handleDelete(banner.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>

          {filteredBanners.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography color="text.secondary">
                {searchQuery ? 'No banners found matching your search.' : 'No banners available.'}
              </Typography>
            </Box>
          )}
        </Box>
      </StyledPaper>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
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

      {/* Image Preview Dialog */}
      <Dialog
        open={previewDialogOpen}
        onClose={() => setPreviewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {selectedPreviewImage?.title || 'Image Preview'}
          <IconButton onClick={() => setPreviewDialogOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedPreviewImage && (
            <img
              src={selectedPreviewImage.url}
              alt={selectedPreviewImage.title}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 8
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewDialogOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}