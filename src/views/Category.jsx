import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  IconButton,
  InputAdornment,
  Chip,
  Grid,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FileDownload as ExportIcon,
  Close as CloseIcon,
  TableView as ExcelIcon,
  Description as CsvIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function CategoryManagement() {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  // Multi-language form data
  const [formData, setFormData] = useState({
    default: '',
    english: '',
    arabic: ''
  });
  
  const [categories, setCategories] = useState([
    { 
      id: 11, 
      names: { 
        default: 'Luxury Minibus', 
        english: 'Luxury Minibus', 
        arabic: 'حافلة فاخرة' 
      }, 
      status: true 
    },
    { 
      id: 10, 
      names: { 
        default: 'Crossover', 
        english: 'Crossover', 
        arabic: 'كروس أوفر' 
      }, 
      status: true 
    }
  ]);
  
  // Notification states
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' // 'success', 'error', 'warning', 'info'
  });

  // Delete confirmation dialog
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    categoryId: null,
    categoryName: ''
  });

  // Export menu state
  const [exportMenuAnchor, setExportMenuAnchor] = useState(null);
  const exportMenuOpen = Boolean(exportMenuAnchor);

  const navigate = useNavigate();

  // Language tabs configuration
  const languageTabs = [
    { key: 'default', label: 'Default' },
    { key: 'english', label: 'English(EN)' },
    { key: 'arabic', label: 'Arabic - العربية(AR)' }
  ];

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  // Handle form data change for different languages
  const handleFormDataChange = (language, value) => {
    setFormData(prev => ({
      ...prev,
      [language]: value
    }));
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        showNotification('Please select a valid image file', 'error');
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showNotification('File size should be less than 5MB', 'error');
        return;
      }

      setUploadedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle add category
  const handleAdd = () => {
    // Validate required fields
    if (!formData.default.trim()) {
      showNotification('Please enter a category name in Default language', 'error');
      return;
    }
    
    if (!uploadedImage) {
      showNotification('Please upload an image', 'error');
      return;
    }

    const newCategory = {
      id: Math.max(...categories.map(c => c.id)) + 1,
      names: {
        default: formData.default.trim(),
        english: formData.english.trim() || formData.default.trim(),
        arabic: formData.arabic.trim() || formData.default.trim()
      },
      status: true,
      image: imagePreview
    };

    setCategories(prev => [newCategory, ...prev]);
    showNotification(`Category "${formData.default}" added successfully!`, 'success');
    handleReset();
  };

  // Handle reset
  const handleReset = () => {
    setFormData({ default: '', english: '', arabic: '' });
    setUploadedImage(null);
    setImagePreview(null);
    // Reset file input
    const fileInput = document.getElementById('image-upload-input');
    if (fileInput) fileInput.value = '';
  };

  // Handle edit - FIXED: Updated navigation path to match your route
  const handleEdit = (id) => {
    navigate(`/vehicles/category/edit/${id}`);
  };

  // Handle delete confirmation
  const handleDeleteClick = (id) => {
    const category = categories.find(c => c.id === id);
    setDeleteDialog({
      open: true,
      categoryId: id,
      categoryName: category?.names?.default || ''
    });
  };

  // Handle delete confirm
  const handleDeleteConfirm = () => {
    const categoryName = deleteDialog.categoryName;
    setCategories(prev => prev.filter(c => c.id !== deleteDialog.categoryId));
    showNotification(`Category "${categoryName}" deleted successfully!`, 'success');
    setDeleteDialog({ open: false, categoryId: null, categoryName: '' });
  };

  // Handle status toggle
  const handleStatusToggle = (id) => {
    setCategories(prev => 
      prev.map(category => 
        category.id === id 
          ? { ...category, status: !category.status }
          : category
      )
    );
    
    const category = categories.find(c => c.id === id);
    const newStatus = !category.status;
    showNotification(
      `Category "${category.names.default}" ${newStatus ? 'activated' : 'deactivated'}`, 
      'info'
    );
  };

  // Show notification
  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  // Handle notification close
  const handleNotificationClose = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  // Get current selected language key
  const getCurrentLanguageKey = () => languageTabs[tabValue].key;

  // Filter categories based on search
  const filteredCategories = categories.filter(category => {
    const currentLang = getCurrentLanguageKey();
    return category.names[currentLang].toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Export menu handlers
  const handleExportMenuOpen = (event) => {
    setExportMenuAnchor(event.currentTarget);
  };

  const handleExportMenuClose = () => {
    setExportMenuAnchor(null);
  };

  // CSV Export function
  const exportToCSV = () => {
    const currentLang = getCurrentLanguageKey();
    const currentLangLabel = languageTabs[tabValue].label;
    
    // Prepare CSV headers
    const headers = ['SI', 'ID', `Name (${currentLangLabel})`, 'Status'];
    
    // Prepare CSV data
    const csvData = filteredCategories.map((category, index) => [
      index + 1,
      category.id,
      category.names[currentLang],
      category.status ? 'Active' : 'Inactive'
    ]);

    // Create CSV content
    let csvContent = headers.join(',') + '\n';
    csvData.forEach(row => {
      csvContent += row.map(field => `"${field}"`).join(',') + '\n';
    });

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `categories_${currentLang}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    handleExportMenuClose();
    showNotification('CSV file downloaded successfully!', 'success');
  };

  // Excel Export function (simplified - creates tab-separated values)
  const exportToExcel = () => {
    const currentLang = getCurrentLanguageKey();
    const currentLangLabel = languageTabs[tabValue].label;
    
    // Prepare Excel headers
    const headers = ['SI', 'ID', `Name (${currentLangLabel})`, 'Status'];
    
    // Prepare Excel data
    const excelData = filteredCategories.map((category, index) => [
      index + 1,
      category.id,
      category.names[currentLang],
      category.status ? 'Active' : 'Inactive'
    ]);

    // Create Excel content (tab-separated values)
    let excelContent = headers.join('\t') + '\n';
    excelData.forEach(row => {
      excelContent += row.join('\t') + '\n';
    });

    // Create and download file
    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `categories_${currentLang}_${new Date().toISOString().split('T')[0]}.xls`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    handleExportMenuClose();
    showNotification('Excel file downloaded successfully!', 'success');
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#f5f5f5', p: { xs: 2, sm: 3 } }}>
      
      {/* Add Category Form */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Card sx={{ width: '100%', maxWidth: '1400px', boxShadow: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
            
            {/* Tabs */}
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                mb: 4,
                borderBottom: 1,
                borderColor: 'divider',
                '& .MuiTabs-indicator': { backgroundColor: '#2196f3' }
              }}
            >
              {languageTabs.map((tab, index) => (
                <Tab key={tab.key} label={tab.label} />
              ))}
            </Tabs>

            {/* Dynamic Name Input based on selected tab */}
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
              Name ({languageTabs[tabValue].label}) <span style={{ color: '#f44336' }}>*</span>
            </Typography>
            <TextField
              fullWidth
              value={formData[languageTabs[tabValue].key]}
              onChange={(e) => handleFormDataChange(languageTabs[tabValue].key, e.target.value)}
              placeholder={`Enter category name in ${languageTabs[tabValue].label}`}
              variant="outlined"
              sx={{ 
                mb: 4,
                '& .MuiOutlinedInput-root': {
                  direction: languageTabs[tabValue].key === 'arabic' ? 'rtl' : 'ltr'
                }
              }}
            />

            {/* Upload Image */}
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
              Image <span style={{ color: '#f44336' }}>*</span>{' '}
              <span style={{ color: '#e91e63', fontSize: '0.875rem' }}>( Ratio 3:2)</span>
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 3, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
              {/* Upload Button */}
              <Box>
                <input
                  id="image-upload-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <label htmlFor="image-upload-input">
                  <Button
                    component="span"
                    variant="outlined"
                    sx={{
                      width: { xs: '100%', sm: 240 },
                      height: { xs: 100, sm: 140 },
                      border: '2px dashed #e0e0e0',
                      borderRadius: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      color: 'text.secondary',
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: '#2196f3',
                        backgroundColor: '#e3f2fd',
                        border: '2px dashed #2196f3'
                      }
                    }}
                  >
                    <CloudUploadIcon sx={{ fontSize: 40, color: '#bdbdbd' }} />
                    <Typography variant="body2" color="text.secondary">
                      {uploadedImage ? 'Change Image' : 'Upload Image'}
                    </Typography>
                  </Button>
                </label>
              </Box>

              {/* Image Preview */}
              {imagePreview && (
                <Box sx={{ position: 'relative' }}>
                  <Box
                    sx={{
                      width: { xs: '100%', sm: 240 },
                      height: { xs: 160, sm: 140 },
                      border: '2px solid #e0e0e0',
                      borderRadius: 2,
                      overflow: 'hidden',
                      position: 'relative'
                    }}
                  >
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => {
                        setImagePreview(null);
                        setUploadedImage(null);
                        const fileInput = document.getElementById('image-upload-input');
                        if (fileInput) fileInput.value = '';
                      }}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' }
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    {uploadedImage?.name}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: { xs: 'center', sm: 'flex-end' }, gap: 2 }}>
              <Button
                variant="outlined"
                onClick={handleReset}
                sx={{
                  px: 4, py: 1.5, textTransform: 'none',
                  borderColor: '#e0e0e0', color: '#666',
                  '&:hover': { borderColor: '#bdbdbd', backgroundColor: '#f5f5f5' }
                }}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                onClick={handleAdd}
                disabled={!formData.default.trim() || !uploadedImage}
                sx={{
                  px: 4, py: 1.5,
                  backgroundColor: '#00695c', textTransform: 'none',
                  '&:hover': { backgroundColor: '#004d40' },
                  '&:disabled': { backgroundColor: '#e0e0e0', color: '#999' }
                }}
              >
                Add
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Category List */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ width: '100%', maxWidth: '1400px', boxShadow: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" fontWeight={600}>Category List</Typography>
                <Chip 
                  label={filteredCategories.length} 
                  size="small" 
                  sx={{ backgroundColor: '#e3f2fd', color: '#2196f3', fontWeight: 600 }} 
                />
                <Chip 
                  label={`Language: ${languageTabs[tabValue].label}`}
                  size="small" 
                  sx={{ backgroundColor: '#e8f5e8', color: '#2e7d32', fontWeight: 500 }} 
                />
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                <TextField
                  size="small"
                  placeholder={`Search categories in ${languageTabs[tabValue].label}`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ 
                    minWidth: { xs: '100%', sm: 250, md: 300 },
                    '& .MuiOutlinedInput-root': {
                      direction: languageTabs[tabValue].key === 'arabic' ? 'rtl' : 'ltr'
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: '#bdbdbd' }} />
                      </InputAdornment>
                    )
                  }}
                />
                <Button
                  variant="outlined"
                  startIcon={<ExportIcon />}
                  endIcon={<ExpandMoreIcon />}
                  onClick={handleExportMenuOpen}
                  sx={{
                    textTransform: 'none',
                    borderColor: '#e0e0e0',
                    color: '#2196f3',
                    '&:hover': { borderColor: '#2196f3', backgroundColor: '#e3f2fd' }
                  }}
                >
                  Export
                </Button>
                
                {/* Export Menu */}
                <Menu
                  anchorEl={exportMenuAnchor}
                  open={exportMenuOpen}
                  onClose={handleExportMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  sx={{
                    '& .MuiPaper-root': {
                      minWidth: 180,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      borderRadius: 2,
                      mt: 1
                    }
                  }}
                >
                  <MenuItem onClick={exportToExcel} sx={{ py: 1.5, px: 2 }}>
                    <ListItemIcon>
                      <ExcelIcon sx={{ color: '#1976d2' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Export to Excel"
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={exportToCSV} sx={{ py: 1.5, px: 2 }}>
                    <ListItemIcon>
                      <CsvIcon sx={{ color: '#2e7d32' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Export to CSV"
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </MenuItem>
                </Menu>
              </Box>
            </Box>

            {/* Table */}
            <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
              <Table size="small">
                <TableHead sx={{ backgroundColor: '#fafafa' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: '#666' }}>SI</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#666' }}>Id</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#666' }}>Image</TableCell>
                    <TableCell sx={{ 
                      fontWeight: 600, 
                      color: '#666',
                      direction: languageTabs[tabValue].key === 'arabic' ? 'rtl' : 'ltr'
                    }}>
                      Name ({languageTabs[tabValue].label})
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#666' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#666' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((category, index) => {
                      const currentLang = getCurrentLanguageKey();
                      return (
                        <TableRow key={category.id} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{category.id}</TableCell>
                          <TableCell>
                            {category.image ? (
                              <Box
                                sx={{
                                  width: 50,
                                  height: 35,
                                  borderRadius: 1,
                                  overflow: 'hidden',
                                  border: '1px solid #e0e0e0'
                                }}
                              >
                                <img
                                  src={category.image}
                                  alt={category.names[currentLang]}
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                  }}
                                />
                              </Box>
                            ) : (
                              <Box
                                sx={{
                                  width: 50,
                                  height: 35,
                                  borderRadius: 1,
                                  backgroundColor: '#f5f5f5',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  border: '1px solid #e0e0e0'
                                }}
                              >
                                <Typography variant="caption" color="text.secondary">
                                  No Image
                                </Typography>
                              </Box>
                            )}
                          </TableCell>
                          <TableCell sx={{ 
                            fontWeight: 500, 
                            maxWidth: 200,
                            direction: languageTabs[tabValue].key === 'arabic' ? 'rtl' : 'ltr'
                          }}>
                            <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                              {category.names[currentLang]}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={category.status}
                              onChange={() => handleStatusToggle(category.id)}
                              sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': { color: '#2196f3' },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#2196f3' }
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <IconButton size="small" onClick={() => handleEdit(category.id)} sx={{ color: '#2196f3' }}>
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton size="small" onClick={() => handleDeleteClick(category.id)} sx={{ color: '#f44336' }}>
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} sx={{ textAlign: 'center', py: 4, color: '#999' }}>
                        {searchTerm ? `No categories found matching your search in ${languageTabs[tabValue].label}.` : 'No categories available.'}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, categoryId: null, categoryName: '' })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the category "{deleteDialog.categoryName}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button 
            onClick={() => setDeleteDialog({ open: false, categoryId: null, categoryName: '' })}
            variant="outlined"
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            sx={{ textTransform: 'none' }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleNotificationClose} 
          severity={notification.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}